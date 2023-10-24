import {
    Button,
    Card,
    CardBody,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import useDasboard from './UseDasboard';


const CardComponentCursosDisponiveis = ({ obj }) => {

    const {
      isSmOrMd,
      matricularEmCursos,
      RedirecionaParaConteudoPorIdSumarioMatriculado,
    } = useDasboard();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const svgIcon = obj.icon;
    return (
      <Card
        flexDir={'row'}
        bg="#1A1922"
        mb={5}
  
      >
        <Image
          borderRadius={5}
          objectFit="fill"
          w="130px"
          h="130px"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgIcon)}`}
          mr={isSmOrMd ? 0 : 4}
          bg="white"
          style={{ borderRadius: '5' }}
        />
        <Stack
          bg="#262734"
          color="white"
          direction="row"
          overflow={"hidden"}
          borderRadius={5}
          p={isSmOrMd ? 2 : 2}
        >
          <CardBody p={2}>
            <Heading fontSize="13px">{obj.theme}</Heading>
            <Text py="2" fontSize={isSmOrMd ? "10px" : "13px"} whiteSpace={'nowrap'}>
              {obj.category}-{obj.subcategory}
            </Text>
          </CardBody>
  
          <Button
            mr={"1rem"}
            alignSelf={"flex-end"}
            variant="solid"
            bg="#0880A2"
            colorScheme="blue"
            size={isSmOrMd ? "md" : "lg"}
            fontSize={isSmOrMd ? 11 : 13}
            fontWeight="bold"
            onClick={async () => {
              try {
                const idSumario = await matricularEmCursos(obj.id);
                RedirecionaParaConteudoPorIdSumarioMatriculado(idSumario);
              } catch (error) {
                console.error('Erro ao matricular e redirecionar:', error);
              }
            }}
          >
            Começar
          </Button>
  
          <Button
            alignSelf={"flex-end"}
            variant="solid"
            bg="#0880A2"
            colorScheme="blue"
            size={isSmOrMd ? "md" : "lg"}
            fontSize={isSmOrMd ? 11 : 13}
            fontWeight="bold"
            onClick={() => {
              onOpen();
            }}
          >
            ver detalhes
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent color="white" bg="#262734">
              <ModalHeader>Detalhes do treinamento</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {obj.topics.map((item, index) => {
                  return (
                    <div key={index}>
                      <Text fontSize="15px" fontWeight="bold">
                        {item.index}-{item.title}
                      </Text>
                      <Text ml="5px" fontStyle="italic">
                        {item.description}
                      </Text>
                    </div>
                  );
                })}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Stack>
      </Card>
    );
  };

  

  export default CardComponentCursosDisponiveis;