import {
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextProvider, { useGeralContext } from '../../../services/context/ContextProvider';


const useQuestionarioCustom = (idExercicio) => {
    const { SolicitarExercicioPorID, CorrecaoPorCorrectionId, CriarCorrecaoPorExerciseId, exercicioConteudoSelecionado } = useGeralContext(ContextProvider);
    const cancelRef = React.useRef()
    const toast = useToast();
    const [exercicioEntregado, setExercicioEntregado] = useState(false)
    const [confirmado, setConfirmado] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const history = useNavigate();

    const RedirecionarParaTelaFeedback = (id) => {
        history('/feedback/' + id);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await SolicitarExercicioPorID(idExercicio);
            } catch (error) {
                if (error.response.status === 401) {
                    navigate("/login");
                } else if (error.response.status === 500) {
                    alert("Ocorreu um erro do nosso lado. Já resolveremos");
                }
            }
        };
        fetchData();
    }, [idExercicio]);
  
    return {
      cancelRef,
      toast,
       CorrecaoPorCorrectionId,
      CriarCorrecaoPorExerciseId,
      exercicioEntregado,
      setExercicioEntregado,
      confirmado,
      setConfirmado,
      isOpen,
      onOpen,
      onClose,
      exercicioConteudoSelecionado,
      RedirecionarParaTelaFeedback,
    };
  };

  export default useQuestionarioCustom;
  


