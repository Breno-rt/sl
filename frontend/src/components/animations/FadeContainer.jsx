import { motion } from "framer-motion";
import PropTypes from "prop-types"; // 👈 importa aqui

export default function FadeContainer({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// 👇 adiciona a validação do tipo da prop
FadeContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
