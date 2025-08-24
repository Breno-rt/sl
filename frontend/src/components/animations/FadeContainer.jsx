import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function FadeContainer({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }} 
    >
      {children}
    </motion.div>
  );
}

FadeContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
