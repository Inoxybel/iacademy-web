import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react'
import AddColaborador from './AddColaborador'
import data from "../../../json/grupos.json"

export default function () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const grupos = data.Items

  const styles = {
    card: {
      backgroundColor: 'var(--background-card)',
      color: 'var(--primary-white)',
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
      color: 'var(--primary-color)'
    }
  }

  return (
    <Flex sx={{ flexDirection: 'column', gap: '1rem' }}>
      {
        grupos.map((elem, index) =>
          <>
            <Button onClick={onOpen} sx={styles.card}>
              <Box>
                <Text as={'h3'} sx={styles.subTitle2}>{elem.GroupName}</Text>
                <Text as={'span'}> {elem.TotalAcess} Acessos / {elem.Employees.length} Colaboradores</Text>
              </Box>
            </Button >
            <Modal isOpen={isOpen} onClose={onClose} size='lg' colorScheme='gray'>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Text>Acessos: {elem.TotalAcess}</Text>
                  <Text>Em uso: {elem.Employees.length}</Text>
                  <Text>Colaboradores:</Text>
                </ModalHeader>
                <ModalBody display='flex' flexDirection='column' gap='0.5rem'>
                  {
                    elem.Employees.map((elem, index) =>
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
                  <Button m={3} onClick={onClose}>
                    Fechar
                  </Button>
                  <Button >Salvar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      }
    </Flex >
  )
}