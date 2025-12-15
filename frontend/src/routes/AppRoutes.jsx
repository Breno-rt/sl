import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ListaUsuarios from "../pages/usuarios/ListaUsuarios";
import CadastrarUsuario from "../pages/usuarios/CadastrarUsuario";
import EditarUsuario from "../pages/usuarios/EditarUsuario";
import ListaProfessores from "../pages/professores/ListaProfessores";
import CadastrarProfessor from "../pages/professores/CadastrarProfessor";
import EditarProfessor from "../pages/professores/EditarProfessor";
import ListaAlunos from "../pages/alunos/ListaAlunos";
import CadastrarAluno from "../pages/alunos/CadastrarAluno";
import EditarAluno from "../pages/alunos/EditarAluno"; 
import Dashboard from "../pages/aulas/Dashboard";
import AgendarAula from "../pages/aulas/AgendarAula";
import EditarAula from "../pages/aulas/EditarAula";
import ListaTurmas from "../pages/turmas/ListaTurmas";
import CadastrarTurma from "../pages/turmas/CadastrarTurma";
import EditarTurma from "../pages/turmas/EditarTurma";
import EsqueciSenha from "../pages/usuarios/EsqueciSenha";
import RedefinirSenha from "../pages/usuarios/RedefinirSenha";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/usuarios/trocar-senha/:token" element={<RedefinirSenha />} />
        
        {/* Rotas privadas */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />

        <Route path="/usuarios" element={<PrivateRoute><ListaUsuarios /></PrivateRoute>} />
        <Route path="/cadastrar-usuario" element={<PrivateRoute><CadastrarUsuario /></PrivateRoute>} />
        <Route path="/editar-usuario/:id" element={<PrivateRoute><EditarUsuario /></PrivateRoute>} />

        <Route path="/professores" element={<PrivateRoute><ListaProfessores /></PrivateRoute>} />
        <Route path="/cadastrar-professor" element={<PrivateRoute><CadastrarProfessor /></PrivateRoute>} />
        <Route path="/editar-professor/:id" element={<PrivateRoute><EditarProfessor /></PrivateRoute>} />
        
        <Route path="/alunos" element={<PrivateRoute><ListaAlunos /></PrivateRoute>} />
        <Route path="/cadastrar-aluno" element={<PrivateRoute><CadastrarAluno /></PrivateRoute>} />
        <Route path="/editar-aluno/:id" element={<PrivateRoute><EditarAluno /></PrivateRoute>} /> 

        <Route path="/turmas" element={<PrivateRoute><ListaTurmas /></PrivateRoute>} />
        <Route path="/cadastrar-turma" element={<PrivateRoute><CadastrarTurma /></PrivateRoute>} />
        <Route path="/editar-turma/:id" element={<PrivateRoute><EditarTurma /></PrivateRoute>} />

        <Route path="/aulas" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/agendar-aula" element={<PrivateRoute><AgendarAula /></PrivateRoute>} />
        <Route path="/editar-aula/:id" element={<PrivateRoute><EditarAula /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
