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
import ErroFormulario from '../../Components/ErroFormulario';


const ModalConfirmacao = ({ isOpen, cancelRef, onClose, state, dispatch, LISTA_ATUALIZAR, LIMPAR_SENHA, SENHA_CONFIRMAR, pegarUsuarioPorIdController, atualizarUsuarioPorIdController }) => {
  const toast = useToast()
  const [isError, setError] = useState({ erros: [], state: false })

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
            {isError.state && (
  Object.keys(isError.erros).map((field, index) => (
    <div key={index}>
      {isError.erros[field].map((message, messageIndex) => (
        <ErroFormulario key={messageIndex} error={message} />
      ))}
    </div>
  ))
)}
              Insira sua senha para confirmar a atualização.
              <Input
                bg='white'
                color='black'
                type="password"
                required={true}
                onChange={(e) => {
                  setError({ erros: [], state: false })
                  dispatch({
                    type: SENHA_CONFIRMAR, payload: { valor: e.target.value }
                  })
                }}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => {
                dispatch({ type: LIMPAR_SENHA, payload: {} })
                setError({ erros: [], state: false })
                onClose()
              }}>
                Cancelar
              </Button>
              <Button colorScheme='blue'
                isDisabled={state.formulario.password === "" ? true : false}
                onClick={async () => {

                  const obj = {
                    name: state.formulario.name,
                    email: state.formulario.email,
                    CompanyRef: state.formulario.companyRef,
                    password: state.formulario.password
                  }

                  const response = await atualizarUsuarioPorIdController(state.formulario.id, obj);
                  console.log(response)
                  if (response.result === "ATUALIZADO") {
                    onClose()
                    toast({
                      title: 'Perfil atualizado.',
                      description: "Seus dados foram atualizados!",
                      status: 'success',
                      position: 'top',
                      duration: 9000,
                      isClosable: true,
                    })
                  }  else if(response.result==="ERRO" && response.dados==="Company not found.") {
                    alert("Company not found")
                  } else if (response.result === "ERRO") {
                    console.log(response.dados)
                    setError({ erros: response.dados, state: true })
                  }

                }} ml={3}>
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