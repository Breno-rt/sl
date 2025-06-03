

--------------------------------------------------------------Backend básico ----------------------------------------------------------------

-> Rota de teste usada no server.js no inicio: 
// Rota de teste
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

-> Rotas de teste da api (utiliazda na routes.js)
// Rota para testar se a API está funcionando
router.get('/', (req, res) => {
  res.send('API funcionando!');
});


Dia 08/02  -> Criação CRUD Professores no routes.js

Dia 14/02  ->  Interações utilzando metodos post, get, put and delete funcioando ok  -> Conectividade com banco de dados funcionando

Dia 14/02  -> Métodos do CRUD alunos funcionando 

Dia 18/02  -> Métodos do CRUD Aulas funcionando, não esquecer que no post o id do aluno e professore devem ser um existente no banco no cluster.alunos e cluster.professores, caso o contrário não vai funcionar

- import cors from 'cors'; // <-- Importe o CORS   e    app.use(cors());  // <-- Ativa o CORS para permitir requisições de qualquer origem (dentro do file server.js)


----------------------------------------------------------------Frontend básico --------------------------------------------------------------

Dia 22/02  -> Inicio frontend

📂 frontend
 ├── 📂 src
 │   ├── 📂 components
 │   ├── 📂 assets       # Imagens, ícones
 │   ├── 📂 pages        # Telas do sistema (ex.: Home, Agendamentos)
 │   ├── 📂 services     # Conexão com a API (Axios)
 │   ├── main.jsx        # Ponto de entrada do React
 │   ├── App.jsx         # Componente principal
 │   ├── index.css       # Estilos globais


- O React Router permite criar múltiplas páginas dentro do app -> npm install react-router-dom


25/02 -> Finalizando frontend básico

------------------------------------------------------------ Validação ----------------------------------------------------------------------

26/02 -> Validação com usuários e login funcionando no thunder (so backedn no momento), duração do token gerado: 1h

JWT_SECRET: Dentro do .env


01/03 -> Depois de 3 dias tentando, login com frontend - api - backend totalmente funcional


-----------------------------------------------------------Resumo até agr --------------------------------------------------------------------

O que já fizemos ✅

🔹 Backend
✅ Criei o backend com Node.js + Express + Prisma + MongoDB Atlas.
✅ Configurei a API com CRUD completo para Professores, Alunos e Aulas.
✅ Implementei autenticação com JWT, protegendo rotas no backend.

🔹 Frontend
✅ Criei o frontend com React + Vite.
✅ Conectei o frontend ao backend via Axios.
✅ Implementei a tela de login real, salvando o token JWT no localStorage.
✅ Protegemos as rotas do frontend com PrivateRoute.
✅ Criei páginas para listar Professores, Alunos e Aulas.
✅ Criei formulários para cadastrar Professores e Alunos.
✅ Criei formulário para agendar Aulas.

🔹 mais coisas:

✅ Funcionalidades Faltantes 
🔹 Botão de exclusão: Permitir que o administrador exclua professores, alunos e aulas.  ✅
🔹 Melhoria na Home: Criar uma página inicial que exiba opções para acessar as listas de Professores, Alunos e Aulas. ✅
🔹 Implementação de um calendário (ideia em discussão): Para facilitar a visualização dos horários das aulas agendadas. ✅
🔹 Proteger o frontend: Esconder botões/opções caso o usuário não esteja logado. ✅
🔹 Redirecionamento automático caso o token expire (para evitar acessar algo sem login válido). ✅
🔹 Organizar as páginas do frontend em pastas separadas para manter o código mais limpo. ✅


🔹 Melhorias Futuras (Para depois das funcionalidades)

-> Calendario
🔹 Implementar a validação de conflitos de aulas com mesmos professores/horários/alunos   ✅
🔹 Puxar um modal para a edição de aulas/professores/alunos além de um formulário no final?  ✅
🔹 Filtro no calendário 
🔹 Botão para edição ou exclusão de aulas no modal do calendario ✅
🔹 Algum botão no calendaio ou perto com link redirecionando para a pagina de agendamento de aulas? ✅
🔹 Colocar uma sessão para estatísticas do calendario: nº de aulas por prof/aluno, horários mais ocupados? Bem talvez 
🔹 Ver sobre integração com google calendar e tal Bem talvez
🔹 Barra de pesquisa para achar aulas/profs/alunos

-> Design
🔹 Melhorar o design das telas de login e da Home e das listas. ✅
🔹 Fundo imagem para paginas ✅
🔹 Melhorar modal  ✅

-> Outros 
🔹 Animações e transições 
🔹 Dashboard com info: Proximas aulas, aulas canceladas, estatisticas rápidas Bem talevz 
🔹 ver sobre notificações por whatsapp
🔹 ver sobre hospedagem 
🔹 ver sobre a exclusão apos um período de aulas para nao sobrecarregar o banco de dados ✅




---------------------------------------------------------------- CONTINUAÇÃO ---------------------------------------------------------------

- 04/03 -> Botão de exclusão para profs/alunos/aulas - ✅

Senha de app: nwmc ocwa pqqm qhbu

- 05/03 -> Envio de emails completo (Alunos e professores) - ✅

- 07/03 -> Organização em pastas próprias para as pages - ✅

- 09/03 -> Arrumando problema da exibição de datas no ListaAulas.jsx ✅

- 09/03 -> Adicionado botão de editar em todas as listas ✅

- 11/03 -> Calendário arrumado ✅

- 12/03 -> Arrumado email de aula agenda/editada/excluída ✅

- 13/03 -> Adicionado a função MATERIA que estava devendo ✅

- 14/03 -> Adicionado vrificação de conflito de horario ao agendar/editar aulas ✅

- 19/03 -> Finalmente arrumado a questao de fuso nos horarios✅

- 23/03 -> Estilo em tudo ou quase (Faltando modal de edição)✅

- 02/04 -> Files separados para edição para diminuir sobrecarga as listas c/ estilo css padrão V✅

- 02/04 -> Container de exclusão feito V✅

- 08/05 -> Voltei carai!! Depois de um mes de prova 

- 09/05 -> Plano de fundo adicionado V✅

- 12/05 -> Botao de Agendar Aula Modal 1 ✅

- 12/05 -> Botao de Editar/excluir modal 2 ✅

- 14/05 -> Barra Scroll nas listas ✅

- 16/05 -> Edição de Usuário e cadastro de novos usuarios com senha padrão✅

- 19/05 -> Altera senha na pafina de edição de usuários ✅

- 26/05 -> Recuperação de senha dps de 1 semana tentando ✅

- 29/05 -> ver sobre o polling para atualização do calendário ou aviso de novas aulas agendadas ✅


🔹 Próximo

- ver sobre o polling para atualização do calendário ou aviso de novas aulas agendadas 

- pensar em usar uma api para mensagens whatsapp 

- Ver hospedagem 
