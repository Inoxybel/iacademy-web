import React from 'react'

import { Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Switch, useDisclosure, useMediaQuery } from '@chakra-ui/react';

export default function () {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const styles = {
    position: 'absolute',
    right: '0.5rem',
  }

  return (
    <>
      <Button sx={styles} size='xs' onClick={onOpen}>Configurar</Button>
      <Modal isOpen={isOpen} onClose={onClose} colorScheme='gray' size='xs' isCentered>
        <ModalOverlay />
        <ModalContent >
          <ModalBody>
            <FormControl>
              <FormControl>
                <FormLabel fontSize='0.85rem'>
                  Ativar pendencias
                  <Switch id='pendencias' colorScheme='green' ml='1rem' />
                </FormLabel>
              </FormControl>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button size='sm' colorScheme='green' onClick={onClose}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>


  )
}

