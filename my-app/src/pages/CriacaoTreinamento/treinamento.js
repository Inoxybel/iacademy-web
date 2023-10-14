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
import { pegarConfiguracao, atualizarConfiguracao, novaConfiguracao} from '../Fetchers/FetchersApp';


function Treinamento() {

  const [opcoes, setOpcoes] = useState([]);
  const [configuracoes, setConfiguracoes] = useState([]);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
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


  useEffect(() => {
    // Função para buscar as configurações e atualizar o estado 'configuracoes'
    const fetchConfiguracoes = async () => {
      try {
        const response = await pegarConfiguracao(); // Supondo que pegarConfiguracao não requer um parâmetro específico
        setConfiguracoes(response.data); // Atualiza o estado com as configurações obtidas da API
      } catch (error) {
        console.error('Erro ao buscar configurações:', error);
      }
    };

    fetchConfiguracoes(); // Chama a função ao montar o componente
  }, []); // O array vazio garante que a função é chamada apenas uma vez no carregamento inicial

  useEffect(() => {
    // Converte as configurações para o formato desejado para as opções do Select
    const opcoesFormatadas = configuracoes.map((config) => (
      <option key={config.id} value={config.valor}>
        {config.nome}
      </option>
    ));

    setOpcoes(opcoesFormatadas); // Atualiza o estado com as opções formatadas
  }, [configuracoes]); 

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
        <Select placeholder='Select option' spacing={3} icon={<ChevronDownIcon />} bg="white" color="black">
          {opcoes.length > 0 ? opcoes : <option value="">Carregando...</option>}
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
          <ModalHeader>Nome_Configuração_Atual</ModalHeader>
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
                <Button bg="#0880A2" color="white">Salvar Alterações</Button>
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