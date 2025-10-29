import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaAlunos.css";
import FadeContainer from "../../components/animations/FadeContainer";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal";

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

  // ✅ FILTRAR ALUNOS POR MATÉRIA (AGORA COM 3)
  const alunosIngles = alunos.filter(aluno => 
    aluno.materia.includes("Inglês") || aluno.materia.includes("inglês")
  );
  
  const alunosFrances = alunos.filter(aluno => 
    aluno.materia.includes("Francês") || aluno.materia.includes("francês")
  );

  // ✅ NOVO: FILTRO PARA ESPANHOL
  const alunosEspanhol = alunos.filter(aluno => 
    aluno.materia.includes("Espanhol") || aluno.materia.includes("espanhol")
  );

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
        {/* ✅ TÍTULO CENTRALIZADO NO TOPO */}
        <h1>Lista de Alunos</h1>

        {/* ✅ BOTÕES DE NAVEGAÇÃO (MANTIDOS IGUAIS) */}
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
          <div className="containers-materias">
            {/* ✅ CONTAINER INGLÊS */}
            <div className="container-materia ingles">
              <div className="header-materia">
                <h2>Inglês 👤{alunosIngles.length}</h2>
              </div>
              <div className="lista-scroll">
                <ul>
                  {alunosIngles.map((aluno) => (
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
            </div>

            {/* ✅ CONTAINER FRANCÊS */}
            <div className="container-materia frances">
              <div className="header-materia">
                <h2>Francês 👤{alunosFrances.length}</h2>
              </div>
              <div className="lista-scroll">
                <ul>
                  {alunosFrances.map((aluno) => (
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
            </div>

            {/* ✅ NOVO CONTAINER ESPANHOL */}
            <div className="container-materia espanhol">
              <div className="header-materia">
                <h2>Espanhol 👤{alunosEspanhol.length}</h2>
              </div>
              <div className="lista-scroll">
                <ul>
                  {alunosEspanhol.map((aluno) => (
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
            </div>
          </div>
        ) : (
          <p>❌ Nenhum aluno encontrado.</p>
        )}

        {/* ✅ MODAL DE EXCLUSÃO (MANTIDO IGUAL) */}
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