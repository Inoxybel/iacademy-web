import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Progress,
  Skeleton,
  Stack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  useMediaQuery,
} from '@chakra-ui/react';
import styles from './styles';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import axios from 'axios';
import { AiFillSecurityScan } from 'react-icons/ai';
import { da } from 'date-fns/locale';
import ImgC from '../img/csharp_logo.png';
import { cursosDisponiveis, cursosMatriculados, matricularEmCurso } from './Fetchers/FetchersApp';

//ContextoApi para poder compartilhar funções entre todos os recursos da minha api
const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const navigate = useNavigate();
  const [isSmOrMd] = useMediaQuery('(max-width: 108em)');

  function RedirecionaParaConteudoPorIdSumarioMatriculado(idSumario) {
    navigate('/conteudo/' + idSumario);
  }

  const [idSumarioMatriculado, setIdSumarioMatriculado] = useState('');

  async function SolicitarListaCursosDisponiveis() {
    try {
      const response = await cursosDisponiveis();
      if(response.status===401){
        navigate("/")
      }
      if (response && response.data) {
        const dados = response.data;
        return dados;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Erro ao pegar cursos do banco');
      if(error.response.status===401){
        navigate("/")
       }
    }
  }

  async function SolicitarListaCursosMatriculados() {
    try {
      const response = await cursosMatriculados();
      if(response.status===401){
        navigate("/")
      }
      if (response.status === 200 && response.data) {
        const dados = response.data;
        return dados;
      } else if (response.status === 404) {
        return console.log('Devia retornar algo aqui');
      }
    } catch (error) {
      if(error.response.status===401){
        navigate("/")
       }
    }
  }


  async function matricularEmCursos(idSumario) {
    try {
      const response = await matricularEmCurso(idSumario);
      if (response.status === 201) {
        const novoIdSumarioMatriculado = response.data;
        console.log(novoIdSumarioMatriculado);
        return novoIdSumarioMatriculado;
      } else {
        throw new Error(`Erro ao criar o novo id de sumário`);
      }
    } catch (error) {
      console.error(error);
      if(error.response.status===401){
        navigate("/")
       }
    }
  }

  //Essa função verifica uma lista de todos os cursos que a plataforma oferece, e todos os cursos que o usuário atual está
  //matriculado, e retorna no dashboard os cursos dispniveis que o usuário não esta matriculado

  function verificarSincronizaçãoDeCursos(
    listaTodosCursosCadastradados,
    listaCursosMatriculados
  ) {
    const cursosDisponiveisNaoIniciados = listaTodosCursosCadastradados.filter(
      cursoDisponivel => {
        return !listaCursosMatriculados.some(
          cursoIniciado => cursoIniciado.theme === cursoDisponivel.theme
        );
      }
    );
    return cursosDisponiveisNaoIniciados;
  }

  return (
    <DashboardContext.Provider
      value={{
        matricularEmCursos,
        SolicitarListaCursosDisponiveis,
        SolicitarListaCursosMatriculados,
        verificarSincronizaçãoDeCursos,
        RedirecionaParaConteudoPorIdSumarioMatriculado,
        idSumarioMatriculado,
        isSmOrMd,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
//Função para você pode importar os intes de contexto
function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      'useDashboardContext deve ser usado dentro de um DashboardProvider'
    );
  }
  return context;
}

const CardComponentCursosDisponiveis = ({ obj }) => {
  //Importo as funções que vou precisar do contextApi
  const {
    idSumarioMatriculado,
    isSmOrMd,
    matricularEmCursos,
    RedirecionaParaConteudoPorIdSumarioMatriculado,
  } = useDashboardContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const svgIcon = obj.icon;
  return (
    <Card
      flexDir={'row'}
      bg="#1A1922"
      mb={5}

    >
      <Image
        borderRadius={5}
        objectFit="fill"
        w="130px"
        h="130px"
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgIcon)}`}
        mr={isSmOrMd ? 0 : 4}
        bg="white"
        style={{ borderRadius: '5' }}
      />
      <Stack
        bg="#262734"
        color="white"
        direction="row"
        overflow={"hidden"}
        borderRadius={5}
        w={isSmOrMd ? "18rem" : "25rem"}
        h="8rem"
        p={isSmOrMd ? 1 : 2}
      >
        <CardBody p={2}>
          <Heading fontSize="13px">{obj.theme}</Heading>
          <Text py="2" fontSize={isSmOrMd ? "10px" : "13px"} whiteSpace={'nowrap'}>
            {obj.category}-{obj.subcategory}
          </Text>
        </CardBody>

        <Button
          mr={"1rem"}
          alignSelf={"flex-end"}
          variant="solid"
          bg="#0880A2"
          colorScheme="blue"
          size={isSmOrMd ? "md" : "lg"}
          fontSize={ isSmOrMd ? 11 : 13}
          fontWeight="bold"
          onClick={async () => {
            //No botão de cursos disponiveis, eu verifico o id do usuário criado atraves do login/cadsatro
            //ao ele iniciar um curso, chamo a função de matricula e passo o id dele, espero ela retornar o true
            //em seguida se der tudo certo redireciono ele para a tela de conteudo
            try {
              console.log(obj.id);
              const idSumario = await matricularEmCursos(obj.id);
              RedirecionaParaConteudoPorIdSumarioMatriculado(idSumario);
            } catch (error) {
              console.error('Erro ao matricular e redirecionar:', error);
            }
          }}
        >
          Começar
        </Button>

        {/*Botão que ao clicar, renderiza um modal com os detalhes do curso */}
        <Button
          alignSelf={"flex-end"}
          variant="solid"
          bg="#0880A2"
          colorScheme="blue"
          size={isSmOrMd ? "md" : "lg"}
          fontSize={ isSmOrMd ? 11: 13}
          fontWeight="bold"
          onClick={() => {
            onOpen();
          }}
        >
          ver detalhes
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent color="white" bg="#262734">
            <ModalHeader>Detalhes do treinamento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {obj.topics.map((item, index) => {
                return (
                  <div key={index}>
                    <Text fontSize="15px" fontWeight="bold">
                      {item.index}-{item.title}
                    </Text>
                    <Text ml="5px" fontStyle="italic">
                      {item.description}
                    </Text>
                  </div>
                );
              })}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Stack>
    </Card>
  );
};

const CardComponentCursoIniciado = ({ curso }) => {
  //Solicito as funções e variáveis que preciso do context
  const { isSmOrMd, RedirecionaParaConteudoPorIdSumarioMatriculado } =
    useDashboardContext();

  const svgIcon = curso.icon;

  return (
    <Card
      flexDirection="row"
      overflow="hidden"
      bg="#262734"
      w={isSmOrMd ? "25rem" : "32rem"}
      h="8rem"
      color="white"
      p={isSmOrMd ? 1 : 2}
    >
      <Image
        objectFit="cover"
        src={ImgC}
        bg="white"
        borderRadius="5"
        alignSelf={'center'}
        h="110px"
        w="110px"
        mr="13px"
      />
      
      <Stack flexDir="column" justifyContent="space-between">
        <Flex justifyContent="space-between" >
          <Flex flexDir="column" >
            <Text fontSize="13px" fontWeight="bold" mb={3}>
              {curso.theme}
            </Text>
            <Box
              display="flex"
              flexDir="row"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="11px">{curso.subcategory}</Text> - <Text fontSize="11px">{curso.category}</Text>
            </Box>
          </Flex>

          <Button
            ml={isSmOrMd ? "1rem" : "5rem"}
            p={2}
            variant="solid"
            colorScheme="#0880A2;"
            size={isSmOrMd ? "sm" : "lg"}
            fontSize={ isSmOrMd ? 10 : 13}
            onClick={() => {
              RedirecionaParaConteudoPorIdSumarioMatriculado(curso.id);
            }}
          >
            Continuar de onde parou
          </Button>
        </Flex>
        <Flex alignItems="center" gap="10px" justifyContent="space-between">
          <Text fontSize="10px">{20}%</Text>

          <Progress
            colorScheme="whiteAlpha"
            size="md"
            h="2px"
            value={20}
            flex="1"
            mr={2}
            bg="grey"
          />
        </Flex>
      </Stack>
    </Card>
  );
};

// Componente de paginação que contém os cursos disponíveis
const PaginationComponent = ({ items }) => {
  const [isSmOrMd] = useMediaQuery('(max-width: 55em)');

  // Define a quantidade de itens por página
  const cardsPerPage = 3;
  // Pagina atual que o usuário está selecionando
  const [currentPage, setCurrentPage] = useState(1);
  // Divide e arredonda o número total de itens na lista pelo número de itens por página pré definido
  const lastPageIndex = Math.ceil(items.length / cardsPerPage);

  // Função de auxílio para mudar a página atual
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // Função para renderizar os "cards" da página atual
  const renderCards = () => {
    // Calcula o índice de início e fim dos "cards" a serem exibidos na página atual
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    // Retorna uma array de componentes "cards" com base nos índices calculados
    return items
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <CardComponentCursosDisponiveis obj={item} key={index} />
      ));
  };

  return (
    <div>
      {/* Renderiza os "cards" da página atual em uma caixa */}
      <Box h={isSmOrMd ? "40vh" : "60vh"}>{renderCards()}</Box>

      {/* Renderiza os botões de paginação */}
      <Flex direction="row" justifyContent="center">
        <Stack direction="row" spacing={2} mb={4}>
          {/* Cria um botão para cada página disponível */}
          {Array.from({ length: lastPageIndex }, (_, index) => (
            <Button
              key={index}
              size="sm"
              // Define a cor do botão com base na página atual
              colorScheme={currentPage === index + 1 ? 'blue' : 'gray'}
              // Ao clicar em um botão, chama a função handlePageChange para atualizar a página atual
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </Stack>
      </Flex>
    </div>
  );
};

function DashboardBody() {
  const [isSmOrMd] = useMediaQuery('(max-width: 55em)');
  const [isMobile] = useMediaQuery('(max-width: 440px)');


  //Solicito as funções e variaveis que necessito do context
  const {
    SolicitarListaCursosDisponiveis,
    SolicitarListaCursosMatriculados,
    verificarSincronizaçãoDeCursos,
  } = useDashboardContext();

  //Variáveis de estado que são listas que sofrerão tratamentos antes de renderizar na tela
  const [
    listaCursosNaoMatriculadosParaRenderizar,
    setListaCursosNaoMatriculadosParaRenderizar,
  ] = useState([]);
  const [
    listaCursosMatriculadosParaRenderizar,
    setListaCursosMatriculadosParaRenderizar,
  ] = useState([]);

  //Quando o usuário entra na tela, eu chamo uma vez por renderização para inicializar as listas
  useEffect(() => {
    const fetchData = async () => {
      //Solicita todo os cursos disponíveis do id padrõa IAcademy
      const listaTodosOsCursosDisponiveisRetornado =
        await SolicitarListaCursosDisponiveis();
      //Solicita todo os cursos disponíveis do id do usuário atual
      const listaCursosMatriculados = await SolicitarListaCursosMatriculados();

      //Manda a lista dos cursos do usuário para renderizar
      setListaCursosMatriculadosParaRenderizar(listaCursosMatriculados);
      setListaCursosNaoMatriculadosParaRenderizar(
        listaTodosOsCursosDisponiveisRetornado
      );
      //Verifica se o usuário não está matriculado em nenhum curso ainda

      /* if(listaCursosMatriculados===undefined){
          //caso não esteja matriculadom,a função verificarSincronicaçaoDeCursos irá filtrar uma lista vazia
          //portanto não filtrando nenhum curso e retornando todos
          const listaCursosNaoMatriculados = await verificarSincronizaçãoDeCursos(listaTodosOsCursosDisponiveisRetornado,[]);
          setListaCursosNaoMatriculadosParaRenderizar(listaCursosNaoMatriculados)
        }else{
          //Caso ele tenha sido matriculado em algum curso,a  função verificarSincronicaçaoDeCursos irá filtrar a
          //listaDeCursos matriculados, e irá renderizar na tela na aba cursosDisponiveis apenas os cursos que o usuario
          //não está matriculado
          const listaCursosNaoMatriculados = await verificarSincronizaçãoDeCursos(listaTodosOsCursosDisponiveisRetornado,listaCursosMatriculados);
          setListaCursosNaoMatriculadosParaRenderizar(listaCursosNaoMatriculados)
        } */
    };

    fetchData();
  }, []);

  //Enquanto o useEffect faz as requisições e renderiza, as lista estarão vazias, portanto,
  //verifico se as listas para renderizar ainda estão sem conteudo, e caso estejam
  //renderizo na tela um 'skelleton', componente do chakra ui.
  if (
    listaCursosNaoMatriculadosParaRenderizar.length === 0 &&
    listaCursosMatriculadosParaRenderizar.length === 0
  ) {
    return (
      <Container maxWidth="10rem" >
        <Center>
          <Heading as="h1" size="lg" fontSize={"38px"}>
            Dashboard
          </Heading>
        </Center>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={9}
          justifyContent="center"
          alignItems="flex-start"
          mx="auto"
          px={4}
        >
          <Stack>
            <Skeleton height='60vh' width='30vw' />

          </Stack>
          <Stack>
            <Skeleton height='60vh' width='30vw' />

          </Stack>

        </Grid>
      </Container>
    );
  }

  return (
    <Container overflow={isSmOrMd ? "auto" : "none"} justifyContent={'center'}>
      <Center>
        <Heading sx={{...styles.header}}>
          Dashboard
        </Heading>

      </Center>

      <Flex
        flexDir={isSmOrMd ? 'column' : 'row'}
        mt={isSmOrMd ? '5rem' : '3rem'}
        justifyContent={'center'}
        rowGap={isSmOrMd ? '7rem' : '0'}
      >
        <VStack minW={isSmOrMd ? 0 : "40rem"} alignItems={isMobile ? "flex-start" : "center"} >
          <Heading as="h2" size="sm" mb="2">
            Treinamentos em andamento
          </Heading>
          {/*verifica se o usuario ainda não possui cursos matriculados, cajo não esteja, mapea a lista, e adiciona 
            os daos dentro de um componente cardComponenteInciado para renderizar na tela. Caso ele ainda não possua cursos
            ele irá retornar um text */}
          {listaCursosMatriculadosParaRenderizar !== undefined ? (
            listaCursosMatriculadosParaRenderizar.map((curso, index) => (
              <CardComponentCursoIniciado key={index} curso={curso} />
            ))
          ) : (
            <Text>Você ainda não esta matriculado em algum treinamento</Text>
          )}
        </VStack>

        <VStack minW={isSmOrMd ? 0 : "40rem"} alignItems={isMobile ? "flex-start" : "center"}  >
          <Flex flexDir="column"  >
            <Heading
              as="h2"
              size="sm"
              mb="1rem"
              whiteSpace={'nowrap'}
            >
              Treinamentos Disponíveis
            </Heading>
            <Flex >
              <Input
                variant="filled"
                size={isSmOrMd ? "md" : "lg"}
                border="none"
                borderRadius={5}
                borderColor="#0880A2"
                mb="1rem"
                mr={2}
                w={isSmOrMd ? "19rem" : "27rem"}
              />
              <Button bg="#0880A2" color="white" size={isSmOrMd ? "md" : "lg"} borderRadius={12}>
                Pesquisar
              </Button>
            </Flex>
          </Flex>
          <Flex >
            {/*Manda a lista filtrada dos cursos disponiveis e manda para o compoente de paginação */}
            <PaginationComponent
              items={listaCursosNaoMatriculadosParaRenderizar}
            />
          </Flex>
        </VStack>



      </Flex>
    </Container>
  );
}

function Dashboard() {
  return (
    <DashboardProvider>
      <Menu />
      <DashboardBody />
    </DashboardProvider>
  );
}

export default Dashboard;
