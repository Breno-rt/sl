// src/components/modals/ConfirmModal.jsx
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import "./ConfirmModal.css";

function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  confirmText = "Confirmar",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Confirmação"
          >
            <p>{message}</p>
            <div className="modal-actions">
              {onConfirm && (
                <button className="confirm" onClick={onConfirm}>
                  {confirmText}
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
};

ConfirmModal.defaultProps = {
  message: "",
  onConfirm: undefined,
  confirmText: "Confirmar",
};

export default ConfirmModal;
