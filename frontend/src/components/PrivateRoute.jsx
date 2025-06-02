import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decodificar o token para verificar se ele expirou
  const tokenData = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do JWT
  const tokenExpirado = tokenData.exp * 1000 < Date.now(); // Verifica se o tempo de expiração já passou

  if (tokenExpirado) {
    localStorage.removeItem("token"); // Remove o token expirado
    return <Navigate to="/login" />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
