import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Flex,
  AlertIcon,
  AlertTitle,
  Select,
  VStack,
  IconButton,
  Kbd,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
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
import { AddIcon } from "@chakra-ui/icons";

function Treinamento() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [value, setValue] = React.useState('')

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }


  return (
    <Flex maxW='vw' mx="auto" direction={"column"} gap="4rem" p={"1rem"}>
      <Heading>Criar novo Treinamento</Heading>
      <VStack alignItems={"center"} bg={"#3C485A"} p="4" gap="2rem" borderRadius={7}>
        <Heading size={12}>Configuração</Heading>      
        <Select placeholder='Select option'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Flex direction="row" p={0} w="100%" justifyContent="space-between" align={"center"}>
        <IconButton aria-label='Add to friends' icon={<AddIcon />} onClick={onOpen}/>
          <Button mb={"0.5rem"}
          sx={{...styles.buttonEnviar}}>
            Salvar Alterações
          </Button>
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
        <ModalContent bg="#3C485A" color="white">
          <ModalHeader>Nome_Configuração_Atual</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Tabs isFitted variant='enclosed'>
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
                  bg="white"
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="2rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  bg="white" 
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input final'
                  size='md'
                />
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  bg="white"
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="2rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  bg="white" 
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input final'
                  size='md'
                />
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  bg="white"
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="2rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  bg="white" 
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input final'
                  size='md'
                />
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  bg="white"
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="2rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  bg="white" 
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input final'
                  size='md'
                />
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  bg="white"
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="2rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  bg="white" 
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input final'
                  size='md'
                />
              </TabPanel>
              <TabPanel >
                <Text mb='8px'>Input Inicial</Text>
                <Textarea
                  bg="white"
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input inicial'
                  size='md'
                  mb="2rem"
                />
                <Text mb='8px'>Input Final</Text>
                <Textarea
                  bg="white" 
                  value={value}
                  onChange={handleInputChange}
                  placeholder='Digite o input final'
                  size='md'
                />
              </TabPanel>
            </TabPanels>
          </Tabs>

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Treinamento;