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
} from "@chakra-ui/react";
import styles from "../styles.js";
import Menu from "../Menu";
import axios from 'axios';

function Treinamento() {
  return (
    <Flex maxW='vw' mx="auto" direction={"column"} gap="4rem" p={"1rem"}>
      <Heading>Criar novo Treinamento</Heading>
      <VStack alignItems={"center"} bg={"#3C485A"} p="4" gap="2rem" borderRadius={5}>
      <Heading size={12}>Configuração</Heading>
        <Select placeholder='Select option'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Flex direction="row" p={0} w="100%" justifyContent="space-between">
          <Button
          sx={{...styles.buttonEnviar}}>
            X
          </Button>
          <Button
          sx={{...styles.buttonEnviar}}>
            Salvar Alterações
          </Button>
        </Flex>
      </VStack>
      <VStack alignItems={"center"} bg={"#3C485A"} p="4" gap="2rem" borderRadius={5}>
      <Heading size={12}>Configuração</Heading>
        <Select placeholder='Select option'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Flex direction="row" p={0} w="100%" justifyContent="space-between">
          <Button
          sx={{...styles.buttonEnviar}}>
            X
          </Button>
          <Button
          sx={{...styles.buttonEnviar}}>
            Salvar Alterações
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
}

export default Treinamento;