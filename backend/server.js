import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- Importe o CORS
import routes from './src/routes.js';
import cron from "node-cron";
import { excluirAulasAntigas } from "./src/services/excluirAulasAntigas.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // <-- Ativa o CORS para permitir requisições de qualquer origem
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});


// Agendando a exclusão às 17h no horário de Brasília smpr
cron.schedule("0 15 * * *", async () => {
  try {
    await excluirAulasAntigas();
    console.log("✅ Aulas antigas excluídas com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao excluir aulas antigas:", error);
  }
});