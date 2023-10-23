import { CSSReset, ChakraProvider, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cookies from "universal-cookie"; // Importe o pacote universal-cookie
import Cadastro from './pages/Cadastro';
import NextTreinamento from './pages/CriacaoTreinamento/nextTreinamento';
import Treinamento from './pages/CriacaoTreinamento/treinamento';
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Conteudo from './pages/conteudo/Conteudo';
import Questionario from "./pages/exercicios/questionario/Questionario";
import Feedback from "./pages/feedback/Feedback";
import Pendencia from "./pages/pendencia/Pendencia";
import Perfil from './pages/perfil/Perfil';
import MissaoEVisao from "./pages/landingPage/missaoVisao/MissaoEVisao";

const cookies = new Cookies();

function PrivateRoute({ element, authenticated }) {
  return authenticated ? element : <Navigate to="/" />;
}

function App() {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const token = cookies.get("token");

    if (token) {
      const sessionDuration = 60 * 60;
      const tokenExpiration = Date.now() / 1000 + sessionDuration;
      cookies.set("token", token, { expires: new Date(tokenExpiration * 1000) });
      setAuthenticated(true);
    }
  }, []);

  return (
    <ChakraProvider>
      <CSSReset />
      <Flex minH="100vh" bg="#1A1922" color="white">
        <Router>
          <Routes>
          <Route
              path="/Treinamento"
              element={<PrivateRoute element={<Treinamento />} authenticated={authenticated} />}
            />
            <Route
              path="/NextTreinamento"
              element={<PrivateRoute element={<NextTreinamento />} authenticated={authenticated} />}
            />
            <Route
              path={LandingPage ? "/" : "/login"}
              element={LandingPage ? <LandingPage /> : <Login />}
            />
             <Route
              path="/missao_e_visao"
              element={<MissaoEVisao/>}
            />
            <Route
              path="/login"
              element={<Login setAuthenticated={setAuthenticated} />}
            />
            <Route
              path="/perfil"
              element={<PrivateRoute element={<Perfil />} authenticated={authenticated} />}
            />
            <Route
              path="/conteudo/:id"
              element={<PrivateRoute element={<Conteudo />} authenticated={authenticated} />}
            />
            <Route
              path="/feedback/:id"
              element={<PrivateRoute element={<Feedback />} authenticated={authenticated} />}
            />
            <Route
              path="/exercicios/:id"
              element={<PrivateRoute element={<Questionario />} authenticated={authenticated} />}
            />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} authenticated={authenticated} />}
            />
            <Route
              path="/pendencia"
              element={<PrivateRoute element={<Pendencia />} authenticated={authenticated} />}
            />
          </Routes>
        </Router>
      </Flex>
    </ChakraProvider>
  );
}

export default App;




