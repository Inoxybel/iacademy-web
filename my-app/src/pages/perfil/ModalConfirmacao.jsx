import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ErroFormulario from './ErroFormulario';


const ModalConfirmacao = ({ isOpen, cancelRef, onClose, state, dispatch, LISTA_ATUALIZAR, LIMPAR_SENHA, SENHA_CONFIRMAR, pegarUsuarioPorIdController, atualizarUsuarioPorIdController }) => {
  const toast = useToast()
  const [isError,setErro] = useState(false)
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="#2F3142" color='white'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Atualizar cadastro
            </AlertDialogHeader>

            <AlertDialogBody>
            {isError && (<ErroFormulario error="Senha incorreta. Tente novamente."/>)}
              Insira sua senha para confirmar a atualização.
              <Input
                bg='white'
                color='black'
                type="password"
                required={true}
                onChange={(e)=>{
                  setErro(false)
                  dispatch({
                    type:SENHA_CONFIRMAR,payload:{valor:e.target.value}
                  })
                }}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={()=>{
                 dispatch({type: LIMPAR_SENHA,payload:{}})
                onClose()
              }}>
                Cancelar
              </Button>
              <Button colorScheme='blue' 
              isDisabled={state.formulario.password===""?true:false}
              onClick={async ()=>{
                
                const obj = {
                  name: state.formulario.name,
                  email: state.formulario.email,
                  cpf: state.formulario.cpf,
                  CompanyRef:state.formulario.companyRef,
                  password: state.formulario.password
                }
               
                const response =await atualizarUsuarioPorIdController(state.formulario.id,obj);
              
                if(response.result==="ATUALIZADO"){
                 onClose()
                 toast({
                  title: 'Perfil atualizado.',
                  description: "Seus dados foram atualizados!",
                  status: 'success',
                  position:'top',
                  duration: 9000,
                  isClosable: true,
                })
                } else if(response.result === "Invalid credentials."){
                  setErro(true)
                }else{
                  alert("Dados inválidos")
                }
                
              } } ml={3}>
                Atualizar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}


export default ModalConfirmacao