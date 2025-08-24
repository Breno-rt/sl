import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import api from "../services/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

// Importando os novos modais
import ModalAulasDia from "./modal/ModalAulasDia";
import ModalDetalhesAula from "./modal/ModalDetalhesAula";

function Calendario() {
  const [aulas, setAulas] = useState([]);
  const [modalAulaAberto, setModalAulaAberto] = useState(false);
  const [modalDiaAberto, setModalDiaAberto] = useState(false);
  const [aulaSelecionada, setAulaSelecionada] = useState(null);
  const [aulasDoDia, setAulasDoDia] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAulas() {
      try {
        const response = await api.get("/aulas");

        const eventos = response.data.map((aula) => {
          return {
            id: aula.id,
            title: aula.materia,
            start: `${aula.data}T${aula.horario}:00`,
            extendedProps: {
              professor: aula.professor.nome,
              aluno: aula.aluno.nome,
              materia: aula.materia,
              horario: aula.horario,
            },
          };
        });

        setAulas(eventos);
      } catch (error) {
        console.error("❌ Erro ao buscar aulas", error);
      }
    }

    fetchAulas();

    const interval = setInterval(fetchAulas, 5000);
    return () => clearInterval(interval);
  }, []);

  // 📌 Quando clica em um dia, abre o modal com a lista de aulas daquele dia
  function handleDayClick(info) {
    if (modalAulaAberto || modalDiaAberto) return;

    const dataClicada = format(info.date, "yyyy-MM-dd");
    const aulasFiltradas = aulas.filter(
      (aula) => format(new Date(aula.start), "yyyy-MM-dd") === dataClicada
    );

    const aulasOrdenadas = aulasFiltradas.sort((a, b) => {
      const horarioA = a.extendedProps.horario;
      const horarioB = b.extendedProps.horario;
      return horarioA.localeCompare(horarioB);
    });

    setDataSelecionada(format(info.date, "dd/MM/yyyy", { locale: ptBR }));
    setAulasDoDia(aulasOrdenadas);
    setModalDiaAberto(true);
  }

  // 📌 Quando clica em uma aula, abre o modal da aula
  function handleAulaClick(aula) {
    setModalDiaAberto(false);
    setTimeout(() => {
      setAulaSelecionada({
        id: aula.id,
        aluno: aula.extendedProps.aluno,
        professor: aula.extendedProps.professor,
        horario: aula.extendedProps.horario,
        materia: aula.extendedProps.materia,
        data: format(new Date(aula.start), "dd/MM/yyyy", { locale: ptBR }),
      });
      setModalAulaAberto(true);
    }, 300);
  }

const handleExcluirAula = async (id) => {
  try {
    await api.delete(`/aulas/${id}`);
    setAulas(aulas.filter((aula) => aula.id !== id));
    setModalAulaAberto(false);
  } catch (error) {
    alert("Erro ao excluir aula!");
    console.error(error);
  }
};


  const handleEditarAula = (id) => {
    navigate(`/editar-aula/${id}`);
    setModalAulaAberto(false);
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", gap: "20px" }}>
      {/* Calendário */}
      <div style={{ flex: 1, width: "100%", height: "100%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={aulas}
          dateClick={handleDayClick}
          height="auto"
          eventDisplay="none"
          dayCellContent={(arg) => {
            const count = aulas.filter(
              (aula) =>
                format(new Date(aula.start), "yyyy-MM-dd") ===
                format(arg.date, "yyyy-MM-dd")
            ).length;

            return (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  cursor: "pointer",
                }}
              >
                <strong
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                    zIndex: 1,
                    marginBottom: "5px",
                  }}
                >
                  {arg.date.getDate()}
                </strong>

                {count > 0 && (
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#3582db",
                      zIndex: 1,
                    }}
                  >
                    {count} {count === 1 ? "aula" : "aulas"}
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>

      {/* Modal de aulas do dia */}
      <ModalAulasDia
        isOpen={modalDiaAberto}
        onClose={() => setModalDiaAberto(false)}
        dataSelecionada={dataSelecionada}
        aulasDoDia={aulasDoDia}
        onAulaClick={handleAulaClick}
      />

      {/* Modal de detalhes da aula */}
      <ModalDetalhesAula
        isOpen={modalAulaAberto}
        onClose={() => setModalAulaAberto(false)}
        aula={aulaSelecionada}
        onExcluir={handleExcluirAula}
        onEditar={handleEditarAula}
      />
    </div>
  );
}

export default Calendario;
