import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./EsqueciSenha.css";

function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setMensagem("");

    try {
      await api.post("/usuarios/recuperar-senha", { email });
      setMensagem("📧 Um e-mail de redefinição foi enviado!");
      setEmail("");
    } catch (err) {
      console.error("❌ Erro ao solicitar redefinição de senha:", err);
      setErro("❌ Erro ao solicitar redefinição de senha.");
    }
  }

  return (
    <div className="esqueci-senha">
      <h1>Esqueci minha Senha</h1>
      <form onSubmit={handleSubmit}>
        <label>Insira o email cadastrado:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {erro && <p className="erro">{erro}</p>}
        {mensagem && <p className="mensagem">{mensagem}</p>}
        <div className="botoes-navegacao">
          <button type="submit" className="botao-enviar">Enviar email</button>
          <Link to="/login" className="botao-voltar-link">
            <button className="botao-voltar">Voltar</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EsqueciSenha;