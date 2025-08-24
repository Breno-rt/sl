import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./AgendarAula.css"
import FadeContainer from "../../components/animations/FadeContainer";
import ConfirmModal from "../../components/modal/ConfirmModal"; 


function AgendarAula() {
  const [materia, setMateria] = useState("");
  const [professores, setProfessores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [professorId, setProfessorId] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [modalAberto, setModalAberto] = useState(false); // Estado para controlar o modal
  const [modalMensagem, setModalMensagem] = useState(""); // Mensagem do modal
  const [modalTipo, setModalTipo] = useState(""); // Tipo do modal (sucesso, erro, etc.)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDados() {
      try {
        const responseProfessores = await api.get("/professores");
        const responseAlunos = await api.get("/alunos");

        setProfessores(responseProfessores.data);
        setAlunos(responseAlunos.data);
      } catch (error) {
        console.error("Erro ao buscar professores e alunos", error);
      }
    }
    fetchDados();
  }, []);

  // Filtra professores e alunos que tenham a matéria selecionada no array de matérias deles
  const professoresFiltrados = professores.filter((prof) => prof.materia.includes(materia));
  const alunosFiltrados = alunos.filter((aluno) => aluno.materia.includes(materia));

  async function handleSubmit(event) {
    event.preventDefault();

    if (!materia || !professorId || !alunoId || !data || !horario) {
      setModalMensagem("Por favor, preencha todos os campos!");
      setModalTipo("erro");
      setModalAberto(true);
      return;
    }

    try {
      // Envia a data no formato YYYY-MM-DD e o horário no formato HH:mm
      await api.post("/aulas", { professorId, alunoId, data, horario, materia });
      setModalMensagem("Aula agendada com sucesso!");
      setModalTipo("sucesso");
      setModalAberto(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setModalMensagem(error.response.data.error); // Exibe a mensagem de erro do backend
      } else {
        setModalMensagem("Erro ao agendar aula.");
      }
      setModalTipo("erro");
      setModalAberto(true);
      console.error(error);
    }
  }

  const fecharModal = () => {
    setModalAberto(false);
    if (modalTipo === "sucesso") {
      navigate("/aulas"); // Redireciona para a lista de aulas após sucesso
    }
  };

  return (
    <FadeContainer>
      <div className="agendar-aula">
      <h1>Agendar Aula</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="materia">Matéria: </label>
          <select id="materia" value={materia} onChange={(e) => setMateria(e.target.value)} required>
            <option value="">Selecione uma matéria</option>
            <option value="Inglês">Inglês</option>
            <option value="Francês">Francês</option>
          </select>
        </div>

        <div>
          <label htmlFor="professor">Professor: </label>
          <select id="professor" value={professorId} onChange={(e) => setProfessorId(e.target.value)} required disabled={!materia}>
            <option value="">Selecione um professor</option>
            {professoresFiltrados.map((prof) => (
              <option key={prof.id} value={prof.id}>{prof.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="aluno">Aluno: </label>
          <select id="aluno" value={alunoId} onChange={(e) => setAlunoId(e.target.value)} required disabled={!materia}>
            <option value="">Selecione um aluno</option>
            {alunosFiltrados.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>{aluno.nome}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="data">Data: </label>
          <input type="date" id="data" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="horario">Horário: </label>
          <input type="time" id="horario" value={horario} onChange={(e) => setHorario(e.target.value)} required />
        </div>
    
        <div className="botoes-aluno">
          <button className="agendar" type="submit">Agendar Aula</button>
        <Link to="/aulas">
          <button className="cancelar">Voltar</button>
        </Link>
        </div>

      </form>

      {/* Modal para exibir mensagens */}
        <ConfirmModal
          isOpen={modalAberto}
          message={modalMensagem}
          onConfirm={fecharModal}
          confirmText="OK"
        />
    </div>
    </FadeContainer>
    
  );
}

export default AgendarAula;