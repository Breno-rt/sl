import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaAlunos.css";
import FadeContainer from "../../components/animations/FadeContainer";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal"; // ✅ Importa o modal

function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [alunoParaDeletar, setAlunoParaDeletar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const response = await api.get("/alunos");
        setAlunos(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar alunos", error);
      }
    }
    fetchAlunos();
  }, []);

  function openDeleteModal(id) {
    setAlunoParaDeletar(id);
    setModalAberto(true);
  }

  function closeDeleteModal() {
    setAlunoParaDeletar(null);
    setModalAberto(false);
  }

  async function handleConfirmDelete() {
    if (alunoParaDeletar) {
      try {
        await api.delete(`/alunos/${alunoParaDeletar}`);
        setAlunos(alunos.filter((aluno) => aluno.id !== alunoParaDeletar));
      } catch (error) {
        console.error("❌ Erro ao excluir aluno", error);
      } finally {
        closeDeleteModal();
      }
    }
  }

  return (
    <FadeContainer>
      <div className="lista-alunos">
        <h1>Lista de Alunos</h1>

        <div className="botoes-navegacao">
          <Link to="/cadastrar-aluno">
            <button>Cadastrar Novo Aluno</button>
          </Link>
          <Link to="/">
            <button className="botao-voltar">Voltar</button>
          </Link>
        </div>
        <br />

        {alunos.length > 0 ? (
          <div className="lista-scroll">
            <ul>
              {alunos.map((aluno) => (
                <li key={aluno.id}>
                  <strong>👨‍🎓 Nome:</strong> {aluno.nome} <br />
                  <strong>📧 Email:</strong> {aluno.email} <br />
                  <strong>📞 Telefone:</strong> {aluno.telefone} <br />
                  <strong>📚 Matéria:</strong> {aluno.materia.join(", ")} <br /><br />
                  <div className="botoes-acao">
                    <button
                      className="editar"
                      onClick={() => navigate(`/editar-aluno/${aluno.id}`)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="excluir"
                      onClick={() => openDeleteModal(aluno.id)}
                    >
                      ❌ Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>❌ Nenhum aluno encontrado.</p>
        )}

        {/* ✅ Modal de exclusão */}
        <DeleteConfirmModal
          isOpen={modalAberto}
          message="Tem certeza que deseja excluir este aluno?"
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteModal}
        />
      </div>
    </FadeContainer>
  );
}

export default ListaAlunos;
