import nodemailer from "nodemailer";
import dotenv from "dotenv";
import moment from 'moment-timezone';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true, // true para TLS/SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function formatarData(data) {
  if (!data) return "Data inválida";
  try {
    return moment.utc(data).tz('America/Sao_Paulo').format('DD/MM/YYYY');
  } catch {
    return "Data inválida";
  }
}

export async function enviarEmail(destinatario, assunto, mensagem) {
  try {
    await transporter.sendMail({
      from: `"Société de Langues" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: assunto,
      text: mensagem,
    });
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
  }
}
