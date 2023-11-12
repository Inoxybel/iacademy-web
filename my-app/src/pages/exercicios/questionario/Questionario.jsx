import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    Link,
    Skeleton,
    Text,
    VStack
} from '@chakra-ui/react';
import React from 'react';
import { MdCheckCircle } from "react-icons/md";
import ContextProvider from '../../../services/context/ContextProvider';
import ExercicioDescritivo from "../tiposExercicios/ExercicioDescritivo";
import ExercicioMultiplasRespostas from "../tiposExercicios/ExercicioMultiplasRespotas";
import ExercicioUmaResposta from "../tiposExercicios/ExercicioUmaResposta";
import useQuestionarioCustom from "./QuestionarioCustom";
import estilos from "./QuestionarioEstilos";

var respostas = {
    "exercises": [
    ]
}

function mandarParaListaDeRespostas(id, resposta) {
    const novaRespostaExercicio = { identification: id, answer: resposta }
    respostas.exercises.push(novaRespostaExercicio);
}

const Questionario = ({ idExercicio }) => {
    const { cancelRef, toast, CorrecaoPorCorrectionId, CriarCorrecaoPorExerciseId, exercicioEntregado, setExercicioEntregado, setConfirmado, isOpen, onOpen, onClose, exercicioConteudoSelecionado, RedirecionarParaTelaFeedback } = useQuestionarioCustom(idExercicio);
    if (!exercicioConteudoSelecionado) {
        return (
            <>
                <Skeleton>
                    <Box w='100%' h='5rem'></Box>
                </Skeleton>

                <Skeleton>
                    <Box w='60%' mt='2rem' mb='2rem' h='10rem'></Box>
                </Skeleton>
                <Skeleton>
                    <Box w='90%' mt='2rem' mb='2rem' h='10rem'></Box>
                </Skeleton>
                <Skeleton>
                    <Box w='90%' mt='2rem' mb='2rem' h='10rem'></Box>
                </Skeleton>
            </>

        )
    }

    return (
        <Flex sx={estilos.container}>
            <Flex style={estilos.cabecalho}>
                {exercicioConteudoSelecionado.status === "Finished" ? <CheckCircleIcon sx={estilos.iconeConfirmado} /> : <WarningIcon sx={estilos.iconeAviso} />}
                <Text as='h2' color='var(--background-color)' fontWeight='700'>{exercicioConteudoSelecionado.title} </Text>
                <Flex sx={estilos.conjuntoBotoes}>

                    <Button isDisabled={exercicioConteudoSelecionado.status === "Finished" ? false : true} colorScheme="blue" size='xs' onClick={
                        async () => {
                            const feedback = await CorrecaoPorCorrectionId(exercicioConteudoSelecionado.correctionId)
                            RedirecionarParaTelaFeedback(feedback.id)
                        }}>
                        {exercicioConteudoSelecionado.status === "Finished" ? "feedback" : "Feedback indisponível"}
                    </Button>

                    <Button
                        size='xs'
                        isDisabled={exercicioConteudoSelecionado.status === "Finished" ? true : false}
                        colorScheme={exercicioConteudoSelecionado.status === "Finished" ? "green" : "blue"} onClick={async () => {
                            onOpen()
                            setExercicioEntregado(true)
                        }}>
                        {exercicioConteudoSelecionado.status === "Finished" ? "Entregado" : "Entregar"}
                    </Button>

                    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} >
                        <AlertDialogOverlay>
                            <AlertDialogContent bg='var(--background-form)' color='white' >
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>Entregar exercícios</AlertDialogHeader>
                                <AlertDialogBody>Tem certeza que deseja entregar o exercício?</AlertDialogBody>
                                <AlertDialogFooter >
                                    <Button ref={cancelRef}  onClick={() => {
                                        setExercicioEntregado(false)
                                        onClose()
                                    }}>
                                        Cancelar
                                    </Button>
                                    <Button
                                        color='white'
                                        bg='#0880A2'
                                        onClick={async () => {
                                            try {
                                                setExercicioEntregado(false);
                                                setConfirmado(true)
                                                onClose();
                                                toast({
                                                    title: 'Solicitado correção do exercício. Aguarde',
                                                    status: 'info',
                                                    duration: 30000,
                                                    isClosable: true,
                                                });
                                                console.log(respostas)
                                                const feedback = await CriarCorrecaoPorExerciseId(idExercicio, JSON.stringify(respostas));
                                                toast({
                                                    title: "Seu conteúdo foi atualizado",
                                                    status: "success",
                                                    duration: 10000,
                                                    isClosable: true,
                                                    render: ({ onClose }) => (
                                                        <Box bg='green' width='100%' color='white' justifyContent='space-around' display='flex' gap='10px' alignItems='center' p='15px' borderRadius='3px'>
                                                            <MdCheckCircle />
                                                            <Text>Exercicio corrigido.</Text>
                                                            <Link fontWeight='bold' onClick={() => {
                                                                RedirecionarParaTelaFeedback(feedback.id);
                                                                onClose();
                                                            }}>Clique aqui para ver</Link>
                                                        </Box>
                                                    ),
                                                });

                                            } catch (error) {
                                                toast({
                                                    title: 'Erro ao entregar',
                                                    description: 'Ocorreu um erro ao tentar entregar.',
                                                    status: 'error',
                                                    duration: 3000,
                                                    isClosable: true,
                                                });
                                            }
                                        }}
                                        ml={3}
                                    >
                                        Entregar
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </Flex>
            </Flex>

            <VStack sx={estilos.conjuntoExercicios}>
                {exercicioConteudoSelecionado.exercises != null && exercicioConteudoSelecionado.exercises[0].identification !== 0 ? (
                    exercicioConteudoSelecionado.exercises.map((item, key) => {
                        switch (item.type) {
                            case "Code":
                                return (
                                    <ExercicioDescritivo
                                        status={exercicioConteudoSelecionado.status}
                                        key={key}
                                        exercicioEntregado={exercicioEntregado}
                                        question={item.question}
                                        identification={item.identification}
                                        mandarParaListaDeRespostas={mandarParaListaDeRespostas}
                                    />
                                );
                            case "SingleChoice":
                                return (
                                    <ExercicioUmaResposta
                                        status={exercicioConteudoSelecionado.status}
                                        exercicioEntregado={exercicioEntregado}
                                        key={key}
                                        question={item.question}
                                        complementation={item.complementation}
                                        identification={item.identification}
                                        mandarParaListaDeRespostas={mandarParaListaDeRespostas}
                                    />
                                );
                            case "MultipleChoice":
                                return (
                                    <ExercicioMultiplasRespostas
                                        status={exercicioConteudoSelecionado.status}
                                        exercicioEntregado={exercicioEntregado}
                                        key={key}
                                        question={item.question}
                                        complementation={item.complementation}
                                        identification={item.identification}
                                        mandarParaListaDeRespostas={mandarParaListaDeRespostas}
                                    />
                                );
                            default:
                                return <Text>Sem questão</Text>;
                        }
                    })
                ) : (<Text color='var(--background-color)'>Não há questões para esse topico. </Text>)}
            </VStack>
        </Flex>
    );
}


function App({ idExercicio }) {
    return (
        <ContextProvider>
            <Questionario idExercicio={idExercicio} />
        </ContextProvider>
    );
};

export default App;
