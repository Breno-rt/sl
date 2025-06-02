import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Backend
});

// Rotas públicas que não devem receber o token JWT
const rotasPublicas = [
  "/usuarios/recuperar-senha",  // ✔️ Igual ao backend
  "/usuarios/trocar-senha"      // ✔️ Igual ao backend (sem /:token)
];

// Intercepta todas as requisições e adiciona o token JWT, exceto nas rotas públicas
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Verifica se a URL da requisição é uma rota pública
  const isRotaPublica = rotasPublicas.some((rota) =>
    config.url?.startsWith(rota)
  );

  if (token && !isRotaPublica) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Intercepta respostas e verifica se o token expirou (erro 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Token expirado! Redirecionando para login...");
      localStorage.removeItem("token"); // Remove o token inválido
      window.location.href = "/login"; // Redireciona para o login
    }
    return Promise.reject(error);
  }
);

export default api;
