import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";
import "./ModalDetalhesAula.css";

function ModalDetalhesAula({ isOpen, onClose, aula, onExcluir, onEditar }) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  if (!aula) return null;

  const handleConfirmDelete = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    await onExcluir(aula.id);
    setConfirmDeleteOpen(false);
    onClose();
  };

  return (
    <>
      {/* Modal Principal */}
      {ReactDOM.createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="overlaydetalhes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
              />
              <motion.div
                className="modaldetalhes"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
              >
                <div className="modaldetalhes-content">
                  <h2>Detalhes da Aula</h2>
                  <p><strong>📚 Matéria:</strong> {aula.materia}</p>
                  <p><strong>👨‍🏫 Professor:</strong> {aula.professor}</p>
                  <p><strong>👨‍🎓 Aluno:</strong> {aula.aluno}</p>
                  <p><strong>📅 Data:</strong> {aula.data}</p>
                  <p><strong>⏰ Horário:</strong> {aula.horario}</p>
                  <br /><hr />

                  <div className="acoes">
                    <button className="excluir" onClick={handleConfirmDelete}>Excluir</button>
                    <button className="editar" onClick={() => onEditar(aula.id)}>Editar</button>
                    <button className="fechar" onClick={onClose}>Fechar</button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Modal de Confirmação de Exclusão */}
      {confirmDeleteOpen && ReactDOM.createPortal(
        <DeleteConfirmModal
          isOpen={confirmDeleteOpen}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDeleteOpen(false)}
          message={`Deseja realmente excluir a aula de ${aula.materia}?`}
        />,
        document.body
      )}
    </>
  );
}

ModalDetalhesAula.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  aula: PropTypes.shape({
    id: PropTypes.string.isRequired,
    materia: PropTypes.string,
    professor: PropTypes.string,
    aluno: PropTypes.string,
    data: PropTypes.string,
    horario: PropTypes.string,
  }),
  onExcluir: PropTypes.func.isRequired,
  onEditar: PropTypes.func.isRequired,
};

export default ModalDetalhesAula;