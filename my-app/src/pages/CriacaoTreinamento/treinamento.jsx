import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  Flex,
  Select,
  VStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Textarea,
  Text,
} from "@chakra-ui/react";
import Menu from "../Menu.jsx";
import axios from 'axios';
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";


const api = axios.create({
  baseURL:"https://iacademy-v1-api.azurewebsites.net"
})

function Treinamento() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nomeConfiguracao, setNomeConfiguracao] = useState('');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [inputValue6, setInputValue6] = useState('');
  const [inputValue7, setInputValue7] = useState('');
  const [inputValue8, setInputValue8] = useState('');
  const [inputValue9, setInputValue9] = useState('');
  const [inputValue10, setInputValue10] = useState('');
  const [inputValue11, setInputValue11] = useState('');
  const [inputValue12, setInputValue12] = useState('');  
  const [inputValue13, setInputValue13] = useState('');  
  const [inputValue14, setInputValue14] = useState('');  
  const [objNomeConfiguracao, setObjNomeConfiguracao] = useState('');
  const [idConfiguracao, setIdConfiguracao] = useState('');  
  const [selectedConfig, setSelectedConfig] = useState(null);
  const tokenAPI = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJPd25lcklkIjoiaWFjYWRlbXkiLCJUZXh0R2VucmVzIjoiW1wiSW5mb3JtYXRpdm9cIixcIkV4cGxpY2F0aXZvXCIsXCJOYXJyYXRpdm9cIixcIkFyZ3VtZW50YXRpdm9cIl0iLCJuYmYiOjE2OTg1MTY5NTcsImV4cCI6MTY5ODUyMDU1NywiaWF0IjoxNjk4NTE2OTU3fQ.b9EeyAVCvVPr2XTPU2W4ISFQI2xqC_coBCIEZVWXbkY"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/configurations", {
          headers: {
            'Authorization': 'Bearer ' + tokenAPI,
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Erro ao obter configurações', error);
        console.log("o token é: ", tokenAPI);
      }
    };
    fetchData();
  }, []);
  
  const onSelect = (configSelecionada) => {
    if (configSelecionada) {
      setSelectedConfig(configSelecionada);
      const nmConfig = configSelecionada.name;
      setNomeConfiguracao(nmConfig);
  
      if (configSelecionada.id) {
        const idDaConfig = configSelecionada.id;
        setIdConfiguracao(idDaConfig);
        getDataById(idDaConfig);
        console.log('ID da Configuração Selecionada:', idDaConfig);
      } else {
        console.error('Objeto de configuração inválido:', configSelecionada);
      }
    } else {
      setNomeConfiguracao('');
      setIdConfiguracao('');
    }
  };
  

  const getDataById = async (id) => {
    try {
      let response;
  
      if (id) {
        console.log('Fazendo requisição para:', `/api/configurations/${id}`);
        response = await api.get(`/api/configurations/${id}`, {
          headers: {
            'Authorization': 'Bearer ' + tokenAPI,
          },
        });
      } else {
        console.log('Fazendo requisição para:', '/api/configurations');
        response = await api.get("/api/configurations", {
          headers: {
            'Authorization': 'Bearer ' + tokenAPI,
          },
        });
      }
      const configuracao = response.data;
      popularEstadosPorId(configuracao);
      console.log('Dados da Configuração obtidos com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao buscar dados da configuração:', error.response?.data || error.message);
      console.log('Detalhes do Erro:', error.response.data);

    }
  };
  
  
  
  

  const popularEstadosPorId = (configuracao) => {
    console.log('Configuração recebida:', configuracao);
    setInputValue1(configuracao.summary.initialInput);
    setInputValue2(configuracao.summary.finalInput);
    setInputValue3(configuracao.firstContent.initialInput);
    setInputValue4(configuracao.firstContent.finalInput);
    setInputValue5(configuracao.newContent.initialInput);
    setInputValue6(configuracao.newContent.finalInput);
    setInputValue7(configuracao.newContentWithChat.initialInput);
    setInputValue8(configuracao.newContentWithChat.finalInput);
    setInputValue9(configuracao.exercise.initialInput);
    setInputValue10(configuracao.exercise.finalInput);
    setInputValue11(configuracao.correction.initialInput);
    setInputValue12(configuracao.correction.finalInput);
    setInputValue13(configuracao.pendency.initialInput);
    setInputValue14(configuracao.pendency.finalInput);
  };

  const handleInputChange = (e, identifier) => {
    const inputValue = e.target.value;
  
    switch (identifier) {
      case "nomeConfiguracao":
        setObjNomeConfiguracao(inputValue);
        break;
      case 1:
        setInputValue1(inputValue);
        break;
      case 2:
        setInputValue2(inputValue);
        break;
      case 3:
        setInputValue3(inputValue);
        break;
      case 4:
        setInputValue4(inputValue);
        break;
      case 5:
        setInputValue5(inputValue);
        break;
      case 6:
        setInputValue6(inputValue);
        break;
      case 7:
        setInputValue7(inputValue);
        break;
      case 8:
        setInputValue8(inputValue);
        break;
      case 9:
        setInputValue9(inputValue);
        break;
      case 10:
        setInputValue10(inputValue);
        break;
      case 11:
        setInputValue11(inputValue);
        break;
      case 12:
        setInputValue12(inputValue);
        break;
      case 13:
        setInputValue13(inputValue);
        break;
      case 14:
        setInputValue14(inputValue);
        break;
      default:
        break;
    }
  };
  
  const handleTabChange = (index) => {
    setActiveIndex(index);
  };

  const handleNextTab = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, 7));
  };

  const handlePreviousTab = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  function criarObjeto() {
    return {
      name: objNomeConfiguracao, 
      summary: {
        initialInput: inputValue1,
        finalInput: inputValue2,
      },
      firstContent: {
        initialInput: inputValue3,
        finalInput: inputValue4,
      },
      newContent: {
        initialInput: inputValue5,
        finalInput: inputValue6,
      },
      newContentWithChat: {
        initialInput: inputValue7,
        finalInput: inputValue8,
      },
      exercise: {
        initialInput: inputValue9,
        finalInput: inputValue10,
      },
      correction: {
        initialInput: inputValue11,
        finalInput: inputValue12,
      },
      pendency: {
        initialInput: inputValue13,
        finalInput: inputValue14,
      },
    };
  }
  

  const enviarParaAPI = async () => {
    const configuracaoObjeto = criarObjeto();
    console.log('Configuração Objeto:', configuracaoObjeto);
  
    try {
      const resposta = idConfiguracao
        ? await api.put(`/api/configurations/${idConfiguracao}`, configuracaoObjeto, { headers: { 'Authorization': 'Bearer ' + tokenAPI } })
        : await api.post("/api/configurations", configuracaoObjeto, { headers: { 'Authorization': 'Bearer ' + tokenAPI } });
  
      if (resposta.status === 200 || resposta.status === 201) {
        console.log('Configuração salva com sucesso!');
      } else {
        console.error('Erro ao salvar configuração:', resposta.statusText);
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro.message);
      console.log('Detalhes do Erro:', erro.response.data);
    }
  };
  

  const limpaCampos=()=>{
    setInputValue1("");
    setInputValue2("");
    setInputValue3("");
    setInputValue4("");
    setInputValue5("");
    setInputValue6("");
    setInputValue7("");
    setInputValue8("");
    setInputValue9("");
    setInputValue10("");
    setInputValue11("");
    setInputValue12("");
    setInputValue13("");
    setInputValue14("");

  }


  function criarOuSubstituirChave(id) {   
    if (localStorage.getItem('id_configuracao')) {
           localStorage.removeItem('id_configuracao');
      }   localStorage.setItem('id_configuracao', id); }

  return (
    <Flex maxW='vw' mx="auto" direction={"column"} gap="4rem" p={"1rem"} color="white">
      <Heading>Criar novo Treinamento</Heading>
      <VStack alignItems={"center"} bg={"#282B38"} p="4" gap="2rem" borderRadius={7}>
        <Heading size={12}>Configuração</Heading>      
        <Select placeholder='Select option' spacing={3} icon={<ChevronDownIcon />} bg="white" color="black" onChange={(e) => onSelect(data.find(config => config.id === e.target.value))}>
        {Array.isArray(data) && data.map((config) => (
          <option key={config?.id} value={config?.id}>
            {config?.name}
          </option>
        ))} 
        </Select>
        <Flex direction="row" p={0} w="100%" justifyContent="space-between" align={"center"}>
          <IconButton aria-label='Add to friends' icon={<AddIcon />} onClick={onOpen}/>
          <Button bg="#0880A2" color="white" onClick={() => {
            navigate("/NextTreinamento")
            criarOuSubstituirChave(idConfiguracao)}}
          >Próximo</Button>
        </Flex>
      </VStack>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose} 
        isOpen={isOpen} 
        isCentered 
        size="4xl" 
        >
        <ModalOverlay />
        <ModalContent bg="#282B38" color="white">
          <ModalHeader>{nomeConfiguracao}</ModalHeader>
          <ModalCloseButton onClick={()=>{
            setActiveIndex(0);
            limpaCampos();
          }}/>
          <ModalBody>
          <Tabs 
            isFitted variant='enclosed'         
            index={activeIndex} 
            onChange={handleTabChange}>
            <TabList mb='1em'>
              <Tab>Sumário</Tab>
              <Tab>Primeiro Conteúdo</Tab>
              <Tab>Novo Conteúdo</Tab>
              <Tab>Novo Conteúdo Chat</Tab>
              <Tab>Exercício</Tab>
              <Tab>Correção</Tab>
              <Tab>Pendência</Tab>
              <Tab>Nome Configuração</Tab>
            </TabList>
            <TabPanels >
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  color="black"
                  bg="white"
                  value={inputValue1}
                  onChange={(e) => handleInputChange(e, 1)}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="1.5rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea 
                  color="black"
                  bg="white" 
                  value={inputValue2}
                  onChange={(e) => handleInputChange(e, 2)}
                  placeholder='Digite o input final'
                  mb="1.5rem"
                  size='md'
                />
                <Flex justifyContent={"center"} alignItems={"center"}>
                  <Button onClick={handleNextTab}>Proximo</Button>
                </Flex>
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  color="black"
                  bg="white"
                  value={inputValue3}
                  onChange={(e) => handleInputChange(e, 3)}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="1.5rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  color="black"
                  bg="white" 
                  value={inputValue4}
                  onChange={(e) => handleInputChange(e, 4)}
                  placeholder='Digite o input final'
                  size='md'
                  mb="1.5rem"
                />
                <Flex justifyContent={"space-evenly"} alignItems={"center"}>
                  <Button onClick={handlePreviousTab}>Anterior</Button>
                  <Button onClick={handleNextTab}>Próximo</Button>
                </Flex>
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  color="black"
                  bg="white"
                  value={inputValue5}
                  onChange={(e) => handleInputChange(e, 5)}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="1.5rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  color="black"
                  bg="white" 
                  value={inputValue6}
                  onChange={(e) => handleInputChange(e, 6)}
                  placeholder='Digite o input final'
                  size='md'
                  mb="1.5rem"
                />
                <Flex justifyContent={"space-evenly"} alignItems={"center"}>
                  <Button onClick={handlePreviousTab}>Anterior</Button>
                  <Button onClick={handleNextTab}>Próximo</Button>
                </Flex>
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  color="black"
                  bg="white"
                  value={inputValue7}
                  onChange={(e) => handleInputChange(e, 7)}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="1.5rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  color="black"
                  bg="white" 
                  value={inputValue8}
                  onChange={(e) => handleInputChange(e, 8)}
                  placeholder='Digite o input final'
                  size='md'
                  mb="1.5rem"
                />
                <Flex justifyContent={"space-evenly"} alignItems={"center"}>
                  <Button onClick={handlePreviousTab}>Anterior</Button>
                  <Button onClick={handleNextTab}>Próximo</Button>
                </Flex>
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  color="black"
                  bg="white"
                  value={inputValue9}
                  onChange={(e) => handleInputChange(e, 9)}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="1.5rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  color="black"
                  bg="white" 
                  value={inputValue10}
                  onChange={(e) => handleInputChange(e, 10)}
                  placeholder='Digite o input final'
                  size='md'
                  mb="1.5rem"
                />
                <Flex justifyContent={"space-evenly"} alignItems={"center"}>
                  <Button onClick={handlePreviousTab}>Anterior</Button>
                  <Button onClick={handleNextTab}>Próximo</Button>
                </Flex>
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  color="black"
                  bg="white"
                  value={inputValue11}
                  onChange={(e) => handleInputChange(e, 11)}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="1.5rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  color={"black"}
                  bg="white" 
                  value={inputValue12}
                  onChange={(e) => handleInputChange(e, 12)}
                  placeholder='Digite o input final'
                  size='md'
                  mb="1.5rem"
                />
                <Flex justifyContent={"space-evenly"} alignItems={"center"}>
                  <Button onClick={handlePreviousTab}>Anterior</Button>
                  <Button onClick={handleNextTab}>Próximo</Button>
                </Flex>
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  color="black"
                  bg="white"
                  value={inputValue13}
                  onChange={(e) => handleInputChange(e, 13)}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="1.5rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  color="black"
                  bg="white" 
                  value={inputValue14}
                  onChange={(e) => handleInputChange(e, 14)}
                  placeholder='Digite o input final'
                  size='md'
                  mb="1.5rem"
                />
                <Flex justifyContent={"space-evenly"}>
                <Button onClick={handlePreviousTab}>Anterior</Button>
                <Button onClick={handleNextTab}>Próximo</Button>
                </Flex>
              </TabPanel>
              <TabPanel >
                <Textarea
                  color={"black"}
                  bg="white" 
                  value={objNomeConfiguracao}
                  onChange={(e) => handleInputChange(e, "nomeConfiguracao")}
                  placeholder='Digite o nome da configuração'
                  size='md'
                  mb="1.5rem"
                />
                <Flex justifyContent={"space-evenly"} alignItems={"center"}>
                  <Button onClick={handlePreviousTab}>Anterior</Button>
                  <Button bg="#0880A2" color="white" onClick={()=>{
                  enviarParaAPI();
                  onClose();
                  }}>Salvar Alterações</Button>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Treinamento;