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
        mb={5}
        w='23rem'
        background="var(--background-card)"
      >
        <Image
          borderRadius={5}
          objectFit="cover"
          w="5rem"
          h="5rem"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgIcon)}`}
          mr={isSmOrMd ? 0 : 4}
          style={{ borderRadius: '5' }}
        />
        <Stack
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
            bg="#0880A2" color="white"
            size={isSmOrMd ? "md" : "lg"}
            fontSize={isSmOrMd ? "0.5rem" : "1rem"}
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
            bg="#0880A2" color="white"
            variant="solid"
            size={isSmOrMd ? "md" : "lg"}
            fontSize={isSmOrMd ? "0.5rem" : "1rem"}
            fontWeight="bold"
            onClick={() => {
              onOpen();
            }}
          >
            Detalhes
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent style={{background:'var(--background-menu)'}}>
              <ModalHeader>Detalhes do treinamento</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {obj.topics.map((item, index) => {
                  return (
                    <div key={index} >
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