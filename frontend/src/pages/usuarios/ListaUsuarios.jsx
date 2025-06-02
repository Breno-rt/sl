import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaUsuarios.css";

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
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

  async function handleDeleteUsuario(id) {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await api.delete(`/usuarios/${id}`);
        setUsuarios(usuarios.filter((user) => user.id !== id));
      } catch (error) {
        console.error("❌ Erro ao excluir usuário", error);
      }
    }
  }

  return (
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
                  <button className="editar" onClick={() => navigate(`/editar-usuario/${user.id}`)}>✏️ Editar</button>
                  <button className="excluir" onClick={() => handleDeleteUsuario(user.id)}>❌ Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>❌ Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}

export default ListaUsuarios;
