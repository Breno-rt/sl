import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import "./ModalAulasDia.css";

function ModalAulasDia({ isOpen, onClose, dataSelecionada, aulasDoDia, onAulaClick }) {
  const [professorFiltro, setProfessorFiltro] = useState("todos");

  // Lista única de professores
  const professoresUnicos = [...new Set(aulasDoDia.map((aula) => aula.extendedProps.professor))];

  // Aplica o filtro
  const aulasFiltradas =
    professorFiltro === "todos"
      ? aulasDoDia
      : aulasDoDia.filter((aula) => aula.extendedProps.professor === professorFiltro);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="overlaylista"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="modallista"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
          >
            <h2>Aulas do dia {dataSelecionada}</h2>

            {/* Filtro de professor */}
            {professoresUnicos.length > 1 && (
              <div className="filtro-professor">
                <label>Filtrar por professor: </label>
                <select
                  value={professorFiltro}
                  onChange={(e) => setProfessorFiltro(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  {professoresUnicos.map((prof) => (
                    <option key={prof} value={prof}>
                      {prof}
                    </option>
                  ))}
                </select>
              </div>
            )}
<br /><hr /><br />
            <ul className="lista-aulas-dia">
              {aulasFiltradas.map((aula) => (
                <li
                  key={aula.id}
                  className="aula-item"
                  onClick={() => onAulaClick(aula)}
                >
                  <span className="horario">{aula.extendedProps.horario}</span>
                  <span className="pontinho">•</span>
                  <span className="professor">{aula.extendedProps.professor}</span>
                  <span className="pontinho">•</span>
                  <span className="materia">{aula.extendedProps.materia}</span>
                </li>
              ))}
            </ul>

            <br />
            <hr />
            <br />
            <div className="acoes">
              <button onClick={() => (window.location.href = "/agendar-aula")}>
                Agendar Aula
              </button>
              <button className="fechar" onClick={onClose}>
                Fechar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

ModalAulasDia.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dataSelecionada: PropTypes.string,
  aulasDoDia: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      extendedProps: PropTypes.shape({
        horario: PropTypes.string,
        professor: PropTypes.string,
        materia: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  onAulaClick: PropTypes.func.isRequired,
};

export default ModalAulasDia;
