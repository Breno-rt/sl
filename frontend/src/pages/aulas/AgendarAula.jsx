import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./AgendarAula.css";
import FadeContainer from "../../components/animations/FadeContainer";
import ConfirmModal from "../../components/modal/ConfirmModal";

function AgendarAula() {
  const [materia, setMateria] = useState("");
  const [tipo, setTipo] = useState(""); // aluno | turma

  const [professores, setProfessores] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);

  const [professorId, setProfessorId] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [turmaId, setTurmaId] = useState("");

  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  const [modalAberto, setModalAberto] = useState(false);
  const [modalMensagem, setModalMensagem] = useState("");
  const [modalTipo, setModalTipo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDados() {
      try {
        const [resProf, resAlunos, resTurmas] = await Promise.all([
          api.get("/professores"),
          api.get("/alunos"),
          api.get("/turmas"),
        ]);

        setProfessores(resProf.data);
        setAlunos(resAlunos.data);
        setTurmas(resTurmas.data);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    }
    fetchDados();
  }, []);

  const professoresFiltrados = professores.filter((p) =>
    p.materia.includes(materia)
  );

  const alunosFiltrados = alunos.filter((a) =>
    a.materia.includes(materia)
  );

  const turmasFiltradas = turmas.filter(
    (t) => t.materia === materia
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!materia || !professorId || !tipo || !data || !horario) {
      setModalMensagem("Preencha todos os campos!");
      setModalTipo("erro");
      setModalAberto(true);
      return;
    }

    if (tipo === "aluno" && !alunoId) {
      setModalMensagem("Selecione um aluno.");
      setModalTipo("erro");
      setModalAberto(true);
      return;
    }

    if (tipo === "turma" && !turmaId) {
      setModalMensagem("Selecione uma turma.");
      setModalTipo("erro");
      setModalAberto(true);
      return;
    }

    try {
      await api.post("/aulas", {
        professorId,
        data,
        horario,
        materia,
        alunoId: tipo === "aluno" ? alunoId : undefined,
        turmaId: tipo === "turma" ? turmaId : undefined,
      });

      setModalMensagem("Aula agendada com sucesso!");
      setModalTipo("sucesso");
      setModalAberto(true);
    } catch (error) {
      setModalMensagem(
        error.response?.data?.error || "Erro ao agendar aula."
      );
      setModalTipo("erro");
      setModalAberto(true);
    }
  }

  const fecharModal = () => {
    setModalAberto(false);
    if (modalTipo === "sucesso") {
      navigate("/");
    }
  };

  return (
    <FadeContainer>
      <div className="agendar-aula">
        <h1>Agendar Aula</h1>

        <form onSubmit={handleSubmit}>
          <label>Matéria:</label>
          <select value={materia} onChange={(e) => setMateria(e.target.value)}>
            <option value="">Selecione</option>
            <option value="Inglês">Inglês</option>
            <option value="Francês">Francês</option>
            <option value="Espanhol">Espanhol</option>
          </select>

          <label>Professor:</label>
          <select
            value={professorId}
            onChange={(e) => setProfessorId(e.target.value)}
            disabled={!materia}
          >
            <option value="">Selecione</option>
            {professoresFiltrados.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>

          <label>Tipo de Aula:</label>
          <select
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value);
              setAlunoId("");
              setTurmaId("");
            }}
            disabled={!materia}
          >
            <option value="">Selecione</option>
            <option value="aluno">Aluno</option>
            <option value="turma">Turma</option>
          </select>

          {tipo === "aluno" && (
            <>
              <label>Aluno:</label>
              <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>
                <option value="">Selecione</option>
                {alunosFiltrados.map((a) => (
                  <option key={a.id} value={a.id}>{a.nome}</option>
                ))}
              </select>
            </>
          )}

          {tipo === "turma" && (
            <>
              <label>Turma:</label>
              <select value={turmaId} onChange={(e) => setTurmaId(e.target.value)}>
                <option value="">Selecione</option>
                {turmasFiltradas.map((t) => (
                  <option key={t.id} value={t.id}>{t.nome}</option>
                ))}
              </select>
            </>
          )}

          <label>Data:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />

          <label>Horário:</label>
          <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} />

          <div className="botoes-aluno">
            <button className="agendar">Agendar Aula</button>
            <Link to="/"><button type="button" className="cancelar">Voltar</button></Link>
          </div>
        </form>

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
