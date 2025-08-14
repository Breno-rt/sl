import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./EditarProfessor.css"
import FadeContainer from "../../components/animations/FadeContainer";


function EditarProfessor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchProfessor() {
      try {
        const response = await api.get(`/professores/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar professor", error);
      }
    }
    fetchProfessor();
  }, [id]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateTelefone = (telefone) => {
    const regex = /^\d+$/;
    return regex.test(telefone) && telefone.length >= 10;
  };

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
      await api.put(`/professores/${id}`, formData);
      navigate("/professores");
    } catch (error) {
      console.error("❌ Erro ao atualizar professor", error);
    }
  };

  return (
    <FadeContainer>
      <div className="editar-professor">
      <h1>Editar Professor</h1>
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

      <label htmlFor="telefone">Telefone:</label>
      <input
        id="telefone"
        type="text"
        value={formData.telefone}
        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
      />
      {errors.telefone && <span className="erro">{errors.telefone}</span>}

      <div className="botoes-edicao">
        <button className="salvar" onClick={handleSaveEdit}>Salvar</button>
        <button className="cancelar" onClick={() => navigate("/professores")}>
          Cancelar
        </button>
      </div>
    </div>
    </FadeContainer>
    
  );
}

export default EditarProfessor;
