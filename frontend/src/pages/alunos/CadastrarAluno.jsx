import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./CadastrarAluno.css";
import FadeContainer from "../../components/animations/FadeContainer";
import ConfirmModal from "../../components/modal/ConfirmModal"; // ✅ importamos o modal genérico

function CadastrarAluno() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [materia, setMateria] = useState([]);
  const [modalAberto, setModalAberto] = useState(false); // estado modal
  const [modalMensagem, setModalMensagem] = useState(""); // mensagem modal
  const [modalTipo, setModalTipo] = useState(""); // "sucesso" ou "erro"
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

  // Quando fecha modal → se sucesso, redireciona
  const fecharModal = () => {
    setModalAberto(false);
    if (modalTipo === "sucesso") {
      navigate("/alunos");
    }
  };

  return (
    <FadeContainer>
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
            <label>
              <input
                type="checkbox"
                value="Inglês"
                onChange={handleMateriaChange}
              />{" "}
              Inglês
            </label>
            <label>
              <input
                type="checkbox"
                value="Francês"
                onChange={handleMateriaChange}
              />{" "}
              Francês
            </label>
            <label>
              <input
                type="checkbox"
                value="Espanhol"
                onChange={handleMateriaChange}
              />{" "}
              Espanhol
            </label>
          </div>

          <div className="botoes-aluno">
            <button className="cadastrar" type="submit">Cadastrar</button>
            <Link to="/alunos">
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

export default CadastrarAluno;
