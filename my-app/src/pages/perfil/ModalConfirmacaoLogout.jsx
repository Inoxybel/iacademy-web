import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    Button,
    AlertDialogOverlay,
  } from '@chakra-ui/react'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie"; 


const ModalConfirmacaoLogout = ({isOpen,cancelRef,onClose})=>{
    const cookies = new Cookies();
    const navigate = useNavigate();
    return(
        <>       
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Sair da sessão
            </AlertDialogHeader>

            <AlertDialogBody>
            Tem certeza que deseja sair ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='blue' onClick={
                ()=>{
                    cookies.remove('token');
                    cookies.remove('tokenExpiration');
                    cookies.remove('user');
                    navigate("/login")
                    onClose();
                    }
                } ml={3}>
                sair
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>   
        </>
    )
}

export default ModalConfirmacaoLogout;