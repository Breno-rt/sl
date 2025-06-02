import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Modal from "react-modal";
import "./CadastrarAluno.css"

// Configuração global para o modal
Modal.setAppElement("#root");

function CadastrarAluno() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [materia, setMateria] = useState([]);
  const [modalAberto, setModalAberto] = useState(false); // Estado para controlar o modal
  const [modalMensagem, setModalMensagem] = useState(""); // Mensagem do modal
  const [modalTipo, setModalTipo] = useState(""); // Tipo do modal (sucesso, erro)
  const navigate = useNavigate();

  function handleMateriaChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      setMateria([...materia, value]);
    } else {
      setMateria(materia.filter((m) => m !== value));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!nome || !email || !telefone || materia.length === 0) {
      setModalMensagem("Por favor, preencha todos os campos!");
      setModalTipo("erro");
      setModalAberto(true);
      return;
    }

    try {
      await api.post("/alunos", { nome, email, telefone, materia });
      setModalMensagem("Aluno cadastrado com sucesso!");
      setModalTipo("sucesso");
      setModalAberto(true);
    } catch (error) {
      setModalMensagem("Erro ao cadastrar aluno.");
      setModalTipo("erro");
      setModalAberto(true);
      console.error(error);
    }
  }

  const fecharModal = () => {
    setModalAberto(false);
    if (modalTipo === "sucesso") {
      navigate("/alunos"); // Redireciona para a lista de alunos após sucesso
    }
  };

  return (
    <div className="cadastrar-aluno">
      <h1>Cadastrar Aluno</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome: </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="telefone">Telefone: </label>
          <input
            type="text"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="Matéria">Matéria: </label>
          <label><input type="checkbox" value="Inglês" onChange={handleMateriaChange} /> Inglês</label>
          <label><input type="checkbox" value="Francês" onChange={handleMateriaChange} /> Francês</label>
        </div>
        
        <div className="botoes-aluno"></div>
        <button className="cadastrar" type="submit">Cadastrar</button>
        <Link to="/alunos">
          <button className="cancelar">Cancelar</button>
        </Link>
      </form>

      {/* Modal para exibir mensagens */}
      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        contentLabel="Mensagem"
        style={{
          content: {
            width: "30%",
            height: "20%",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#222",
            color: "#fff",
            textAlign: "center",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <p>{modalMensagem}</p>
        <button onClick={fecharModal}>OK</button>
      </Modal>
    </div>
  );
}

export default CadastrarAluno;