import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./EditarAula.css"
import FadeContainer from "../../components/animations/FadeContainer";


function EditarAula() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professores, setProfessores] = useState([]);
  const [formData, setFormData] = useState({ data: "", horario: "", professorId: "", materia: "" });

  useEffect(() => {
    async function fetchAula() {
      try {
        const response = await api.get(`/aulas/${id}`);
        const aula = response.data;
        setFormData({
          data: new Date(aula.data).toISOString().split("T")[0],
          horario: aula.horario,
          professorId: aula.professor.id,
          materia: aula.materia,
        });
      } catch (error) {
        console.error("❌ Erro ao buscar aula", error);
        alert("Erro ao carregar os dados da aula.");
      }
    }
    async function fetchProfessores() {
      try {
        const response = await api.get("/professores");
        setProfessores(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar professores", error);
      }
    }
    fetchAula();
    fetchProfessores();
  }, [id]);

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!formData.data || !formData.horario || !/\d{2}:\d{2}/.test(formData.horario)) {
      alert("Por favor, preencha a data e o horário corretamente.");
      return;
    }
    try {
      await api.put(`/aulas/${id}`, formData);
      alert("✅ Aula editada com sucesso!");
      navigate("/aulas");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("❌ Conflito de horário! Escolha outro horário ou professor.");
      } else {
        console.error("❌ Erro ao atualizar aula", error);
        alert("Erro ao atualizar a aula.");
      }
    }
  };

  return (
    <FadeContainer>
      <div className="editar-aula">
      <h1>Editar Aula</h1>
      <form onSubmit={handleSaveEdit}>
        <label>Data:</label>
        <input type="date" value={formData.data} onChange={(e) => setFormData({ ...formData, data: e.target.value })} required />
        
        <label>Horário:</label>
        <input type="time" value={formData.horario} onChange={(e) => setFormData({ ...formData, horario: e.target.value })} required />
        
        <label>Professor:</label>
        <select value={formData.professorId} onChange={(e) => setFormData({ ...formData, professorId: e.target.value })} required>
          {professores.filter(p => p.materia.includes(formData.materia)).map(professor => (
            <option key={professor.id} value={professor.id}>{professor.nome}</option>
          ))}
        </select>

        <div className="botoes-edicao">
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => navigate("/aulas")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
    </FadeContainer>
    
  );
}

export default EditarAula;
