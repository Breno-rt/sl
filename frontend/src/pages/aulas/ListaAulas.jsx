import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaAulas.css";
import FadeContainer from "../../components/animations/FadeContainer";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal"; 

function formatarData(data) {
  if (!data) return "Data inválida";
  try {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return "Data inválida";
  }
}

function ListaAulas() {
  const [aulas, setAulas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [aulaParaDeletar, setAulaParaDeletar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAulas() {
      try {
        const response = await api.get("/aulas");
        setAulas(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar aulas", error);
      }
    }
    fetchAulas();

    const interval = setInterval(fetchAulas, 5000);
    return () => clearInterval(interval);
  }, []);

  function openDeleteModal(id) {
    setAulaParaDeletar(id);
    setModalAberto(true);
  }

  function closeDeleteModal() {
    setAulaParaDeletar(null);
    setModalAberto(false);
  }

  async function handleConfirmDelete() {
    if (aulaParaDeletar) {
      try {
        await api.delete(`/aulas/${aulaParaDeletar}`);
        setAulas(aulas.filter((aula) => aula.id !== aulaParaDeletar));
      } catch (error) {
        console.error("❌ Erro ao excluir aula", error);
      } finally {
        closeDeleteModal();
      }
    }
  }

  return (
    <FadeContainer>
      <div className="lista-aulas">
        <h1>Lista de Aulas</h1>
        <div className="botoes-navegacao">
          <Link to="/agendar-aula">
            <button>Agendar Nova Aula</button>
          </Link>
          <Link to="/">
            <button className="botao-voltar">Voltar</button>
          </Link>
        </div>
        <br />
        {aulas.length > 0 ? (
          <div className="lista-scroll">
            <ul>
              {aulas.map((aula) => (
                <li key={aula.id}>
                  <strong>📚 Matéria:</strong> {aula.materia} <br />
                  <strong>📅 Data:</strong> {formatarData(aula.data)} <br />
                  <strong>⏰ Horário:</strong> {aula.horario} <br />
                  <strong>👨‍🏫 Professor:</strong> {aula.professor.nome} <br />
                  <strong>👨‍🎓 Aluno:</strong> {aula.aluno.nome} <br /><br />
                  <div className="botoes-acao">
                    <button
                      className="editar"
                      onClick={() => navigate(`/editar-aula/${aula.id}`)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="excluir"
                      onClick={() => openDeleteModal(aula.id)}
                    >
                      ❌ Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>❌ Nenhuma aula agendada.</p>
        )}

        {/* ✅ Modal de exclusão */}
        <DeleteConfirmModal
          isOpen={modalAberto}
          message="Tem certeza que deseja excluir esta aula?"
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteModal}
        />
      </div>
    </FadeContainer>
  );
}

export default ListaAulas;
