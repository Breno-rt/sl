import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./EditarUsuario.css";

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await api.get(`/usuarios/${id}`);
        setFormData((prev) => ({
          ...prev,
          nome: response.data.nome || "",
          email: response.data.email || "",
        }));
        setLoading(false);
      } catch (error) {
        console.error("❌ Erro ao buscar usuário", error);
        setLoading(false);
      }
    }
    fetchUsuario();
  }, [id]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSaveEdit = async () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = "Nome é obrigatório.";
    if (!formData.email) newErrors.email = "E-mail é obrigatório.";
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await api.put(`/usuarios/${id}`, {
        nome: formData.nome,
        email: formData.email,
      });
      alert("Dados atualizados com sucesso!");
      navigate("/usuarios");
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Erro ao atualizar usuário.");
      }
      console.error(error);
    }
  };

  const handleChangePassword = async () => {
    if (!formData.senhaAtual || !formData.novaSenha || !formData.confirmarSenha) {
      alert("Preencha todos os campos de senha.");
      return;
    }

    if (formData.novaSenha !== formData.confirmarSenha) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }

    try {
      await api.patch(`/usuarios/${id}/senha`, {
        senhaAtual: formData.senhaAtual,
        novaSenha: formData.novaSenha,
      });
      alert("Senha alterada com sucesso!");
      // Limpa os campos de senha após alteração
      setFormData((prev) => ({
        ...prev,
        senhaAtual: "",
        novaSenha: "",
        confirmarSenha: "",
      }));
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      alert(error.response?.data?.error || "Erro ao alterar senha.");
    }
  };

  if (loading) return <p>Carregando dados do usuário...</p>;

  return (
    <div className="editar-usuario">
      <h1>Editar Usuário</h1>

      <label htmlFor="nome">Nome:</label>
      <input
        id="nome"
        type="text"
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
      />
      {errors.nome && <span className="erro">{errors.nome}</span>}

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {errors.email && <span className="erro">{errors.email}</span>}

      <div className="botoes-edicao">
        <button className="salvar" onClick={handleSaveEdit}>
          Salvar
        </button>
        <button className="cancelar" onClick={() => navigate("/usuarios")}>
          Cancelar
        </button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h2>Alterar senha</h2>

      <label htmlFor="senhaAtual">Senha atual:</label>
      <input
        id="senhaAtual"
        type="password"
        value={formData.senhaAtual}
        onChange={(e) => setFormData({ ...formData, senhaAtual: e.target.value })}
      />

      <label htmlFor="novaSenha">Nova senha:</label>
      <input
        id="novaSenha"
        type="password"
        value={formData.novaSenha}
        onChange={(e) => setFormData({ ...formData, novaSenha: e.target.value })}
      />

      <label htmlFor="confirmarSenha">Confirmar nova senha:</label>
      <input
        id="confirmarSenha"
        type="password"
        value={formData.confirmarSenha}
        onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
      />

      <div className="botoes-edicao">
        <button className="alterar-senha" onClick={handleChangePassword}>
          Alterar senha
        </button>
      </div>
    </div>
  );
}

export default EditarUsuario;
