import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Image,
  VStack
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineClipboardCheck, HiOutlineClipboardList } from "react-icons/hi";
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import csharp from '../../assets/csharp_logo.png';
import { pegarExerciciosPendentes } from "../../services/Fetchers/FetchersApp";
import estilos from "./MenuPendenciasEstilo";
import MenuPendenciasLoading from "./MenuPendenciasLoading";
import MenuPendenciasError from "./MenuPendenciaError";
import ItemPendencia from "./ItemPendencia";

function calcularTotalDeExerciciosPendentes(listaDeObjetos) {
  return listaDeObjetos
    .filter(objeto => objeto.status === "WaitingToDo")
    .reduce((total, objeto) => total + objeto.exercises.length, 0);
}

function calcularTotalFeedbacks(listaDeObjetos) {
  return listaDeObjetos.filter(objeto => objeto.status === "Finished")
  .reduce((total, objeto) => total + objeto.exercises.length, 0);
}

const MenuPendencia = ({ onSetExercicioPendente }) => {
  const { data, error, isLoading } = useQuery('exerciciosPendentes', pegarExerciciosPendentes);
  const navigate = useNavigate();

  if (isLoading) {
    return(
      <MenuPendenciasLoading/>
    )
  }

  if (error) {
    if (error.response.status === 401) {
      navigate('/')
    } else if (error.response.status === 400) {
      return(
       <MenuPendenciasError mensagem='Ocorreu algum erro inesperado,tente novamente em alguns minutos...'/>
      )
    }
    else if (error.response.status === 404) {
      return(
        <MenuPendenciasError mensagem='Você ainda não possui exercícios pendêntes...'/>
      )
    }
  }

  if(data){
   return(
    <Flex sx={estilos.containerMenuPendencia}>
    <Flex sx={estilos.cabecalhoMenuPendencias}>
      <Heading>Pendências</Heading>
      <Box sx={estilos.informacoesCabecalhoMenu}>
        <Box sx={estilos.dadosCabecalhoMenu}>
          <HiOutlineClipboardList color="5762C0" />
          <p>{calcularTotalDeExerciciosPendentes(data.data)} pendências</p>
        </Box>
        <Box sx={estilos.dadosCabecalhoMenu}>
          <HiOutlineClipboardCheck color="5762C0" />
          <p>{calcularTotalFeedbacks(data.data)} correções</p>
        </Box>
      </Box>
    </Flex>
    <Accordion allowMultiple>
      <AccordionItem w='20rem'>
        <AccordionButton>
          <Box w='100%' display='flex' flexDir='row' alignItems='center' justifyContent='space-around'>
            <Image w='2rem' src={csharp} />
            <h1>Curso de c# básico</h1>
            <AccordionIcon />
          </Box>
        </AccordionButton>
        <AccordionPanel pb={1}>
          <VStack>
            {data.data.map((obj) => (
              <ItemPendencia obj={obj} onSetExercicioPendente={onSetExercicioPendente} />
            ))}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Flex>
   )
  }
}


export default MenuPendencia;