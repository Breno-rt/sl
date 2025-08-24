import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaUsuarios.css";
import FadeContainer from "../../components/animations/FadeContainer";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal"; // ✅ Importa o modal

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioParaDeletar, setUsuarioParaDeletar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await api.get("/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar usuários", error);
      }
    }
    fetchUsuarios();
  }, []);

  function openDeleteModal(id) {
    setUsuarioParaDeletar(id);
    setModalAberto(true);
  }

  function closeDeleteModal() {
    setUsuarioParaDeletar(null);
    setModalAberto(false);
  }

  async function handleConfirmDelete() {
    if (usuarioParaDeletar) {
      try {
        await api.delete(`/usuarios/${usuarioParaDeletar}`);
        setUsuarios(usuarios.filter((user) => user.id !== usuarioParaDeletar));
      } catch (error) {
        console.error("❌ Erro ao excluir usuário", error);
      } finally {
        closeDeleteModal();
      }
    }
  }

  return (
    <FadeContainer>
      <div className="lista-usuarios">
        <h1>Lista de Usuários</h1>
        <div className="botoes-navegacao">
          <Link to="/cadastrar-usuario">
            <button className="botao-cadastrar">Cadastrar Novo Usuário</button>
          </Link>
          <Link to="/">
            <button className="botao-voltar">Voltar</button>
          </Link>
        </div>
        <br />
        {usuarios.length > 0 ? (
          <div className="lista-scroll">
            <ul>
              {usuarios.map((user) => (
                <li key={user.id}>
                  <strong>👤 Nome:</strong> {user.nome} <br />
                  <strong>📧 Email:</strong> {user.email} <br />
                  <div className="botoes-acao">
                    <button
                      className="editar"
                      onClick={() => navigate(`/editar-usuario/${user.id}`)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="excluir"
                      onClick={() => openDeleteModal(user.id)}
                    >
                      ❌ Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>❌ Nenhum usuário encontrado.</p>
        )}

        {/* ✅ Modal de exclusão */}
        <DeleteConfirmModal
          isOpen={modalAberto}
          message="Tem certeza que deseja excluir este usuário?"
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteModal}
        />
      </div>
    </FadeContainer>
  );
}

export default ListaUsuarios;
