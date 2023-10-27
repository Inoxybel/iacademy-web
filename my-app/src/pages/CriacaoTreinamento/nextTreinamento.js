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



const api = axios.create({
  baseURL:"https://iacademy-v1-api.azurewebsites.net"
})

function NextTreinamento() {
  const [tema, setTema] = useState('');
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [identificacao, setIdentificacao] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [topicos, setTopicos] = useState([]);
  const [subtopicos, setSubtopicos] = useState([]);
  const [topicoSelecionado, setTopicoSelecionado] = useState('');
  const [subtopicoSelecionado, setSubtopicoSelecionado] = useState('');
  const [dados, setDados] = useState({ topics: [] });
  const navigate = useNavigate();
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPd25lcklkIjoiaWFjYWRlbXkiLCJUZXh0R2VucmVzIjoiW1wiSW5mb3JtYXRpdm9cIixcIkV4cGxpY2F0aXZvXCIsXCJOYXJyYXRpdm9cIixcIkFyZ3VtZW50YXRpdm9cIl0iLCJuYmYiOjE2OTgzNjc3MDYsImV4cCI6MTY5ODM3MTMwNiwiaWF0IjoxNjk4MzY3NzA2fQ.kxxcBKNZJFLEdCxdsZvg9pvpVBwmCjrAu0OpRcbvKKM"
  const tokenUser = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPd25lcklkIjoiMjhhZjQ0OTQtNTA3MC00YmYyLWEzM2YtNmE0OTliYjIwY2JkIiwiRG9jdW1lbnQiOiI4NjkyMzIzMTAxOSIsIkNvbXBhbnlSZWYiOiJpYWNhZGVteSIsIlRleHRHZW5yZXMiOiJbXCJJbmZvcm1hdGl2b1wiLFwiRXhwbGljYXRpdm9cIixcIk5hcnJhdGl2b1wiLFwiQXJndW1lbnRhdGl2b1wiXSIsIm5iZiI6MTY5ODM2NzU3NCwiZXhwIjoxNjk4MzcxMTc0LCJpYXQiOjE2OTgzNjc1NzR9.451MdRmYpY0M0jh-61yW0PZohC8jnQDKDbUWPh6PsGg"

  const criarObj = () => {
    return {
      theme: tema,
      category: categoria,
      subcategory: subcategoria,
      icon: imageUrl,
      configurationId: identificacao,
      shouldGeneratePendency: true,
      ownerId: "",
    };
  };
  const enviarParaAPI = async () => {
    const obj = criarObj(Treinamento.idConfiguracao);
    console.log("objeto que está sendo enviado: ", obj)

    try {
      
      const resposta = await api.post("/api/ai/summary/create", obj, { headers: { 'Authorization': 'Bearer ' + token } });
      if (resposta.status === 201) {
        console.log('Base criada com sucesso!');
        
        fetchData();
      } else {
        console.error('Erro ao enviar base:', resposta.statusText);
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro.message);
      console.log('Detalhes do Erro:', erro.response.data);
    }
  };


  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const setNewImage = () => {
    setImageUrl(inputUrl);
    setModalOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/summary/available`, {
          headers: {
            'Authorization': 'Bearer ' + tokenUser
          }
        });

        if (response && response.data) {
          const dados = response.data;
          setDados(dados);
          if (dados && dados.topics) {
            setTopicos(dados.topics.map((topico) => topico.title));
          }
          
          console.log("ID da configuração: ", Treinamento.idConfiguracao);
        } else {
          console.error('Resposta não definida ou sem dados.');
        }
      } catch (error) {
        console.error('Erro ao obter dados da API', error);
        console.log('Detalhes do Erro:', error.response.data);
      }
    };

    fetchData();
  }, [Treinamento.idConfiguracao, tokenUser]);

  console.log("topicos:", topicos);
  console.log("Titulo: ",subtopicos.title)

    const handleTopicoChange = (event) => {
      const novoTopico = event.target.value;
      setTopicoSelecionado(novoTopico);
  
      const topicoCorrespondente = dados.topics.find((topico) => topico.title === novoTopico);
      if (topicoCorrespondente) {
        setSubtopicos(topicoCorrespondente.subtopics.map((subtopico) => subtopico.title));
      }
    };

  return (
    <Flex maxW="vw" mx="auto">
      <Menu />
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
                  <option key={topicos} value={topicos}>
                    {topicos.title}
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
              >
                {subtopicos.map((subtopico) => (
                  <option key={subtopico} value={subtopico}>
                    {subtopico.title}
                  </option>
                ))}
              </Select>
              <Button ml="5" bg="#3C485A" color={'white'}>
                Criar
              </Button>
            </Flex>
            <Textarea placeholder="Here is a sample placeholder" size="lg" bg="white" minH="340px" color="black" />
          </GridItem>
          <GridItem colSpan={1} bg={'#282B38'} p={5}>
            <Heading as="h3" size="sm" mb="0.5rem">
              Exercícios:
            </Heading>
            <Textarea placeholder="Here is a sample placeholder" size="lg" bg="white" minH="390px" color="black" />
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
