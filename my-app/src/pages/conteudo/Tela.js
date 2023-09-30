import React from 'react';
import { useSelecaoContext } from './ConteudoContext';
import ConteudoBody from './ConteudoBody';
import Pendencias from "../exercicios/Pendencias"
import { Box } from '@chakra-ui/react';

 const Conteudo = ({idExercicioSelecionado}) => {
  const { selecao } = useSelecaoContext();

  return (
    <Box flex={3} >
      {selecao === 'conteudo' ? (
        <ConteudoBody />
      ) : selecao === 'exercicio' ? (
        <Pendencias idExercicio={idExercicioSelecionado} />
      ) : null}
   </Box>
  );
};

export default Conteudo