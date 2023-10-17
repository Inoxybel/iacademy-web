import {
  Box,
  Flex,
  Heading
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineClipboardCheck, HiOutlineClipboardList } from "react-icons/hi";
import estilos from "./MenuPendenciasEstilo";

const MenuPendenciasError = ({mensagem})=>{
    return(
    < Flex sx ={estilos.containerMenuPendencia } >
    <Flex sx={estilos.cabecalhoMenuPendencias}>
      <Heading>Pendências</Heading>
      <Box sx={estilos.informacoesCabecalhoMenu}>
        <Box sx={estilos.dadosCabecalhoMenu}>
          <HiOutlineClipboardList color="5762C0" />
          <p>0 pendências</p>
        </Box>
        <Box sx={estilos.dadosCabecalhoMenu}>
          <HiOutlineClipboardCheck color="5762C0" />
          <p>0 correções</p>
        </Box>
      </Box>
    </Flex>
        <p>{mensagem}</p>
    </Flex > 
    )
}

export default MenuPendenciasError;