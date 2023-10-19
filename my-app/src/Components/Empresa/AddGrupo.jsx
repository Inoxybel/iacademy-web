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