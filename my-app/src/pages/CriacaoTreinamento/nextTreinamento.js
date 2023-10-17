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
  Image,
  Input,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import styles from "../styles.js";
import Menu from "../Menu";
import axios from 'axios';
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { pegarConfiguracao, atualizarConfiguracao, novaConfiguracao} from '../../services/Fetchers/FetchersApp';

function Treinamento() {
  const [tema, setTema] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [identificacao, setIdentificacao] = useState("");

  function criarObj(){
    return(
      tema, categoria, subcategoria, identificacao
      );
  }

  const enviarParaAPI = async () => {
    // Crie o objeto de configuração
    const obj = criarObj();
  
    try {
      // Chame a função novaConfiguracao passando o objeto de configuração
      const resposta = await atualizarConfiguracao(obj);
  
      // Verifique a resposta ou lide com erros, se necessário
      if (resposta.ok) {
        console.log('Configuração atualizada com sucesso!');
      } else {
        console.error('Erro ao atualizar configuração:', resposta.statusText);
      }
    } catch (erro) {
      console.error('Erro na requisição:', erro);
    }
  };

  return (
    <Flex maxW='vw' mx="auto" direction={"column"} gap="2rem" p={5} align="center"  >
      <Menu/>
      <Heading>Criar novo Treinamento</Heading>
      <VStack alignItems={"center"} bg={"#282B38"} p="3" borderRadius={7}>
        <Heading size={12}>Informações do Treinamento</Heading>      
        <Flex align={"center"} justifyContent={"space-between"} gap="1.5rem">
          <Image src='gibbresh.png' fallbackSrc='https://via.placeholder.com/90' borderRadius={7} />
          <Input 
            value={tema}
            onChange={setTema}
            placeholder='Tema' 
            mx="auto"/>
          <Input 
            value={categoria}
            onChange={setCategoria}
            placeholder='Categoria' 
            mx="auto" />
          <Input 
            value={subcategoria}
            onChange={setSubcategoria}
            placeholder='Subcategoria' 
            mx="auto"/>
          <Input 
            value={identificacao}
            onChange={setIdentificacao}
            placeholder='Identificação' 
            mx="auto"/>
        </Flex>
          <Flex alignSelf={"flex-end"}>
            <Button bg="#3C485A" color={"white"} onClick={enviarParaAPI}>Criar Base</Button>
          </Flex>
      </VStack>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} >
        <GridItem colSpan={1} bg={"#282B38"} h="30rem" w="33rem" p={5}>
          <Heading as="h3" size="sm" mb="0.2rem">Subtópico:</Heading>
          <Flex  mb={"1rem"}>
            <Select placeholder='Selecione Subtópico'spacing={3} icon={<ChevronDownIcon />} bg="white" color="black">
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <Button ml="5"bg="#3C485A" color={"white"}>Criar</Button>
          </Flex>
          <Textarea placeholder='Here is a sample placeholder' size="lg"  bg="white" minH="340px" color="black"/>
        </GridItem>
        <GridItem colSpan={1} bg={"#282B38"} p={5}>
        <Heading as="h3" size="sm" mb="0.5rem">Exercícios:</Heading>
          <Textarea placeholder='Here is a sample placeholder' size="lg"  bg="white" minH="390px" color="black"/>
        </GridItem>
      </Grid>

    </Flex>
  );
}

export default Treinamento;