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
import styles from "../styles.js";
import Menu from "../Menu";
import axios from 'axios';
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const apiUrl = 'https://my-json-server.typicode.com/IgorEverton/fakeApiTest/configuracoes';

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
  const [idConfiguracao, setIdConfiguracao] = useState('');  
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Erro ao obter configurações', error);
      }
    };
    fetchData();
  }, []);

  const onSelect = (configSelecionada) => {
    if (configSelecionada) {
      const nmConfig = configSelecionada.name;
      setNomeConfiguracao(nmConfig);
  
      // Chama a função getDataById apenas se configSelecionada for um objeto válido
      if (configSelecionada.id) {
        const idDaConfig = configSelecionada.id;
        setIdConfiguracao(idDaConfig);
        getDataById(idDaConfig);
        console.log('ID da Configuração Selecionada:', idDaConfig);
      } else {
        console.error('Objeto de configuração inválido:', configSelecionada);
        // Lide com a situação quando o objeto é inválido
        // Por exemplo, mostrar uma mensagem de erro ou limpar os estados
      }
    } else {
      // Se configSelecionada for falsy, limpe os estados
      setNomeConfiguracao('');
      setIdConfiguracao('');
      // Limpe outros estados conforme necessário
      // ...
    }
  };
  

  const getDataById = async (id) => {
    try {
      let response;
  
      if (id) {
        // Se um ID foi fornecido, busca a configuração correspondente
        response = await axios.get(`${apiUrl}/${id}`);
        const configuracao = response.data;  // Corrija aqui
        popularEstadosPorId(configuracao);
      } else {
        // Caso contrário, busca todas as configurações
        response = await axios.get(apiUrl);
      }
  
      console.log('Dados da Configuração obtidos com sucesso:', response.data);  // Mude aqui se necessário
    } catch (error) {
      console.error('Erro ao buscar dados da configuração:', error);
    }
  };
  

  const popularEstadosPorId = (configuracao) => {
    setInputValue1(configuracao.summary.initialInput);
    setInputValue2(configuracao.summary.finalInput);
    setInputValue3(configuracao.firstContent.initialInput);
    setInputValue4(configuracao.firstContent.finalInput);
    setInputValue5(configuracao.newContent.initialInput);
    setInputValue6(configuracao.newContent.finalInput);
    setInputValue7(configuracao.exercise.initialInput);
    setInputValue8(configuracao.exercise.finalInput);
    setInputValue9(configuracao.correction.initialInput);
    setInputValue10(configuracao.correction.finalInput);
    setInputValue11(configuracao.pendency.initialInput);
    setInputValue12(configuracao.pendency.finalInput);
  };

  const handleInputChange = (e, identifier) => {
    const inputValue = e.target.value;
    switch (identifier) {
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
      default:
        break;
    }
  };
  const handleTabChange = (index) => {
    setActiveIndex(index);
  };

  const handleNextTab = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, 5));
  };

  const handlePreviousTab = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  function criarObjeto() {
    return {
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
      exercise: {
        initialInput: inputValue7,
        finalInput: inputValue8,
      },
      correction: {
        initialInput: inputValue9,
        finalInput: inputValue10,
      },
      pendency: {
        initialInput: inputValue11,
        finalInput: inputValue12,
      },
    };
  }

  const enviarParaAPI = async () => {
    const obj = criarObjeto();
    if (idConfiguracao) {
      try {
        const resposta = await axios.put(`https://my-json-server.typicode.com/IgorEverton/fakeApiTest/configuracoes/${idConfiguracao}`, obj);
        if (resposta.status === 200) {
          console.log('Configuração atualizada com sucesso!');
        } else {
          console.error('Erro ao atualizar configuração:', resposta.statusText);
        }
      } catch (erro) {
        console.error('Erro na requisição:', erro.message);
      }
    } else {
      try {
        const resposta = await axios.post('https://my-json-server.typicode.com/IgorEverton/fakeApiTest/configuracoes', obj);
        if (resposta.status === 201) {
          console.log('Configuração enviada com sucesso!');
        } else {
          console.error('Erro ao enviar configuração:', resposta.statusText);
        }
      } catch (erro) {
        console.error('Erro na requisição:', erro.message);
      }
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
  }

  return (
    <Flex maxW='vw' mx="auto" direction={"column"} gap="4rem" p={"1rem"}>
      <Menu/>
      <Heading>Criar novo Treinamento</Heading>
      <VStack alignItems={"center"} bg={"#282B38"} p="4" gap="2rem" borderRadius={7}>
        <Heading size={12}>Configuração</Heading>      
        <Select placeholder='Select option' spacing={3} icon={<ChevronDownIcon />} bg="white" color="black" onChange={(e) => onSelect(data.find(config => config.id === e.target.value))}>
          {data.map((config) => (
            <option key={config?.id} value={config?.id}>
              {config?.name}
            </option>
          ))}
        </Select>
        <Flex direction="row" p={0} w="100%" justifyContent="space-between" align={"center"}>
          <IconButton aria-label='Add to friends' icon={<AddIcon />} onClick={onOpen}/>
          <Button bg="#0880A2" color="white" onClick={() => navigate("/NextTreinamento")}>Próximo</Button>
        </Flex>
      </VStack>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose} 
        isOpen={isOpen} 
        isCentered 
        size="3xl" 
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
              <Tab>Exercício</Tab>
              <Tab>Correção</Tab>
              <Tab>Pendência</Tab>
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
                  color={"black"}
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
                  color="black"
                  bg="white" 
                  value={inputValue12}
                  onChange={(e) => handleInputChange(e, 12)}
                  placeholder='Digite o input final'
                  size='md'
                  mb="1.5rem"
                />
                <Flex justifyContent={"space-evenly"}>
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