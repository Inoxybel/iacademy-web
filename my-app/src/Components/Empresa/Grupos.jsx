import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react'
import AddColaborador from './AddColaborador'
import { useState } from 'react'
import { getCompanyById } from '../../services/Fetchers/FetchersCompany'
import { useQuery } from 'react-query'
import Cookies from 'universal-cookie'

export default function ({ training }) {

  const [group, setGroup] = useState()

  const close = () => {
    setGroup()
  }

  const styles = {
    card: {
      backgroundColor: 'var(--background-card)',
      color: 'var(--primary-fontColor)',
      padding: '0.5rem',
      height: '5rem',
      borderRadius: '0.2rem',
      textAlign: 'center'
    },
    subTitle2: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      gridArea: '2 / 1 / 3 / 7',
    },
    modal: {
      backgroundColor: 'var(--background-form)',
    }
  }

  const cookies = new Cookies();

  const token = cookies.get('token');

  const jwtPayload = JSON.parse(atob(token.split('.')[1]));
  const companyId = jwtPayload.Id;

  const { isLoading, error, data } = useQuery('companyData', getCompanyById(companyId))

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  let companyGroups = data.groups

  return (

    <Flex sx={{ flexDirection: 'column', gap: '1rem' }}>
      {!companyGroups ? <Text sx={{ color: 'var(--primary-fontColor)' }}>Nao ha grupo de Colaboradores Vinculados a este Treinamento.</Text> : companyGroups.filter(elem => training ? training.GroupsId.includes(elem.id) : true).map((elem, index) =>
        <Box as='button' key={index} onClick={() => {
          setGroup(elem)
        }} sx={styles.card}>
          <Box>
            <Text as={'h3'} sx={styles.subTitle2}>{elem.GroupName}</Text>
            <Text as={'span'}> {elem.TotalAcess} Acessos / {elem.Employees.length} Colaboradores</Text>
          </Box>
        </Box >
      )}
      <Modal isOpen={Boolean(group)} onClose={close} size='lg' colorScheme='gray'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Acessos: {group?.TotalAcess}</Text>
            <Text>Em uso: {group?.Employees.length}</Text>
            <Text>Colaboradores:</Text>
          </ModalHeader>
          <ModalBody display='flex' flexDirection='column' gap='0.5rem'>
            {
              group?.Employees.map((elem, index) =>
                <Flex key={index} justifyContent='space-between'>
                  <Text>Nome: {elem.name}</Text>
                  <Text>CPF: {elem.cpf}</Text>
                  <Button colorScheme='red' size='xs'>Remover Acesso</Button>
                </Flex>
              )
            }
          </ModalBody>
          <ModalFooter>
            <AddColaborador />
            <Button m={3} onClick={close}>
              Fechar
            </Button>
            <Button >Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex >
  )
}