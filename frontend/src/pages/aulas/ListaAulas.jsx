import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import api from "../../services/api";
import "./ListaAulas.css";
import FadeContainer from "../../components/animations/FadeContainer";

function ListaAulas() {
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    async function fetchAulas() {
      try {
        const response = await api.get("/aulas");
        setAulas(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar aulas", error);
      }
    }
    fetchAulas();

    const interval = setInterval(fetchAulas, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ CALCULAR MÉTRICAS (MANTIDO IGUAL)
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  // Aulas deste mês
  const aulasEsteMes = aulas.filter(aula => {
    const dataAula = new Date(aula.data);
    return dataAula.getMonth() === mesAtual && 
           dataAula.getFullYear() === anoAtual;
  });

  // Aulas do mês anterior
  const aulasMesAnterior = aulas.filter(aula => {
    const dataAula = new Date(aula.data);
    const mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1;
    const anoMesAnterior = mesAtual === 0 ? anoAtual - 1 : anoAtual;
    
    return dataAula.getMonth() === mesAnterior && 
           dataAula.getFullYear() === anoMesAnterior;
  });

  // Comparativo com mês anterior
  const comparativo = aulasMesAnterior.length > 0 
    ? ((aulasEsteMes.length - aulasMesAnterior.length) / aulasMesAnterior.length * 100).toFixed(0)
    : 0;

  // Aulas por matéria
  const aulasPorMateria = {
    'Inglês': aulasEsteMes.filter(a => a.materia === 'Inglês').length,
    'Francês': aulasEsteMes.filter(a => a.materia === 'Francês').length,
    'Espanhol': aulasEsteMes.filter(a => a.materia === 'Espanhol').length
  };

  // Aulas por professor
  const aulasPorProfessor = {};
  aulasEsteMes.forEach(aula => {
    const prof = aula.professor.nome;
    aulasPorProfessor[prof] = (aulasPorProfessor[prof] || 0) + 1;
  });

  // Dias com mais aulas
  const aulasPorDia = {};
  aulasEsteMes.forEach(aula => {
    const dia = new Date(aula.data).toLocaleDateString('pt-BR', { weekday: 'long' });
    aulasPorDia[dia] = (aulasPorDia[dia] || 0) + 1;
  });
  
  const diasMaisAulas = Object.entries(aulasPorDia)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  // Horários mais populares
  const horarios = { manha: 0, tarde: 0, noite: 0 };
  aulasEsteMes.forEach(aula => {
    const hora = parseInt(aula.horario.split(':')[0]);
    if (hora >= 6 && hora < 12) horarios.manha++;
    else if (hora >= 12 && hora < 18) horarios.tarde++;
    else horarios.noite++;
  });


  return (
    <FadeContainer>
      <div className="lista-aulas">
        {/* ✅ TÍTULO ATUALIZADO */}
        <h1>Dashboard de Aulas No Mês</h1>

        {/* ✅ BOTÕES DE NAVEGAÇÃO (MANTIDOS) */}
        <div className="botoes-navegacao">
          <Link to="/agendar-aula">
            <button>Agendar Nova Aula</button>
          </Link>
          <Link to="/">
            <button className="botao-voltar">Voltar</button>
          </Link>
        </div>
        <br />

        {/* ✅ DASHBOARD COM MÉTRICAS */}
        {aulas.length > 0 ? (
          <div className="dashboard-grid">
            {/* CARD 1: AULAS ESTE MÊS */}
            <div className="card-metrica">
              <div className="card-header">
                <h3>📅 Este Mês</h3>
              </div>
              <div className="card-content">
                <div className="numero-grande">{aulasEsteMes.length}</div>
                <div className="legenda">aulas agendadas</div>
              </div>
            </div>

            {/* CARD 2: COMPARATIVO */}
            <div className="card-metrica">
              <div className="card-header">
                <h3>📈 Comparativo</h3>
              </div>
              <div className="card-content">
                <div className={`numero-grande ${comparativo >= 0 ? 'positivo' : 'negativo'}`}>
                  {comparativo >= 0 ? '↗' : '↘'} {Math.abs(comparativo)}%
                </div>
                <div className="legenda">vs mês anterior</div>
              </div>
            </div>

            {/* CARD 3: MATÉRIAS */}
            <div className="card-metrica">
              <div className="card-header">
                <h3>📚 Matérias</h3>
              </div>
              <div className="card-content">
                {Object.entries(aulasPorMateria).map(([materia, quantidade]) => (
                  <div key={materia} className="linha-metrica">
                    <span>{materia}:</span>
                    <strong>{quantidade}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 4: PROFESSORES */}
            <div className="card-metrica">
              <div className="card-header">
                <h3>👨‍🏫 Professores</h3>
              </div>
              <div className="card-content">
                {Object.entries(aulasPorProfessor)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([professor, quantidade]) => (
                    <div key={professor} className="linha-metrica">
                      <span>{professor}:</span>
                      <strong>{quantidade}</strong>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* CARD 5: DIAS POPULARES */}
            <div className="card-metrica">
              <div className="card-header">
                <h3>🗓️ Dias Com Mais Aulas</h3>
              </div>
              <div className="card-content">
                {diasMaisAulas.map(([dia, quantidade]) => (
                  <div key={dia} className="linha-metrica">
                    <span>{dia}:</span>
                    <strong>{quantidade}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 6: HORÁRIOS */}
            <div className="card-metrica">
              <div className="card-header">
                <h3>⏰ Horários</h3>
              </div>
              <div className="card-content">
                <div className="linha-metrica">
                  <span>Manhã:</span>
                  <strong>{horarios.manha}</strong>
                </div>
                <div className="linha-metrica">
                  <span>Tarde:</span>
                  <strong>{horarios.tarde}</strong>
                </div>
                <div className="linha-metrica">
                  <span>Noite:</span>
                  <strong>{horarios.noite}</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>❌ Nenhuma aula agendada.</p>
        )}

      </div>
    </FadeContainer>
  );
}

export default ListaAulas;