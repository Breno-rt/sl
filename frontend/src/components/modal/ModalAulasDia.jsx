import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import { format, parse, addDays, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import "./ModalAulasDia.css";

function ModalAulasDia({ isOpen, onClose, dataSelecionada, onAulaClick, aulas }) {
  const [professorFiltro, setProfessorFiltro] = useState("todos");
  const [dataAtual, setDataAtual] = useState(null);

  // ✅ INICIALIZA A DATA ATUAL QUANDO ABRE O MODAL
  useEffect(() => {
    if (isOpen && dataSelecionada) {
      const dataParse = parse(dataSelecionada, "dd/MM/yyyy", new Date());
      setDataAtual(dataParse);
    }
  }, [isOpen, dataSelecionada]);

  // ✅ Resetar filtro sempre que o usuário mudar o dia
useEffect(() => {
  setProfessorFiltro("todos");
}, [dataAtual]);


  // ✅ NAVEGAÇÃO ENTRE DIAS
  const avancarDia = () => {
    setDataAtual(prev => addDays(prev, 1));
  };

  const retrocederDia = () => {
    setDataAtual(prev => subDays(prev, 1));
  };

  // ✅ FORMATA DATA PARA EXIBIÇÃO ( EX: Segunda-feira, 15 de Março de 2024)
  const formatarDataExtenso = (data) => {
    return format(data, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  // ✅ FORMATA DATA PARA FILTRO (yyyy-MM-dd)
  const formatarDataParaFiltro = (data) => {
    return format(data, "yyyy-MM-dd");
  };

  // ✅ FILTRA AULAS DA DATA ATUAL
  const aulasDoDiaAtual = dataAtual ? aulas.filter(aula => {
    const dataAula = format(new Date(aula.start), "yyyy-MM-dd");
    return dataAula === formatarDataParaFiltro(dataAtual);
  }) : [];

  // ✅ ORDENA AULAS CRONOLOGICAMENTE
  const aulasOrdenadas = [...aulasDoDiaAtual].sort((a, b) => {
    return a.extendedProps.horario.localeCompare(b.extendedProps.horario);
  });

  // ✅ LISTA ÚNICA DE PROFESSORES
  const professoresUnicos = [...new Set(aulasOrdenadas.map((aula) => aula.extendedProps.professor))];

  // ✅ APLICA FILTRO DE PROFESSOR
  const aulasFiltradas =
    professorFiltro === "todos"
      ? aulasOrdenadas
      : aulasOrdenadas.filter((aula) => aula.extendedProps.professor === professorFiltro);

  // ✅ SE NÃO HÁ DATA, NÃO RENDERIZA
  if (!dataAtual) return null;

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
            <div className="modallista-content">
              {/* ✅ HEADER COM SETAS E DATA POR EXTENSO */}
              <div className="header-navegacao">
                <button className="seta-navegacao" onClick={retrocederDia}>
                  ◀
                </button>
                
                <h2>{formatarDataExtenso(dataAtual)}</h2>
                
                <button className="seta-navegacao" onClick={avancarDia}>
                  ▶
                </button>
              </div>

              {/* ✅ FILTRO DE PROFESSOR */}
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
              
              <br />

              {/* ✅ LISTA DE AULAS */}
              <ul className="lista-aulas-dia">
                {aulasFiltradas.length > 0 ? (
                  aulasFiltradas.map((aula) => (
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
                  ))
                ) : (
                  // ✅ MENSAGEM QUANDO NÃO HÁ AULAS
                  <li className="nenhuma-aula">
                    {aulasOrdenadas.length > 0 
                      ? "Nenhuma aula com este filtro" 
                      : "Nenhuma aula neste dia"
                    }
                  </li>
                )}
              </ul>
              
              <br />

              {/* ✅ BOTÕES DE AÇÃO (MANTIDOS) */}
              <div className="acoes">
                <button onClick={() => (window.location.href = "/agendar-aula")}>
                  Agendar Aula
                </button>
                <button className="fechar" onClick={onClose}>
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ✅ PROP TYPES ATUALIZADAS
ModalAulasDia.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dataSelecionada: PropTypes.string,
  onAulaClick: PropTypes.func.isRequired,
  aulas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      extendedProps: PropTypes.shape({
        horario: PropTypes.string,
        professor: PropTypes.string,
        materia: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};

export default ModalAulasDia;