import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import React from "react";
import usePerfil from "./UsePerfil";
const FormularioSenha =({initialRef,finalRef,isOpen,onClose})=>{
      const {state,dispatch,SENHA_ALTERAR,LIMPAR_SENHA} = usePerfil();

    return(
        <>
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
     
      >
        <ModalOverlay />
        <ModalContent bg= "#2F3142" color='white'>
          <ModalHeader>Altere sua senha</ModalHeader>
          <ModalCloseButton  onClick={()=>{
              dispatch({type:LIMPAR_SENHA,payload:{}})
            }} />
          <ModalBody pb={6}>
          <FormControl  mt={4}>
              <FormLabel>Senha atual</FormLabel>
              <Input 
              bg='white'
              color='black' 
              ref={initialRef} 
              type="password"
              value={state.formularioSenha.senhaAtual}
              onChange={(e)=>{dispatch({
                type:SENHA_ALTERAR,
                payload:{campo:'senhaAtual',valor:e.target.value}
              })}} />
            </FormControl>
            <FormControl  mt={4}>
              <FormLabel>Nova senha</FormLabel>
              <Input 
              bg='white'
              color='black' 
              type="password"
              value={state.formularioSenha.novaSenha}
              onChange={(e)=>{dispatch({
                type:SENHA_ALTERAR,
                payload:{campo:'novaSenha',valor:e.target.value}
              })}} />
            </FormControl>
            <FormControl mt={4} >
              <FormLabel>Confirmação da nova senha</FormLabel>
              <Input 
              bg='white' 
              color='black' 
              type="password"
              value={state.formularioSenha.novaSenhaConfirmar} 
              onChange={(e)=>{dispatch({
                type:SENHA_ALTERAR,
                payload:{campo:'novaSenhaConfirmar',valor:e.target.value}
              })}}/>
             
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>{
              dispatch({type:LIMPAR_SENHA,payload:{}})
            }}>
              Save
            </Button>
            <Button onClick={()=>{
                onClose()
                dispatch({type:LIMPAR_SENHA,payload:{}})
             }}
            >Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}

export default FormularioSenha