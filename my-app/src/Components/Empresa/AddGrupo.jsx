import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { getCompanyById } from '../../services/Fetchers/FetchersCompany';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
} from '@chakra-ui/react'
import Cookies from 'universal-cookie';

export default function () {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const cookies = new Cookies();

  const token = cookies.get('token');

  const jwtPayload = JSON.parse(atob(token.split('.')[1]));
  const companyId = jwtPayload.Id;

  const { isLoading, error, data } = useQuery('companyData', getCompanyById(companyId))

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data.data)

  return (
    <>
      <Button size='sm' colorScheme='green' onClick={onOpen}>Adicionar novo Grupo</Button>
      <Modal isOpen={isOpen} onClose={onClose} size='lg' colorScheme='gray'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Nome do Grupo</FormLabel>
              <Input mb='1rem' />
              <FormLabel>Selecionar Colaboradores:</FormLabel>
              <Stack>
                {/* Chamada de API para listar colaboradores relacionados ao cnpj*/}
                <Checkbox>Colaborador 1</Checkbox>
                <Checkbox>Colaborador 2</Checkbox>
                <Checkbox>Colaborador 3</Checkbox>
              </Stack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='green'>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}