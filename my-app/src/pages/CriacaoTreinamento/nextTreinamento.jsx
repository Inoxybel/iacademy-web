import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Button,
  Flex,
  Select,
  VStack,
  Textarea,
  Image,
  Input,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { ChevronDownIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Menu from '../Menu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  Treinamento from './treinamento';
import Cookies from "universal-cookie";

const api = axios.create({
  baseURL:"https://iacademy-v1-api.azurewebsites.net"
})

function NextTreinamento() {
  const [tema, setTema] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [identificacao, setIdentificacao] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [topicos, setTopicos] = useState([]);
  const [subtopicos, setSubtopicos] = useState([]);
  const [allSubtopics, setAllSubtopics] = useState([]);
  const [topicoSelecionado, setTopicoSelecionado] = useState('');
  const [subtopicoSelecionado, setSubtopicoSelecionado] = useState('');
  const [dados, setDados] = useState({ topics: [] });
  const [propriedadesSubtopico, setPropriedadesSubtopico] = useState(null);
  const [id, setId] = useState("");
  const [subtopicIndexMap, setSubtopicIndexMap] = useState({});
  const [subtopicIndex, setSubtopicIndex] = useState(null);
  const [exerciseId, setExerciseId]=useState("");
  const [exercicioInfo, setExercicioInfo] = useState({
    question: '',
  });
  const [tokenAPI, setTokenAPI]=useState("");
  
  const navigate = useNavigate();
  
  const cookies = new Cookies();


  async function getTokenAsync() {
     try {
        const token = await cookies.get("token");
        return token;
     } catch (error) {
        throw error;
     }
  }

  
  async function setAuthorizationHeader(api) {
     const token = await getTokenAsync();
     if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
     }
  }
  const criarObj = () => {
    return {
      theme: tema,
      category: categoria,
      subcategory: subcategoria,
      icon: imageUrl,
      configurationId: identificacao,
      shouldGeneratePendency: true,
      NewContentWithChat: conteudo,
      ownerId: "iacademy",
    };
  };
  const enviarParaAPI = async () => {
    const obj = criarObj(Treinamento.idConfiguracao);
    console.log("objeto que está sendo enviado: ", obj)

    try {
      const resposta = await api.post("/api/ai/summary/create", obj, { headers: { 'Authorization': 'Bearer ' + tokenAPI } });
      if (resposta.status === 201) {
        console.log('Base criada com sucesso!');
        console.log(resposta)
        const id = (resposta.data)
        setId(id);
      } else {
        console.error('Erro ao enviar base:', resposta.statusText);
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro.message);
      console.log('Detalhes do Erro:', erro.response);
    }
  };


  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const setNewImage = () => {
    setImageUrl(inputUrl);
    setModalOpen(false);
  };

function objSelect(){
  return{
    subtopicIndex: subtopicoSelecionado ? subtopicIndexMap[subtopicoSelecionado] : null
  }
}


const enviarObjetoPorSubtopico = async () => {
  const obj = objSelect();
  try {
    console.log("Id que está sendo enviado para create-content-by-subtopic", id);
    console.log('Objeto enviado com sucesso!', obj);
    const resposta = await api.post(`/api/ai/summary/614201d5-a639-4a60-9abb-3a8fbb3ca4dd/create-content-by-subtopic`, obj, { headers: { 'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPd25lcklkIjoiaWFjYWRlbXkiLCJUZXh0R2VucmVzIjoiW1wiSW5mb3JtYXRpdm9cIixcIkV4cGxpY2F0aXZvXCIsXCJOYXJyYXRpdm9cIixcIkFyZ3VtZW50YXRpdm9cIl0iLCJuYmYiOjE2OTg1MTQ0ODAsImV4cCI6MTY5ODUxODA4MCwiaWF0IjoxNjk4NTE0NDgwfQ.8XeXXFFjL1vZXb1bDI7wAjev4AygJcG-ONZ07W7O70o" } });

    if (resposta.status === 201) {
      console.log('Objeto enviado com sucesso!', subtopicIndexMap);

      // Se a operação for bem-sucedida, obtenha as informações do exercício
      
    } else {
      console.error('Erro ao enviar objeto:', resposta.statusText);
    }
  } catch (erro) {
    console.error('Erro na requisição:', erro.message);
    console.log('Detalhes do Erro:', erro.response);
  }
};




useEffect(() => {
  const fetchData = async () => {
    try {
      const idIdentificacao = localStorage.getItem('id_configuracao');
      setIdentificacao(idIdentificacao);
      await setAuthorizationHeader(api);
      const response = await api.get(`/api/summary/614201d5-a639-4a60-9abb-3a8fbb3ca4dd`);
      
      if (response && response.data) {
        const dados = response.data;
        setDados(dados);
        
        if (dados && dados.topics) {
          const subtopicMap = {};
          
          // Cria um mapeamento de títulos para índices dos sub-tópicos
          dados.topics.forEach((topico) => {
            if (topico.subtopics) {
              topico.subtopics.forEach((subtopico) => {
                subtopicMap[subtopico.title] = subtopico.index;
              });
            }
          });

          // Atualiza o estado com o mapeamento
          setSubtopicIndexMap(subtopicMap);

          setTopicos(['Todos', ...dados.topics.map((topico) => topico.title)]);
          
          const subtópicos = dados.topics.flatMap((topico) =>
            topico.subtopics ? topico.subtopics.map((subtopico) => subtopico.title) : []
          );
          setAllSubtopics(subtópicos);

          // Verifica se há um sub-tópico selecionado e atualiza o estado
          if (subtopicoSelecionado) {
            const selectedSubtopicIndex = subtopicMap[subtopicoSelecionado];
            setSubtopicIndex(selectedSubtopicIndex);
            const selectedSubtopic = dados.topics
              .flatMap((topico) => topico.subtopics || [])
              .find((subtopico) => subtopico.title === subtopicoSelecionado);

            if (
              selectedSubtopic &&
              selectedSubtopic.exercises &&
              selectedSubtopic.exercises.length > 0 &&
              selectedSubtopic.exercises[0].exerciseId
            ) {
              const exerciseId = selectedSubtopic.exercises[0].exerciseId;
              setExerciseId(exerciseId);
              console.log("id do exercicio",exerciseId)
          }
        }
        }
      } else {
        console.error('Resposta não definida ou sem dados.');
      }
    } catch (error) {
      console.error('Erro ao obter dados da API', error);
      console.log('Detalhes do Erro:', error.response);
    }
  };
  const getMasterToken = async () => {
    try {
      const response = await api.post('/api/token/get-master-token');
      const newToken = response.data; // Substitua por como você obtém o token do response

      // Atualize o estado com o novo token
      setTokenAPI(newToken);

      // Configure um temporizador para a próxima atualização antes que o token expire
      const nextUpdate = 50 * 60 * 1000; // 50 minutos em milissegundos
      setTimeout(getMasterToken, nextUpdate);
    } catch (error) {
      console.error('Erro ao obter o token master:', error.message);
    }
  };

  // Inicialize a primeira chamada para obter o token master
  getMasterToken();

  // Execute fetchData ao montar o componente e sempre que id, subtopicoSelecionado ou exercicioInfo mudar
  fetchData();
}, [id, subtopicoSelecionado, exercicioInfo]);


  

  const fetchExerciseInfo = async () => {
    try {
      await setAuthorizationHeader(api);
      console.log("id do exercicio",exerciseId)
      const exerciseResponse = await api.get(`/api/exercise/${exerciseId}`);
      const exerciseData = exerciseResponse.data;
      setExercicioInfo(exerciseData.exercises[0].question)
    } catch (error) {
      console.error('Erro ao obter informações do exercício', error);
      throw error;
    }
  };
  
  
  const handleTopicoChange = (event) => {
    const novoTopico = event.target.value;
    setTopicoSelecionado(novoTopico);
  
    // Verifique se dados.topics e subtopicos estão definidos antes de chamar map
    if (novoTopico === 'Todos') {
      setSubtopicos(allSubtopics);
    } else {
      const topicoCorrespondente = dados.topics.find((topico) => topico.title === novoTopico);
  
      if (topicoCorrespondente && topicoCorrespondente.subtopics) {
        setSubtopicos(topicoCorrespondente.subtopics.map((subtopico) => subtopico.title));
      } else {
        setSubtopicos([]); // ou qualquer valor padrão desejado se subtopics não estiver definido
      }
    }
  };


  return (
    <Flex maxW="vw" mx="auto" color="white">
      <Flex>
        <ArrowBackIcon
          w={6}
          h={6}
          m={2}
          onClick={() => navigate('/Treinamento')}
          _hover={{ cursor: 'pointer' }}
        />
      </Flex>
      <Flex direction={'column'} gap="2rem" p={5}>
        <Heading align="center">Criar novo Treinamento</Heading>
        <VStack alignItems={'center'} bg={'#282B38'} p="3" borderRadius={7}>
          <Heading size={12}>Informações do Treinamento</Heading>
          <Flex align={'center'} justifyContent={'space-between'} gap="1rem">
            <Box>
              <Image
                src={imageUrl || 'https://via.placeholder.com/90'}
                borderRadius={7}
                alt="Descrição da imagem"
                h={120}
                w={140}
              />
              <Button onClick={() => setModalOpen(true)} mt={5}>
                Definir Imagem
              </Button>
            </Box>
            <Input value={tema} onChange={(e) => setTema(e.target.value)} placeholder="Tema" mx="auto" />
            <Input
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Categoria"
              mx="auto"
            />
            <Input
              value={subcategoria}
              onChange={(e) => setSubcategoria(e.target.value)}
              placeholder="Subcategoria"
              mx="auto"
            />
            <Input
              isDisabled={true}
              value={identificacao}
              onChange={(e) => setIdentificacao(e.target.value)}
              placeholder="Identificação"
              mx="auto"
            />
          </Flex>
          <Flex alignSelf={'flex-end'}>
            <Button bg="#3C485A" color={'white'} onClick={enviarParaAPI}>
              Criar Base
            </Button>
          </Flex>
        </VStack>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={1} bg={'#282B38'} h="30rem" w="33rem" p={5}>
            <Heading as="h3" size="sm" mb="0.2rem">
              Subtópico:
            </Heading>
            <Flex mb={'1rem'}>
            <Select
                placeholder="Selecione Tópico"
                value={topicoSelecionado}
                onChange={handleTopicoChange}
                spacing={3}
                icon={<ChevronDownIcon />}
                bg="white"
                color="black"
              >
                {topicos.map((topico) => (
                  <option key={topico} value={topico}>
                    {topico}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Selecione Subtópico"
                value={subtopicoSelecionado}
                onChange={(event) => setSubtopicoSelecionado(event.target.value)}
                spacing={3}
                icon={<ChevronDownIcon />}
                bg="white"
                color="black"
                onClick={(e)=>{
                  e.target.ind
                }}
              >
                {subtopicos.map((subtopico) => (
                  <option key={subtopico} value={subtopico}>
                    {subtopico}
                  </option>
                ))}
              </Select>
              <Button
                ml="5"
                bg="#3C485A"
                color={'white'}
                onClick={()=>{enviarObjetoPorSubtopico(); fetchExerciseInfo();}}
                disabled={!propriedadesSubtopico}
              >
                Criar
              </Button>
            </Flex>
            <Textarea placeholder="Here is a sample placeholder" size="lg" bg="white" minH="340px" color="black" />
          </GridItem>
          <GridItem colSpan={1} bg={'#282B38'} p={5}>
            <Heading as="h3" size="sm" mb="0.5rem">
              Exercícios:
            </Heading>
            <Textarea
                placeholder="Here is a sample placeholder"
                size="lg"
                bg="white"
                minH="340px"
                color="black"
                value={exercicioInfo.question}
                readOnly={!exercicioInfo.question}
              />

          </GridItem>
        </Grid>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Definir Imagem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              placeholder="Insira a URL da imagem"
              value={inputUrl}
              onChange={handleInputChange}
              mb={4}
            />
            <Button onClick={setNewImage}>Definir</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default NextTreinamento;
