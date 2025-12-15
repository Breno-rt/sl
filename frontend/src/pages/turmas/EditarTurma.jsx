import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../services/api";
import "./EditarTurma.css";
import FadeContainer from "../../components/animations/FadeContainer";
import ConfirmModal from "../../components/modal/ConfirmModal";

function EditarTurma() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);
  const [materia, setMateria] = useState(""); // pra filtro interno
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMensagem, setModalMensagem] = useState("");

  useEffect(() => {
    async function fetchDados() {
      try {
        const [resTurma, resAlunos] = await Promise.all([
          api.get(`/turmas/${id}`),
          api.get("/alunos"),
        ]);

        setNome(resTurma.data.nome);
        setMateria(resTurma.data.materia);
        setAlunos(resAlunos.data);

        const selecionados = resTurma.data.alunos
          .map((relacao) => ({
           value: relacao.aluno.id,
            label: relacao.aluno.nome,
          }))
            .sort((a, b) => a.label.localeCompare(b.label)); // ⬅ ordena A-Z


        setAlunosSelecionados(selecionados);
      } catch (error) {
        console.error("Erro ao buscar dados da turma:", error);
      }
    }
    fetchDados();
  }, [id]);

  // Filtra alunos pela matéria da turma
  const alunosFiltrados = alunos
  .filter((a) => a.materia.includes(materia))
  .map((a) => ({ value: a.id, label: a.nome }))
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

  async function handleSaveEdit() {
    if (!nome || alunosSelecionados.length === 0) {
      setModalMensagem("Preencha o nome e selecione pelo menos um aluno!");
      setModalAberto(true);
      return;
    }

    try {
      await api.put(`/turmas/${id}`, {
        nome,
        materia, 
        alunoIds: alunosSelecionados.map((a) => a.value),
      });
      setModalMensagem("Turma editada com sucesso!");
      setModalAberto(true);
    } catch (error) {
      console.error(error);
      setModalMensagem("Erro ao editar turma.");
      setModalAberto(true);
    }
  }

  const fecharModal = () => {
    setModalAberto(false);
    if (modalMensagem === "Turma editada com sucesso!") {
      navigate("/turmas");
    }
  };

  return (
    <FadeContainer>
      <div className="editar-turma">
        <h2>Editar Turma</h2>

        <label>Nome da Turma:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        {/* Matéria agora é fixa — não editável */}
        <label>Matéria:</label>
        <input type="text" value={materia} disabled />

        <label>Alunos:</label>
        <Select
          options={alunosFiltrados}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          onChange={setAlunosSelecionados}
          value={alunosSelecionados}
          styles={customSelectStyles}
          placeholder="Selecione os alunos"
        />
        <br />

        <div className="botoes-aluno">
          <button onClick={handleSaveEdit}>Salvar</button>
          <button onClick={() => navigate("/turmas")}>Cancelar</button>
        </div>

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

export default EditarTurma;
