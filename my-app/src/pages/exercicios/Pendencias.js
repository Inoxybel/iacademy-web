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
    VStack,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextProvider, { useGeralContext } from '../context/ContextProvider';
import ExercicioDescritivo from "./ExercicioDescritivo";
import ExercicioMultiplasRespostas from "./ExercicioMultiplasRespotas";
import ExercicioUmaResposta from "./ExercicioUmaResposta";
import { MdCheckCircle } from "react-icons/md"

var respostas = {
    "exercises": [
    ]
}

function mandarParaListaDeRespostas(id, resposta) {
    const novaRespostaExercicio = {
        identification: id,
        answer: resposta
    }

    respostas.exercises.push(novaRespostaExercicio);
}


const estilos = {
    divzinha: {
        backgroundColor: '#262734',
        width: '100%',
        borderRadius: '3px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'row',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    texto: {
        color: 'white',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        maxWidth: '89%',
        fontFamily: '',
        fontSize: '12px',
    },
    conteudo: {
        backgroundColor: '#2F3142',
        width: '100%',
        padding: '20px',
        height: '100%',

    },
    textoConteudo: {
        fontSize: '10px',
    },
    cabecalhoSumario: {
        backgroundColor: '#262734',
        width: '60%',
        padding: '10px',
        borderRadius: '3px',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
    },
    cabecalhoSumario1: {
        backgroundColor: '#262734',
        width: '100%',
        padding: '10px',
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'row',
    },
    sumario: {
        backgroundColor: '#2F3142',
        width: '60%',
        padding: '20px',
        height: '34rem',
    },
};

const Questionario = ({ idExercicio }) => {

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
            console.log('Iniciando a solicitação assíncrona...');
            try {
                await SolicitarExercicioPorID(idExercicio);
                console.log('Solicitação assíncrona concluída com sucesso.');
            } catch (error) {
                console.error('Erro na solicitação assíncrona:', error);
            }
        };

        fetchData();
    }, [idExercicio]);

    console.log(' entrou no user effect')


    if (!exercicioConteudoSelecionado || exercicioConteudoSelecionado === undefined) {
        return (<Skeleton h="50vh" />)
    }

    return (
        <Flex
            alignItems={'center'}
            flexDirection={'column'}
            style={{ width: '100%' }}
        >
            <Flex style={estilos.divzinha}>
                {exercicioConteudoSelecionado.status === "Finished" ? <CheckCircleIcon h="30px" w="30px" color="green" /> : <WarningIcon color='yellow' />}

                <Box flex={1} padding="20px">
                    <Text mt={1} fontSize="sm">
                        {exercicioConteudoSelecionado.title}
                    </Text>
                </Box>

                <Flex gap="10px" flexDir='row' alignItems='center'>
                    <Button isDisabled={exercicioConteudoSelecionado.status === "Finished" ? false : true} colorScheme="blue" m={'0.5rem'} alignSelf={'flex-end'} size='xs' onClick={
                        async () => {
                            const feedback = await CorrecaoPorCorrectionId(exercicioConteudoSelecionado.correctionId);
                            RedirecionarParaTelaFeedback(feedback.id)
                        }
                    }>
                        {exercicioConteudoSelecionado.status === "Finished" ? "Ver feedback" : "Feedback não disponível"}
                    </Button>

                    <Button
                        size='xs'
                        isDisabled={exercicioConteudoSelecionado.status === "Finished" || exercicioConteudoSelecionado.status === "WaitingCorrection" ||confirmado ? true : false}
                        colorScheme={exercicioConteudoSelecionado.status === "Finished" || confirmado ? "green" : "blue"} onClick={async () => {
                            onOpen()
                            setExercicioEntregado(true)
                            console.log(exercicioEntregado)

                        }}>
                        {exercicioConteudoSelecionado.status === "Finished" || confirmado
                            ? "Entregado"
                            : exercicioConteudoSelecionado.status === "WaitingCorrection"
                                ? "Corrigindo"
                                : "Entregar"}
                    </Button>

                    <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent bg='#2F3142' color='white'>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                    Entregar exercícios
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Tem certeza que deseja entregar o exercício?
                                </AlertDialogBody>

                                <AlertDialogFooter >
                                    <Button color='white' ref={cancelRef} bg='#0880A2' onClick={() => {
                                        setExercicioEntregado(false)
                                        console.log(exercicioEntregado)
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
                                                console.log("Mandou esse obj de respostas:", respostas);
                                                setConfirmado(true)
                                                onClose();
                                                toast({
                                                    title: 'Solicitado correção do exercício. Aguarde',
                                                    status: 'info',
                                                    duration: 30000, // Tempo que o toast ficará visível (em milissegundos)
                                                    isClosable: true, // Permite fechar o toast manualmente
                                                });
                                                const feedback = await CriarCorrecaoPorExerciseId(idExercicio, JSON.stringify(respostas));
                                                console.log("Feedback vindo no componente pendenecias para redirecionar:", feedback)
                                                //Caso seja atualizado ele retorna esse toast que redireciona o usuário para o conteudo atualizado caso aperte o link
                                                toast({
                                                    title: "Seu conteúdo foi atualizado",
                                                    status: "success",
                                                    duration: 10000,
                                                    isClosable: true,
                                                    render: ({ onClose }) => ( // Adicione a função onClose aqui
                                                        <Box bg='green' width='100%' color='white' justifyContent='space-around' display='flex' gap='10px' alignItems='center' p='15px' borderRadius='3px'>
                                                            <MdCheckCircle />
                                                            <Text>Exercicio corrigido.</Text>
                                                            <Link fontWeight='bold' onClick={() => {
                                                                RedirecionarParaTelaFeedback(feedback.id);
                                                                onClose(); // Feche o Toast ao clicar no link
                                                            }}>Clique aqui para ver</Link>
                                                        </Box>
                                                    ),
                                                });

                                            } catch (error) {
                                                console.error(error);

                                                // Exibir um toast de erro
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
            <VStack alignItems="center" w="100%" bg='#474859' padding='1%' h='100%'>
                {exercicioConteudoSelecionado.exercises != null && exercicioConteudoSelecionado.exercises[0].identification !== 0 ? (
                    exercicioConteudoSelecionado.exercises.map((item, key) => {
                        switch (item.type) {
                            case "Code":
                                return (
                                    <ExercicioDescritivo
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
                ) : (<Box>Não há questões para esse topico. </Box>)}
            </VStack>
        </Flex>
    );
}

function App({ idExercicio }) {
    console.log('recebeu o exericoi e irá renderizar')
    return (
        <ContextProvider>
            <Flex direction={'row'} flex={3} padding='2px' style={{ width: '100%', height: "100%", overflow: "auto" }}>
                <Questionario idExercicio={idExercicio} />
            </Flex>
        </ContextProvider>

    );

};
export default App;
