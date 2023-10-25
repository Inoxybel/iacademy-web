import React from 'react'

import { Button, FormControl, FormLabel, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Switch, useDisclosure } from '@chakra-ui/react';
import { BsDownload } from 'react-icons/bs';

export default function () {

  const stylesButton = {
    height: '2rem',
    width: '2rem',
    background: "none",
    color: "var(--primary-white)",
    cursor: 'pointer',
    _hover: {
      color: 'var(--background-button)'
    }
  }


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
            <Button size='sm' colorScheme='green' onClick={onClose}>Sim</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}