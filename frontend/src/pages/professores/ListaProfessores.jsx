import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaProfessores.css"; 
import FadeContainer from "../../components/animations/FadeContainer";

function ListaProfessores() {
  const [professores, setProfessores] = useState([]);
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

  async function handleDeleteProfessor(id) {
    if (window.confirm("Tem certeza que deseja excluir este professor?")) {
      try {
        await api.delete(`/professores/${id}`);
        setProfessores(professores.filter((prof) => prof.id !== id));
      } catch (error) {
        console.error("❌ Erro ao excluir professor", error);
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
                <button className="editar" onClick={() => navigate(`/editar-professor/${prof.id}`)}>✏️ Editar</button>
                <button className="excluir" onClick={() => handleDeleteProfessor(prof.id)}>❌ Excluir</button>
              </div>
            </li>
          ))}
        </ul>
        </div>
      ) : (
        <p>❌ Nenhum professor encontrado.</p>
      )}
    </div>
    </FadeContainer>
    
  );
}

export default ListaProfessores;
