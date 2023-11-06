import {
  Box,
  Flex,
  Skeleton,
  Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import ContextProvider, { useGeralContext } from '../../services/context/ContextProvider';
import feedbackStyles, { botaoVoltarFeedback } from '../../styles/feedbackStyles';
import ExercicioDescritivo from './ExercicioDescritivo';
import ExercicioUmaRespostas from './ExercicioUmaResposta';
const Feedback = ({ idFeedback }) => {
  const { CorrecaoPorCorrectionId } = useGeralContext(ContextProvider);
  const [feedback, setFeedback] = useState();
  const history = useNavigate();

  const Redirecionar = () => {
    history(-1)
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackRetornado = await CorrecaoPorCorrectionId(idFeedback);
        setFeedback(feedbackRetornado);
        console.log("Feedback:", feedbackRetornado)

      } catch (error) {
        console.error("Erro ao buscar feedback:", error);
      }
    };

    fetchData();
  }, []);


  if (!feedback) {
    return (
      <Skeleton h='30vh' />
    )
  }

  return (
    <Flex sx={{ ...feedbackStyles.flexFather }}>
      <Box style={botaoVoltarFeedback} >
        <RiArrowGoBackLine onClick={() => Redirecionar()} />
      </Box>

      <Text fontSize='3rem' sx={{ ...feedbackStyles.header }}>Feedback</Text>

      <Flex w="80%" flexDir='column' bg= 'var(--background-menu)' >
        <Flex h="3rem" bg= 'var(--background-form)' color='white' flexDir="row" w="100%" alignItems="center" justifyContent='flex-start'>
          <Text ml="1rem">Correção:</Text>
        </Flex>
        <Flex flexDir="column" padding="0.5rem" fontSize={"1rem"} fontWeight={"bold"}>
          {feedback.corrections.map((correcao) => {
            if (correcao.complementation.length > 0) {
              return <ExercicioUmaRespostas exercicio={correcao} />
            } else {
              return <ExercicioDescritivo exercicio={correcao} />
            }
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

const App = () => {
  const { id } = useParams()

  return (
    <ContextProvider>
      <Flex direction={'row'} style={{ width: '100%' }} >
        <Feedback idFeedback={id} />
      </Flex>
    </ContextProvider>
  );
};

export default App;
