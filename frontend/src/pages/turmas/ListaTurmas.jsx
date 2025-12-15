import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaTurmas.css";
import FadeContainer from "../../components/animations/FadeContainer";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";

function ListaTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [turmaParaDeletar, setTurmaParaDeletar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTurmas() {
      try {
        const response = await api.get("/turmas");
        setTurmas(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar turmas", error);
      }
    }
    fetchTurmas();
  }, []);

  // 🔥 Agrupar turmas por matéria
  const turmasIngles = turmas.filter(t => t.materia === "Inglês");
  const turmasFrances = turmas.filter(t => t.materia === "Francês");
  const turmasEspanhol = turmas.filter(t => t.materia === "Espanhol");

  function openDeleteModal(id) {
    setTurmaParaDeletar(id);
    setModalAberto(true);
  }

  function closeDeleteModal() {
    setTurmaParaDeletar(null);
    setModalAberto(false);
  }

  async function handleConfirmDelete() {
    if (turmaParaDeletar) {
      try {
        await api.delete(`/turmas/${turmaParaDeletar}`);
        setTurmas(turmas.filter(t => t.id !== turmaParaDeletar));
      } catch (error) {
        console.error("❌ Erro ao excluir turma", error);
      } finally {
        closeDeleteModal();
      }
    }
  }

  return (
    <FadeContainer>
      <div className="lista-turmas">
        <h1>Lista de Turmas</h1>

        <div className="botoes-navegacao">
          <Link to="/cadastrar-turma">
            <button>Cadastrar Nova Turma</button>
          </Link>
          <Link to="/">
            <button className="botao-voltar">Voltar</button>
          </Link>
        </div>
        <br />

        {turmas.length > 0 ? (
          <div className="containers-materias">

            {/* INGLÊS */}
            <div className="container-materia ingles">
              <div className="header-materia">
                <h2>Inglês 👤{turmasIngles.length}</h2>
              </div>
              <div className="lista-scroll">
                <ul>
                  {turmasIngles.map((turma) => (
                    <li key={turma.id}>
                      <strong>📘 Turma:</strong> {turma.nome} <br />
                      <strong>📚 Matéria:</strong> {turma.materia} <br />
                      <strong>👥 Alunos:</strong> {turma.alunos.length} <br /><br />

                      <div className="botoes-acao">
                        <button
                          className="editar"
                          onClick={() => navigate(`/editar-turma/${turma.id}`)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="excluir"
                          onClick={() => openDeleteModal(turma.id)}
                        >
                          ❌ Excluir
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FRANCÊS */}
            <div className="container-materia frances">
              <div className="header-materia">
                <h2>Francês 👤{turmasFrances.length}</h2>
              </div>
              <div className="lista-scroll">
                <ul>
                  {turmasFrances.map((turma) => (
                    <li key={turma.id}>
                      <strong>📘 Turma:</strong> {turma.nome} <br />
                      <strong>📚 Matéria:</strong> {turma.materia} <br />
                      <strong>👥 Alunos:</strong> {turma.alunos.length} <br /><br />

                      <div className="botoes-acao">
                        <button
                          className="editar"
                          onClick={() => navigate(`/editar-turma/${turma.id}`)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="excluir"
                          onClick={() => openDeleteModal(turma.id)}
                        >
                          ❌ Excluir
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ESPANHOL */}
            <div className="container-materia espanhol">
              <div className="header-materia">
                <h2>Espanhol 👤{turmasEspanhol.length}</h2>
              </div>
              <div className="lista-scroll">
                <ul>
                  {turmasEspanhol.map((turma) => (
                    <li key={turma.id}>
                      <strong>📘 Turma:</strong> {turma.nome} <br />
                      <strong>📚 Matéria:</strong> {turma.materia} <br />
                      <strong>👥 Alunos:</strong> {turma.alunos.length} <br /><br />

                      <div className="botoes-acao">
                        <button
                          className="editar"
                          onClick={() => navigate(`/editar-turma/${turma.id}`)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className="excluir"
                          onClick={() => openDeleteModal(turma.id)}
                        >
                          ❌ Excluir
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        ) : (
          <p>❌ Nenhuma turma encontrada.</p>
        )}

        <DeleteConfirmModal
          isOpen={modalAberto}
          message="Tem certeza que deseja excluir esta turma?"
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteModal}
        />
      </div>
    </FadeContainer>
  );
}

export default ListaTurmas;
