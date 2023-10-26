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
import  Treinamento from './treinamento'

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
  const navigate = useNavigate();
  const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPd25lcklkIjoiaWFjYWRlbXkiLCJUZXh0R2VucmVzIjoiW1wiSW5mb3JtYXRpdm9cIixcIkV4cGxpY2F0aXZvXCIsXCJOYXJyYXRpdm9cIixcIkFyZ3VtZW50YXRpdm9cIl0iLCJuYmYiOjE2OTgzNTAyMjEsImV4cCI6MTY5ODM1MzgyMSwiaWF0IjoxNjk4MzUwMjIxfQ.VLUkr2391GNcdg5p6NpM9GtMvLrWcCNUmKU00IYzido"

  const criarObj = () => {
    return {
      theme: tema,
      category: categoria,
      subcategory: subcategoria,
      icon: imageUrl,
      configurationId: identificacao,
      shouldGeneratePendency: true,

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


  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      // Ajuste para usar a primeira configuração como imagem inicial
      if (response.data.length > 0) {
        setImageUrl(response.data[0].imageUrl);
      }
    } catch (error) {
      console.error('Erro ao obter configurações', error);
    }
  };

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const setNewImage = () => {
    setImageUrl(inputUrl);
    setModalOpen(false);
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
                placeholder="Selecione Subtópico"
                spacing={3}
                icon={<ChevronDownIcon />}
                bg="white"
                color="black"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
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
