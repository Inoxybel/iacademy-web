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

export default function () {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // PUT - RECUPERAR DADOS DA EMPRESA E ACESSAR A LISTA DE GRUPOS ADICIONAR OU REMOVER COLABORADOR

  // const api = axios.create({ baseURL: "https://iacademy-company-v1-api.azurewebsites.net/api" })

  // const { isLoading, error, data } = useQuery('companyData', getCompanyById)

  // if (isLoading) return 'Loading...'

  // if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <Button size='sm' colorScheme='green' onClick={onOpen}>Adicionar Colaborador +</Button>
      <Modal isOpen={isOpen} onClose={onClose} size='lg' colorScheme='gray'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Selecionar Colaboradores:</FormLabel>
              <Stack>
                {/* Listar colaboradores do CNPJ e condicao includes (nao listar oque ja esta no grupo)*/}
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