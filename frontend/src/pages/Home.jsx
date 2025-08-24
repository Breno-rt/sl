import { Link, useNavigate } from "react-router-dom";
import Calendario from "../components/Calendario"; 
import logo from "../assets/titulo.png"; 
import PageTransition from "../components/animations/PageTransition"; // Importa a animação
import "./Home.css"; 

function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <PageTransition type="fade">
      <div className="home-container">
        {/* Cabeçalho */}
        <div className="header">
          <img src={logo} alt="Logo da Escola" className="logo" />
          <h1 className="welcome-message">Bem-vindo</h1>
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>

        {/* Botões de Gerenciamento */}
        <div className="management-buttons">
          <Link to="/usuarios" className="management-button">Usuários</Link>
          <Link to="/professores" className="management-button">Professores</Link>
          <Link to="/alunos" className="management-button">Alunos</Link>
          <Link to="/aulas" className="management-button">Aulas</Link>
        </div>

        {/* Calendário */}
        <div className="calendar-container">
          <Calendario />
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;
