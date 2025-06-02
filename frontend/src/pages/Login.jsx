import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // Importa Link aqui
import api from "../services/api";
import "./Login.css";
import titulo from "../assets/titulo.png"; // Caminho relativo para a imagem

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
      localStorage.setItem("token", response.data.token); // Armazena o token JWT
      navigate("/"); // Redireciona para a Home após login
    } catch (error) {
      console.error("Erro no login:", error);
      setErro("E-mail ou senha inválidos!");
    }
  }

  return (
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
          />
        </div>
        <br />
        <button type="submit">Entrar</button>

        {erro && <p className="erro">{erro}</p>}
      </form>

      {/* Aqui o link para recuperação de senha */}
      <p style={{ marginTop: "10px" }}>
       <Link to="/esqueci-senha">Esqueci minha senha kkkk</Link>
      </p>
    </div>
  );
}

export default Login;
