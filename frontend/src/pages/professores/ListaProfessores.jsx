import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaProfessores.css"; 
import FadeContainer from "../../components/animations/FadeContainer";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";

function ListaProfessores() {
  const [professores, setProfessores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [professorToDelete, setProfessorToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfessores() {
      try {
        const response = await api.get("/professores");
        setProfessores(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar professores", error);
      }
    }
    fetchProfessores();
  }, []);

  function openDeleteModal(id) {
    setProfessorToDelete(id);
    setModalOpen(true);
  }

  function closeDeleteModal() {
    setProfessorToDelete(null);
    setModalOpen(false);
  }

  async function handleConfirmDelete() {
    if (professorToDelete) {
      try {
        await api.delete(`/professores/${professorToDelete}`);
        setProfessores(professores.filter((prof) => prof.id !== professorToDelete));
      } catch (error) {
        console.error("❌ Erro ao excluir professor", error);
      } finally {
        closeDeleteModal();
      }
    }
  }

  return (
    <FadeContainer>
      <div className="lista-professores">
        <h1>Lista de Professores</h1>
        <div className="botoes-navegacao">
          <Link to="/cadastrar-professor">
            <button className="botao-cadastrar">Cadastrar Novo Professor</button>
          </Link> 
          <Link to="/">
            <button className="botao-voltar">Voltar</button>
          </Link>
        </div>
        <br />
        {professores.length > 0 ? (
          <div className="lista-scroll">
            <ul>
              {professores.map((prof) => (
                <li key={prof.id}>
                  <strong>👨‍🏫 Nome:</strong> {prof.nome} <br />
                  <strong>📧 Email:</strong> {prof.email} <br />
                  <strong>📞 Telefone:</strong> {prof.telefone} <br />
                  <strong>📚 Matéria:</strong> {prof.materia.join(", ")} <br /><br />
                  <div className="botoes-acao">
                    <button 
                      className="editar" 
                      onClick={() => navigate(`/editar-professor/${prof.id}`)}
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      className="excluir" 
                      onClick={() => openDeleteModal(prof.id)}
                    >
                      ❌ Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>❌ Nenhum professor encontrado.</p>
        )}
      </div>

      {/* ✅ Modal de confirmação */}
      <DeleteConfirmModal
        isOpen={modalOpen}
        message="Tem certeza que deseja excluir este professor?"
        onConfirm={handleConfirmDelete}
        onCancel={closeDeleteModal}
      />
    </FadeContainer>
  );
}

export default ListaProfessores;
