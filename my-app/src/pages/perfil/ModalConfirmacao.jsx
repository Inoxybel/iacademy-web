import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import usePerfil from './UsePerfil';


const ModalConfirmacao = ({ isOpen, cancelRef, onClose }) => {
  const { state, dispatch,LISTA_ATUALIZAR,LIMPAR_SENHA, SENHA_CONFIRMAR,pegarUsuarioPorIdController,atualizarUsuarioPorIdController} = usePerfil();
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
              Insira sua senha para confirmar a atualização.
              <Input
                bg='white'
                color='black'
                type="password"
                required={true}
                onChange={(e)=>{
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
                console.log(response)
                if(response===true){
                  const user =await pegarUsuarioPorIdController(state.formulario.id)
                  dispatch({type:LISTA_ATUALIZAR,payload:{
                    name:user.name,
                    companyRef:user.companyRef,
                    email:user.email
                  }})
                  onClose()
                  window.location.reload()
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