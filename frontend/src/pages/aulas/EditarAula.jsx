import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./EditarAula.css";
import FadeContainer from "../../components/animations/FadeContainer";
import ConfirmModal from "../../components/modal/ConfirmModal";

function EditarAula() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professores, setProfessores] = useState([]);
  const [formData, setFormData] = useState({ data: "", horario: "", professorId: "", materia: "" });

  // Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMensagem, setModalMensagem] = useState("");

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
        setModalMensagem("Erro ao carregar os dados da aula.");
        setModalAberto(true);
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
    if (!formData.data || !/\d{2}:\d{2}/.test(formData.horario)) {
      setModalMensagem("Por favor, preencha a data e o horário corretamente.");
      setModalAberto(true);
      return;
    }
    try {
      await api.put(`/aulas/${id}`, formData);
      setModalMensagem("✅ Aula editada com sucesso!");
      setModalAberto(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setModalMensagem("❌ Conflito de horário! Escolha outro horário ou professor.");
      } else {
        console.error("❌ Erro ao atualizar aula", error);
        setModalMensagem("Erro ao atualizar a aula.");
      }
      setModalAberto(true);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    if (modalMensagem === "✅ Aula editada com sucesso!") {
      navigate("/");
    }
  };

  return (
    <FadeContainer>
      <div className="editar-aula">
        <h1>Editar Aula</h1>
        <form onSubmit={handleSaveEdit}>
          <label>Data:</label>
          <input
            type="date"
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            required
          />

          <label>Horário:</label>
          <input
            type="time"
            value={formData.horario}
            onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
            required
          />

          <label>Professor:</label>
          <select
            value={formData.professorId}
            onChange={(e) => setFormData({ ...formData, professorId: e.target.value })}
            required
          >
            {professores.filter(p => p.materia.includes(formData.materia)).map(professor => (
              <option key={professor.id} value={professor.id}>{professor.nome}</option>
            ))}
          </select>

          <div className="botoes-edicao">
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => navigate("/aulas")}>Cancelar</button>
          </div>
        </form>

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

export default EditarAula;
