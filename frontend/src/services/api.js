import axios from "axios";

const api = axios.create({
  baseURL: "/" // Backend e frontend no mesmo servidor
});

const rotasPublicas = [
  "/usuarios/recuperar-senha",
  "/usuarios/trocar-senha"
];

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  const isRotaPublica = rotasPublicas.some(rota => config.url?.startsWith(rota));

  if (token && !isRotaPublica) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
