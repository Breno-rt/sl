import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ListaAulas.css";

// Função para formatar a data corretamente
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

    const interval = setInterval(fetchAulas, 5000); // polling a cada 5 segundos

    return () => clearInterval(interval); // limpa intervalo ao desmontar
  }, []);

  async function handleDeleteAula(id) {
    if (window.confirm("Tem certeza que deseja excluir esta aula?")) {
      try {
        await api.delete(`/aulas/${id}`);
        setAulas(aulas.filter((aula) => aula.id !== id));
      } catch (error) {
        console.error("❌ Erro ao excluir aula", error);
      }
    }
  }

  return (
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
              <strong>👨‍🎓 Aluno:</strong> {aula.aluno.nome} <br />
              <br />
              <div className="botoes-acao">
                <button className="editar" onClick={() => navigate(`/editar-aula/${aula.id}`)}>✏️ Editar</button>
                <button className="excluir" onClick={() => handleDeleteAula(aula.id)}>❌ Excluir</button>
              </div>
            </li>
          ))}
        </ul>
        </div>

      ) : (
        <p>❌ Nenhuma aula agendada.</p>
      )}
    </div>
  );
}

export default ListaAulas;