import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import api from "../../services/api";
import "./CadastrarTurma.css";
import FadeContainer from "../../components/animations/FadeContainer";
import ConfirmModal from "../../components/modal/ConfirmModal";

function CadastrarTurma() {
  const [materia, setMateria] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);
  const [nome, setNome] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMensagem, setModalMensagem] = useState("");
  const [modalTipo, setModalTipo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const response = await api.get("/alunos");
        setAlunos(response.data);
      } catch (error) {
        console.error("Erro ao buscar alunos", error);
      }
    }
    fetchAlunos();
  }, []);

  // Filtra alunos pela matéria selecionada
  const alunosFiltrados = alunos
  .filter((aluno) => aluno.materia.includes(materia))
  .map((aluno) => ({ value: aluno.id, label: aluno.nome }))
  .sort((a, b) => a.label.localeCompare(b.label)); 


  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--fundo-escuro)",
      color: "var(--texto-claro)",
      borderRadius: "5px",
      border: "none",
      padding: "2px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "var(--azul-primario)",
      color: "var(--texto-claro)",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "var(--texto-claro)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--fundo-cinza)",
      color: "var(--texto-claro)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "var(--azul-hover)"
        : "var(--fundo-cinza)",
      color: "var(--texto-claro)",
      cursor: "pointer",
    }),
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!nome || !materia || alunosSelecionados.length === 0) {
      setModalMensagem("Por favor, preencha todos os campos!");
      setModalTipo("erro");
      setModalAberto(true);
      return;
    }

    try {
      await api.post("/turmas", {
        nome,
        materia,
        alunoIds: alunosSelecionados.map((aluno) => aluno.value),
      });
      setModalMensagem("Turma cadastrada com sucesso!");
      setModalTipo("sucesso");
      setModalAberto(true);
    } catch (error) {
      console.error("Erro ao cadastrar turma", error);
      setModalMensagem("Erro ao cadastrar turma.");
      setModalTipo("erro");
      setModalAberto(true);
    }
  }

  const fecharModal = () => {
    setModalAberto(false);
    if (modalTipo === "sucesso") {
      navigate("/turmas");
    }
  };

  return (
    <FadeContainer>
      <div className="cadastrar-turma">
        <h1>Cadastrar Turma</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nome">Nome da Turma:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="materia">Matéria:</label>
            <select
              id="materia"
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              required
            >
              <option value="">Selecione uma matéria</option>
              <option value="Inglês">Inglês</option>
              <option value="Francês">Francês</option>
              <option value="Espanhol">Espanhol</option>
            </select>
          </div>

          <div>
            <label htmlFor="alunos">Alunos:</label>
            <Select
              id="alunos"
              options={alunosFiltrados}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              onChange={setAlunosSelecionados}
              value={alunosSelecionados}
              placeholder="Selecione os alunos"
              styles={customSelectStyles}
              isDisabled={!materia} // só habilita após escolher a matéria
            />
          </div><br />

          <div className="botoes-aluno">
            <button className="cadastrar" type="submit">
              Cadastrar
            </button>
            <Link to="/turmas">
              <button className="cancelar" type="button">
                Cancelar
              </button>
            </Link>
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

export default CadastrarTurma;
