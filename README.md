

--------------------------------------------------------------Backend básico ----------------------------------------------------------------

- Estrutura básica (Ideia)

📂 backend
 ├── 📂 src
 │   ├── 📂 controllers        #Controladores gerais
 │   ├── 📂 middleware         # Autenticação e seg
 │   ├──  routes.js            # Todas as rotas CRUD
 │   ├── 📂 services           # containers importantes
 ├── .env                      # Ponto de entrada do React
 ├── server.js                 # Componente principal
 ├── package-lock.json         # Estilos globais
 ├── package.jsoon             # Página inicial
 ├── .gitignore                #Estilo da inicial 


Dia 08/02  -> Criação CRUD Professores no routes.js

Dia 14/02  ->  Interações utilzando metodos post, get, put and delete funcioando ok  -> Conectividade com banco de dados funcionando

Dia 14/02  -> Métodos do CRUD alunos funcionando 

Dia 18/02  -> Métodos do CRUD Aulas funcionando

----------------------------------------------------------------Frontend básico --------------------------------------------------------------

Dia 22/02  -> Inicio frontend

- Estrutura básica (Ideia)

📂 frontend
 ├── 📂 src
 │   ├── 📂 components   # Modal, calendário, animações e outros "imports"
 │   ├── 📂 assets       # Imagens, ícones
 │   ├── 📂 pages        # Telas do sistema (ex.: Home, Agendamentos)
 │   ├── 📂 services     # Conexão com a API (Axios)
 │   ├── main.jsx        # Ponto de entrada do React
 │   ├── App.jsx         # Componente principal
 │   ├── index.css       # Estilos globais
 │   ├── Home.jsx        # Página inicial
 │   ├── Home.css        #Estilo da inicial 


- O React Router permite criar múltiplas páginas dentro do app -> npm install react-router-dom


25/02 -> Finalizando frontend básico

------------------------------------------------------------ Validação ----------------------------------------------------------------------

26/02 -> Validação com usuários e login funcionando no thunder (so backedn no momento), duração do token gerado: 1h

01/03 ->  api - backend totalmente funcional

-----------------------------------------------------------Resumo até agr --------------------------------------------------------------------

O que já foi feito ✅

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
✅ Botão de exclusão: Permitir que o administrador exclua professores, alunos e aulas.  
✅ Melhoria na Home: Criar uma página inicial que exiba opções para acessar as listas de Professores, Alunos e Aulas. 
✅ Implementação de um calendário (ideia em discussão): Para facilitar a visualização dos horários das aulas agendadas. 
✅ Proteger o frontend: Esconder botões/opções caso o usuário não esteja logado. 
✅ Redirecionamento automático caso o token expire (para evitar acessar algo sem login válido). 
✅ Organizar as páginas do frontend em pastas separadas para manter o código mais limpo. 



🎯 Melhorias Futuras (Para depois das funcionalidades) 

-> Calendario
✅ Implementar a validação de conflitos de aulas com mesmos professores/horários/alunos   
✅ Puxar um modal para a edição de aulas/professores/alunos além de um formulário no final?  
✅ Filtro no calendário (Futuro)
✅ Botão para edição ou exclusão de aulas no modal do calendario 
✅ Algum botão no calendaio ou perto com link redirecionando para a pagina de agendamento de aulas? 

-> Design
✅ Melhorar o design das telas de login e da Home e das listas. 
✅ Fundo imagem para paginas 
✅ Melhorar modal  

-> Outros 
✅ Animações e transições 
🔹 ver sobre notificações por whatsapp
🔹 ver sobre hospedagem 
✅ ver sobre a exclusão apos um período de aulas para nao sobrecarregar o banco de dados 




---------------------------------------------------------------- CONTINUAÇÃO ---------------------------------------------------------------

- 04/03 -> Botão de exclusão para profs/alunos/aulas - ✅

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

- 09/05 -> Plano de fundo adicionado V✅

- 12/05 -> Botao de Agendar Aula Modal 1 ✅

- 12/05 -> Botao de Editar/excluir modal 2 ✅

- 14/05 -> Barra Scroll nas listas ✅

- 16/05 -> Edição de Usuário e cadastro de novos usuarios com senha padrão✅

- 19/05 -> Altera senha na pafina de edição de usuários ✅

- 26/05 -> Recuperação de senha dps de 1 semana tentando ✅

- 29/05 -> ver sobre o polling para atualização do calendário ou aviso de novas aulas agendadas ✅

- 03/07 -> Edição complementar de responsividade das paginas ✅

- 21/08 -> Edição modais de criação/cadastro/agendamento e edição ✅

- 22/08 -> Modal de delete nas listas ✅

- 23/08 -> Modais do calendários novos e editados ✅

- 23/08 -> mudar o alert de exclusão do modal de detalhes para o DeleteConfirmModal ✅

- 07/10 -> Teste api twillio SANDBOX funcionando ✅

- 09/10 -> Atualização página de alunos (separação por matérias), atualização modal lista de aulas com navegação (calendário) ✅

- 13/10 -> Adição da matéria "Espanhol" ✅

- 27/10 -> Padronização cores das listas nova ✅

- 29/10 -> Remoção variáveis de ambiente da futura atualização com whatsapp API ✅


🔹 Próximo

- KPI's no lugar da lista de aulas 

- api para mensagens whatsapp 

- Hospedar 
