import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./EditarUsuario.css";
import FadeContainer from "../../components/animations/FadeContainer";
import ConfirmModal from "../../components/modal/ConfirmModal";

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

  // Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMensagem, setModalMensagem] = useState("");

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
        setModalMensagem("Erro ao carregar os dados do usuário.");
        setModalAberto(true);
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
      setModalMensagem("✅ Dados atualizados com sucesso!");
      setModalAberto(true);
    } catch (error) {
      console.error(error);
      setModalMensagem(error.response?.data?.error || "❌ Erro ao atualizar usuário.");
      setModalAberto(true);
    }
  };

  const handleChangePassword = async () => {
    if (!formData.senhaAtual || !formData.novaSenha || !formData.confirmarSenha) {
      setModalMensagem("Preencha todos os campos de senha.");
      setModalAberto(true);
      return;
    }

    if (formData.novaSenha !== formData.confirmarSenha) {
      setModalMensagem("A nova senha e a confirmação não coincidem.");
      setModalAberto(true);
      return;
    }

    try {
      await api.patch(`/usuarios/${id}/senha`, {
        senhaAtual: formData.senhaAtual,
        novaSenha: formData.novaSenha,
      });
      setModalMensagem("✅ Senha alterada com sucesso!");
      setModalAberto(true);

      // Limpa os campos de senha após alteração
      setFormData((prev) => ({
        ...prev,
        senhaAtual: "",
        novaSenha: "",
        confirmarSenha: "",
      }));
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      setModalMensagem(error.response?.data?.error || "❌ Erro ao alterar senha.");
      setModalAberto(true);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    if (modalMensagem === "✅ Dados atualizados com sucesso!") {
      navigate("/usuarios");
    }
  };

  if (loading) return <p>Carregando dados do usuário...</p>;

  return (
    <FadeContainer>
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

        {/* Modal de confirmação */}
        <ConfirmModal
          isOpen={modalAberto}
          message={modalMensagem}
          onConfirm={fecharModal}
          confirmText="OK"
        />
      </div>
    </FadeContainer>
  );
}

export default EditarUsuario;
