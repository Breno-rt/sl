import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom"; // ADICIONE ESTA IMPORT
import "./ModalAulasDia.css";

function ModalAulasDia({ isOpen, onClose, dataSelecionada, aulasDoDia, onAulaClick }) {
  // Use Portal para renderizar fora da hierarquia principal
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

            <ul className="lista-aulas-dia">
              {aulasDoDia.map((aula) => (
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
<br /><hr />
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
    document.body // RENDERIZE DIRETO NO BODY
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
