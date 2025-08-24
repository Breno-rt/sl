import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import titulo from "../assets/titulo.png";
import PageTransition from "../components/animations/PageTransition"; // Importa a animação
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    setErro("");

    try {
      const response = await api.post("/login", { email, senha });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
      setErro("E-mail ou senha inválidos!");
    }
  }

  return (
    <PageTransition type="zoom">
      <div className="login-container">
        <img src={titulo} alt="Título" className="logo" /><br /><br />
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <br />
          <button type="submit">Entrar</button>

          {erro && <p className="erro">{erro}</p>}
        </form>

        <p style={{ marginTop: "10px" }}>
          <Link to="/esqueci-senha">Esqueci minha senha kkkk</Link>
        </p>
      </div>
    </PageTransition>
  );
}

export default Login;
