import { Link, useNavigate } from "react-router-dom";
import Calendario from "../components/Calendario"; // Importa o componente Calendario
import logo from "../assets/titulo.png"; // Importa o logo
import "./Home.css"; // Importa o arquivo CSS

function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="home-container">
      {/* Cabeçalho */}
      <div className="header">
        <img src={logo} alt="Logo da Escola" className="logo" />
        <h1 className="welcome-message">Bem-vindo, Lucas!</h1>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {/* Botões de Gerenciamento */}
      <div className="management-buttons">
        <Link to="/usuarios" className="management-button">
          Usuários
        </Link>
        <Link to="/professores" className="management-button">
          Professores
        </Link>
        <Link to="/alunos" className="management-button">
          Alunos
        </Link>
        <Link to="/aulas" className="management-button">
          Aulas
        </Link>
      </div>

      {/* Calendário */}
      <div className="calendar-container">
        <Calendario />
      </div>
    </div>
  );
}

export default Home;