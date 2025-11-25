import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CadastrarProfessor.css"
import FadeContainer from "../../components/animations/FadeContainer";
import ConfirmModal from "../../components/modal/ConfirmModal"; 



function CadastrarProfessor() {
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
      await api.post("/professores", { nome, email, telefone, materia });
      setModalMensagem("Professor cadastrado com sucesso!");
      setModalTipo("sucesso");
      setModalAberto(true);
    } catch (error) {
      setModalMensagem("Erro ao cadastrar professor.");
      setModalTipo("erro");
      setModalAberto(true);
      console.error(error);
    }
  }

   const fecharModal = () => {
    setModalAberto(false);
    if (modalTipo === "sucesso") {
      navigate("/professores");
    }
  };

  return (
    <FadeContainer>
      <div className="cadastrar-professor">
      <h1>Cadastrar Professor</h1>
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
          <label><input type="checkbox" value="Inglês" onChange={handleMateriaChange} />Inglês </label>
          <label><input type="checkbox" value="Francês" onChange={handleMateriaChange} />Francês </label>
          <label><input type="checkbox" value="Espanhol" onChange={handleMateriaChange} />Espanhol </label>
        </div>

      <div className="botoes-professor">
          <button className="cadastrar" type="submit">Cadastrar</button>
        <Link to="/professores">
          <button className="cancelar">Cancelar</button>
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

export default CadastrarProfessor;