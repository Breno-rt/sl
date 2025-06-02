import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";
import api from "../services/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Para redirecionar

// Configuração global do modal
Modal.setAppElement("#root");

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
            title: aula.materia, // Título do evento (matéria)
            start: `${aula.data}T${aula.horario}:00`, // Formato YYYY-MM-DDTHH:mm:ss
            extendedProps: {
              professor: aula.professor.nome,
              aluno: aula.aluno.nome,
              materia: aula.materia,
              horario: aula.horario, // Adiciona o horário aqui
            },
          };
        });

        setAulas(eventos);
      } catch (error) {
        console.error("❌ Erro ao buscar aulas", error);
      }
    }

    fetchAulas();

    const interval = setInterval(fetchAulas, 5000); // polling de 5 segundos

    return () => clearInterval(interval); // limpa no desmontar
  }, []);

  // 📌 Quando clica em um dia, abre o modal com a lista de aulas daquele dia
  function handleDayClick(info) {
    if (modalAulaAberto || modalDiaAberto) return; // Bloqueia abertura múltipla de modais

    const dataClicada = format(info.date, "yyyy-MM-dd");
    const aulasFiltradas = aulas.filter(
      (aula) => format(new Date(aula.start), "yyyy-MM-dd") === dataClicada
    );

    // Ordena as aulas por horário (do mais cedo para o mais tarde)
    const aulasOrdenadas = aulasFiltradas.sort((a, b) => {
      const horarioA = a.extendedProps.horario;
      const horarioB = b.extendedProps.horario;
      return horarioA.localeCompare(horarioB);
    });

    setDataSelecionada(format(info.date, "dd/MM/yyyy", { locale: ptBR })); // Formata para DD/MM/YYYY
    setAulasDoDia(aulasOrdenadas); // Define as aulas ordenadas
    setModalDiaAberto(true);
  }

  // 📌 Quando clica em uma aula, abre o modal da aula
  function handleAulaClick(aula) {
    setModalDiaAberto(false); // Fecha o modal do contador
    setTimeout(() => {
      setAulaSelecionada({
        id: aula.id,
        aluno: aula.extendedProps.aluno,
        professor: aula.extendedProps.professor,
        horario: aula.extendedProps.horario, // Usa o horário salvo nas extendedProps
        materia: aula.extendedProps.materia,
        data: format(new Date(aula.start), "dd/MM/yyyy", { locale: ptBR }), // Formata para DD/MM/YYYY
      });
      setModalAulaAberto(true);
    }, 300); // Pequeno delay para evitar sobreposição dos modais
  }

  function fecharModalAula() {
    setModalAulaAberto(false);
  }

  function fecharModalDia() {
    setModalDiaAberto(false);
  }

  const handleExcluirAula = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta aula?")) return;
    
    try {
        await api.delete(`/aulas/${id}`);
        setAulas(aulas.filter(aula => aula.id !== id)); // Remove a aula da lista
        setModalAulaAberto(false); // Fecha o modal
        alert("Aula excluída com sucesso!");
    } catch (error) {
        alert("Erro ao excluir aula!");
        console.error(error);
    }
};

const handleEditarAula = (id) => {
    navigate(`/editar-aula/${id}`); // Redireciona para a página de edição
    setModalAulaAberto(false); // Fecha o modal
};

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", gap: "20px" }}>
      {/* Calendário */}
      <div style={{ flex: 1, width: "100%", height: "100%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={aulas}
          dateClick={handleDayClick} // Agora o clique abre a lista de aulas do dia
          height="auto"
          eventDisplay="none" // Oculta completamente os eventos no calendário
          dayCellContent={(arg) => {
            const count = aulas.filter(
              (aula) => format(new Date(aula.start), "yyyy-MM-dd") === format(arg.date, "yyyy-MM-dd")
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

                {/* Número do dia */}
                <strong
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                    zIndex: 1,
                    marginBottom: "5px", // Espaço entre o número do dia e o contador
                  }}
                >
                  {arg.date.getDate()} {/* Exibe o número do dia */}
                </strong>

                {/* Contador de aulas */}
                {count > 0 && (
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#3582db",
                      zIndex: 1,
                    }}
                  >
                    {count} {count === 1 ? "aula" : "aulas"} {/* Exibe "aula" ou "aulas" */}
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>

      {/* Modal de aula específica */}
      <Modal
        isOpen={modalAulaAberto}
        onRequestClose={fecharModalAula}
        shouldCloseOnOverlayClick={false}
        contentLabel="Detalhes da Aula"
        style={{
          content: {
            width: "30%",
            height: "auto",
            maxHeight: "40%",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#222",
            color: "#fff",
            textAlign: "left",
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 999,
          },
        }}
      >
        {aulaSelecionada && (
          <div>
            <p>📚 Matéria: {aulaSelecionada.materia}</p><br />
            <p>👨‍🏫 Professor: {aulaSelecionada.professor}</p><br />
            <p>👨‍🎓 Aluno: {aulaSelecionada.aluno}</p><br />
            <p>📅 Data: {aulaSelecionada.data}</p><br />
            <p>⏰ Horário: {aulaSelecionada.horario}</p><br />
            <button
                    onClick={() => handleExcluirAula(aulaSelecionada.id)}
                    style={{ backgroundColor: "#db3535", color: "white", margin: "1%" }}
                >
                    Excluir
                </button>
                <button
                    onClick={() => handleEditarAula(aulaSelecionada.id)}
                    style={{ backgroundColor: "#35db5e", color: "white", margin: "1%" }}
                >
                    Editar
                </button>
            <button
              onClick={fecharModalAula}
              style={{
                backgroundColor: "#3582db",
                color: "#fff",
                margin: "1%",
              }}
            >
              Fechar
            </button>
          </div>
        )}
      </Modal>

      {/* Modal de aulas do dia */}
      <Modal
        isOpen={modalDiaAberto}
        onRequestClose={fecharModalDia}
        shouldCloseOnOverlayClick={false}
        contentLabel="Aulas do Dia"
        style={{
          content: {
            width: "40%",
            height: "auto",
            maxHeight: "60%",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#222",
            color: "#fff",
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 999,
          },
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "15px", margin: "1%" }}>
          Aulas do dia {dataSelecionada}
        </h2>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {aulasDoDia.map((aula, index) => (
            <li
              key={aula.id}
              onClick={() => handleAulaClick(aula)}
              style={{
                margin: "1%",
                cursor: "pointer",
                padding: "10px 15px",
                borderRadius: "8px",
                backgroundColor: index % 2 === 0 ? "#333" : "#444", // Alterna fundo
                borderBottom: "2px solid #555", // Linha separadora
                transition: "background-color 0.3s, color 0.3s", // Animação suave
                display: "flex",
                alignItems: "center",
                color: "#ddd",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#666"; // Fundo cinza claro
                e.currentTarget.style.color = "#fff"; // Texto fica branco
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#333" : "#444";
                e.currentTarget.style.color = "#ddd"; // Texto original
              }}
            >
              {/* Horário */}
              <div style={{ marginRight: "10px", fontWeight: "bold" }}>
                {aula.extendedProps.horario}
              </div>
              {/* Pontinho separador */}
              <div style={{ marginRight: "10px" }}>•</div>
              {/* Professor */}
              <div style={{ marginRight: "10px" }}>
                {aula.extendedProps.professor}
              </div>
              {/* Pontinho separador */}
              <div style={{ marginRight: "10px" }}>•</div>
              {/* Matéria (sem emoji) */}
              <div>{aula.extendedProps.materia}</div>
            </li>
          ))}
          <div className="botao_modal1" style={{
            display: "flex",
            alignContent: "center",
          }}>
          <button style={{
            backgroundColor: "#3582db",
            color: "#fff",
            cursor: "pointer",
            margin: "1%",
        }}>
        <Link to="/agendar-aula" style={{ textDecoration: 'none', color: 'inherit' }}>
         Agendar Aula
        </Link>
        </button>

        <button
          onClick={fecharModalDia}
          style={{
            backgroundColor: "#db3535",
            color: "#fff",
            cursor: "pointer",
            margin: "1%",
          }}
        >
          Fechar
        </button>
        </div>
        </ul><br />
      </Modal>
    </div>
  );
}

export default Calendario;