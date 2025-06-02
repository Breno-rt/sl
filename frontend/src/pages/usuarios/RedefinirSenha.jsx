import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./RedefinirSenha.css";

function RedefinirSenha() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");
    setErro("");

    if (novaSenha.length < 6) {
      setErro("❌ A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("❌ As senhas não coincidem.");
      return;
    }

    try {
      await api.post(`/usuarios/trocar-senha/${token}`, { novaSenha });
      setMensagem("✅ Senha redefinida com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("❌ Erro ao redefinir senha:", err);
      setErro("❌ Erro ao redefinir senha. O link pode estar expirado ou inválido.");
    }
  }

  return (
    <div className="redefinir-senha">
      <h1>Redefinir Senha</h1>
      <form onSubmit={handleSubmit}>
        <label>Nova Senha:</label>
        <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />

        <label>Confirmar Nova Senha:</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        {erro && <p className="erro">{erro}</p>}
        {mensagem && <p className="mensagem">{mensagem}</p>}

        <button type="submit">Salvar Nova Senha</button>
      </form>
    </div>
  );
}

export default RedefinirSenha;
