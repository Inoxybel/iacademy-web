import {
  Box,
  Flex
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import Pendencias from './exercicios/Pendencias';
import Sidebar from "./conteudo/SideBar"
import ConteudoBody from "./conteudo/ConteudoBody"

const App = (props) => {
  const { id } = useParams();
  const [conteudoSelecionado, setConteudoSelecionado] = useState();
  const [idExercicioSelecionado, setIdExercicioSelecionado] = useState();

  return (
    <ContextProvider>
      <Flex flexDir="row" flex={1} width="100%" alignItems="stretch">
        <Box minW="25%">
          <Sidebar idSumario={id} onSelectConteudo={setConteudoSelecionado} onSetIdExercicioSelecionado={setIdExercicioSelecionado} />
        </Box>
        <Box flex={3} maxW='100%'>
          {conteudoSelecionado === "exercicio" ? (
            <ConteudoBody />
          ) : idExercicioSelecionado && conteudoSelecionado==="atividade" ? (
            <Pendencias idExercicio={idExercicioSelecionado} />
          ) : (
            <p>Selecione um conteúdo ou exercício na barra lateral.</p>
          )}
        </Box>
      </Flex>
    </ContextProvider>
  );
};

export default App;

