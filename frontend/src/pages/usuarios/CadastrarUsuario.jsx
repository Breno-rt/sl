import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Modal from "react-modal";
import "./CadastrarUsuario.css";
import FadeContainer from "../../components/animations/FadeContainer";


Modal.setAppElement("#root");

function CadastrarUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [modalMensagem, setModalMensagem] = useState("");
  const [modalTipo, setModalTipo] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!nome || !email) {
      setModalMensagem("Por favor, preencha todos os campos!");
      setModalTipo("erro");
      setModalAberto(true);
      return;
    }

    try {
      await api.post("/usuarios", { nome, email });
      setModalMensagem("Usuário cadastrado com sucesso!");
      setModalTipo("sucesso");
      setModalAberto(true);
    } catch (error) {
      setModalMensagem("Erro ao cadastrar usuário.");
      setModalTipo("erro");
      setModalAberto(true);
      console.error(error);
    }
  }

  const fecharModal = () => {
    setModalAberto(false);
    if (modalTipo === "sucesso") {
      navigate("/usuarios");
    }
  };

  return (
    <FadeContainer>
      <div className="cadastrar-usuario">
      <h1>Cadastrar Usuário</h1>
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

        <div className="botoes-usuario">
          <button className="cadastrar" type="submit">Cadastrar</button>
          <Link to="/usuarios">
            <button className="cancelar">Cancelar</button>
          </Link>
        </div>
      </form>

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
    </FadeContainer>
    
  );
}

export default CadastrarUsuario;
