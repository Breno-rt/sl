import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaAlunos.css";

function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
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

  async function handleDeleteAluno(id) {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await api.delete(`/alunos/${id}`);
        setAlunos(alunos.filter((aluno) => aluno.id !== id));
      } catch (error) {
        console.error("❌ Erro ao excluir aluno", error);
      }
    }
  }

  return (
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
                <button className="editar" onClick={() => navigate(`/editar-aluno/${aluno.id}`)}>✏️ Editar</button>
                <button className="excluir" onClick={() => handleDeleteAluno(aluno.id)}>❌ Excluir</button>
              </div>
            </li>
          ))}
        </ul></div>

      ) : (
        <p>❌ Nenhum aluno encontrado.</p>
      )}
    </div>
  );
}

export default ListaAlunos;
