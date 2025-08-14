import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./EditarAluno.css"
import FadeContainer from "../../components/animations/FadeContainer";


function EditarAluno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchAluno() {
      try {
        const response = await api.get(`/alunos/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar aluno", error);
      }
    }
    fetchAluno();
  }, [id]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateTelefone = (telefone) => /^\d{10,}$/.test(telefone);

  const handleSaveEdit = async () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = "Nome é obrigatório.";
    if (!formData.email) newErrors.email = "E-mail é obrigatório.";
    if (formData.email && !validateEmail(formData.email)) newErrors.email = "E-mail inválido.";
    if (formData.telefone && !validateTelefone(formData.telefone)) newErrors.telefone = "Telefone inválido.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await api.put(`/alunos/${id}`, formData);
      navigate("/alunos"); // Redireciona após salvar
    } catch (error) {
      console.error("❌ Erro ao atualizar aluno", error);
    }
  };

  return (
    <FadeContainer>
      <div className="editar-aluno">
      <h2>Editar Aluno</h2>
      <label htmlFor="nome">Nome:</label>
      <input
        id="nome"
        type="text"
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        placeholder="Nome"
      />
      {errors.nome && <span className="erro">{errors.nome}</span>}
      <br /><br />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      {errors.email && <span className="erro">{errors.email}</span>}
      <br /><br />

      <label htmlFor="telefone">Telefone:</label>
      <input
        id="telefone"
        type="text"
        value={formData.telefone}
        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
        placeholder="Telefone"
      />
      {errors.telefone && <span className="erro">{errors.telefone}</span>}
      <br /><br />

      <button onClick={handleSaveEdit}>Salvar</button>
      <button onClick={() => navigate("/alunos")}>Cancelar</button>
    </div>
    </FadeContainer>
    
  );
}

export default EditarAluno;