import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './src/routes.js';
import cron from 'node-cron';
import { excluirAulasAntigas } from './src/services/excluirAulasAntigas.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(routes);

// Serve frontend Vite build
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Inicia servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

// Cron job diário às 15:00
cron.schedule('0 15 * * *', async () => {
  try {
    await excluirAulasAntigas();
    console.log('✅ Aulas antigas excluídas');
  } catch (err) {
    console.error('❌ Erro ao excluir aulas antigas', err);
  }
});
