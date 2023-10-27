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
  ModalOverlay,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import usePerfil from "./UsePerfil";
import ErroFormulario from "../../Components/ErroFormulario";


const FormularioSenha = ({ initialRef, finalRef, isOpen, onClose, state, dispatch, SENHA_ALTERAR, LIMPAR_SENHA }) => {
  const {verificaSenhasCoincidem,verificarCamposVazios,atualizarSenhaPorIdController} = usePerfil();
  const [isError,setError] = useState({erros:[],state:false})
  const toast = useToast()

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}

      >
        <ModalOverlay />
        <ModalContent bg="#2F3142" color='white'>
          <ModalHeader>Altere sua senha</ModalHeader>
          
          <ModalCloseButton onClick={() => {
              setError({erros:[],state:false})
            dispatch({ type: LIMPAR_SENHA, payload: {} })
          }} />
          <ModalBody pb={6}>
          {isError.state&&
          (isError.erros.map((message)=>(<ErroFormulario error={message}/>)))}
            <FormControl mt={4}>
              <FormLabel>Senha atual</FormLabel>
              <Input
                bg='white'
                color='black'
                ref={initialRef}
                type="password"
                value={state.formularioSenha.senhaAtual}
                onChange={(e) => {
                  setError({erros:[],state:false})
                  dispatch({
                    type: SENHA_ALTERAR,
                    payload: { campo: 'senhaAtual', valor: e.target.value }
                  })
                }} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Nova senha</FormLabel>
              <Input
                bg='white'
                color='black'
                type="password"
                value={state.formularioSenha.novaSenha}
                onChange={(e) => {
                  setError({erros:[],state:false})
                  dispatch({
                    type: SENHA_ALTERAR,
                    payload: { campo: 'novaSenha', valor: e.target.value }
                  })
                }} />
            </FormControl>
            <FormControl mt={4} >
              <FormLabel>Confirmação da nova senha</FormLabel>
              <Input
                bg='white'
                color='black'
                type="password"
                value={state.formularioSenha.novaSenhaConfirmar}
                onChange={(e) => {
                  setError({erros:[],state:false})
                  dispatch({
                    type: SENHA_ALTERAR,
                    payload: { campo: 'novaSenhaConfirmar', valor: e.target.value }
                  })
                }} />

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => {
              onClose()
              setError({erros:[],state:false})
              dispatch({ type: LIMPAR_SENHA, payload: {} })
            }}
            mr={3}
            >Cancelar</Button>
            <Button 
            colorScheme='blue' 
            mr={3} 
            isDisabled={verificarCamposVazios(state.formularioSenha.senhaAtual,state.formularioSenha.novaSenha,state.formularioSenha.novaSenhaConfirmar)}
            onClick={async () => {
              const verificacaoSenha =  verificaSenhasCoincidem(state.formularioSenha.novaSenha,state.formularioSenha.novaSenhaConfirmar)
              if(verificacaoSenha){
                const dados = {
                  email:state.formulario.email,
                  oldPassword:state.formularioSenha.senhaAtual,
                  newPassword:state.formularioSenha.novaSenha,
                  confirmPassword:state.formularioSenha.novaSenhaConfirmar
                }

                const response = await atualizarSenhaPorIdController(state.formulario.id,dados)
               
                if(response.result==="ATUALIZADO"){
                  dispatch({ type: LIMPAR_SENHA, payload: {} })
                  setError({erros:[],state:false})
                  onClose()
                  toast({
                   title: 'Senha atualizada.',
                   description: "Sua senha foi atualizada com sucesso!",
                   status: 'success',
                   position:'top',
                   duration: 9000,
                   isClosable: true,
                 })
                 }else if(response.dados === "Review informed credentials."){
                  setError({erros:["Wrong password"],state:true})
                 }else{
                  setError({erros:response.dados.NewPassword,state:true})
                 }
                 
              }else
                setError({erros:["Passwords do not match"],state:true})
            }}>
              Atualizar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FormularioSenha