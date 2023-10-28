import React from 'react'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

import { Button, FormControl, FormLabel, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Switch, useDisclosure } from '@chakra-ui/react';
import { BsDownload } from 'react-icons/bs';

export default function () {

  const stylesButton = {
    height: '2rem',
    width: '2rem',
    background: "none",
    color: "var(--primary-fontColor)",
    cursor: 'pointer',
    _hover: {
      color: 'var(--background-color)',
    }
  }

  const cookies = new Cookies()
  const navigate = useNavigate()

  const handleLogout = () => {
    cookies.remove('token');
    cookies.remove('token');
    cookies.remove('tokenExpiration');
    onClose();
    navigate('/empresa/login');
  };

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Icon onClick={onOpen} as={BsDownload} sx={stylesButton} transform='rotate(90deg)' />
      <Modal isOpen={isOpen} onClose={onClose} colorScheme='gray' size='xs' isCentered>
        <ModalOverlay />
        <ModalContent >
          <ModalBody>
            <FormControl>
              <FormControl>
                <FormLabel fontSize='1.5rem'>
                  Deseja realmente sair?
                </FormLabel>
              </FormControl>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' mr={3} onClick={onClose}>
              Nao
            </Button>
            <Button size='sm' colorScheme='green' onClick={handleLogout}>Sim</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}