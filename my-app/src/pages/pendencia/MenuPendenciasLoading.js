import {
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Heading,
    Skeleton
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineClipboardCheck, HiOutlineClipboardList } from "react-icons/hi";
import estilos from "./MenuPendenciasEstilo";

const MenuPendenciasLoading = ()=>{
    return(
        
    < Flex sx = { estilos.containerMenuPendencia } >
    <Flex sx={estilos.cabecalhoMenuPendencias}>
      <Heading>Pendências</Heading>
      <Box sx={estilos.informacoesCabecalhoMenu}>
        <Skeleton>
        <Box sx={estilos.dadosCabecalhoMenu}>
          <HiOutlineClipboardList color="5762C0" />
          <p> pendências</p>
        </Box>
        </Skeleton>
        <Skeleton>
        <Box sx={estilos.dadosCabecalhoMenu}>
          <HiOutlineClipboardCheck color="5762C0" />
          <p> correções</p>
        </Box>
        </Skeleton>
      </Box>
    </Flex>
    <Skeleton>
    <Accordion allowMultiple>
      <AccordionItem h='5rem' w='20rem'>
        <AccordionButton>
          <Box w='100%' display='flex' flexDir='row' alignItems='center' justifyContent='space-around'>
          </Box>
        </AccordionButton>
        <AccordionPanel pb={1}>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    </Skeleton>
    </Flex > 
    )
}


export default MenuPendenciasLoading;