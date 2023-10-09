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

export default function () {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    <>
      <Button onClick={onOpen} sx={styles.card}>
        <Box>
          <Text as={'h3'} sx={styles.subTitle2}>Desenvolvedores</Text>
          <Text as={'span'}> {'N de Acessos'} / {'N colaboradores'} </Text>
        </Box>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size='lg' colorScheme='gray'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>Acessos: {'n de acessos'}</Text>
            <Text>Em uso: {'n de acessos'}</Text>
            <Text>Colaboradores:</Text>
          </ModalHeader>
          <ModalBody display='flex' flexDirection='column'>
            <Flex justifyContent='space-between'>
              <Text>Colaborador 1</Text>
              <Button colorScheme='red' size='xs'>Remover Acesso</Button>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button >Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}