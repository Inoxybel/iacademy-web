import {
    Box,
    Button,
    Card,
    Flex,
    Image,
    Progress,
    Stack,
    Text
} from '@chakra-ui/react';
import React from 'react';

import useDasboard from './UseDasboard';

function salvaIdMemoria(chave, valor) {
  if (localStorage.getItem(chave) !== null) {
    localStorage.removeItem(chave);
  }
  localStorage.setItem(chave, valor);
}



const CardComponentCursoIniciado = ({ curso }) => {
    const { isSmOrMd, RedirecionaParaConteudoPorIdSumarioMatriculado } =useDasboard();
 
     return (
      <Card
        flexDirection="row"
        overflow="hidden"
        bg="#262734"
        w='20rem'
        color="white"
        p={isSmOrMd ? 1 : 2}
      >
        <Image
          objectFit="cover"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(curso.icon)}`}
          bg="white"
          borderRadius="5"
          alignSelf={'center'}
          w="5rem"
          h="5rem"
          mr="13px"
        />
  
        <Stack flexDir="column" justifyContent="space-between">
          <Flex justifyContent="space-between" gap='10px' flexDir={isSmOrMd ? "column" : "row"}>
            <Flex flexDir="column" >
              <Text fontSize="13px" fontWeight="bold" mb={3}>
                {curso.theme}
              </Text>
              <Box
                display="flex"
                flexDir="row"
                alignItems={isSmOrMd ? "flex-start" : "center"}
                justifyContent={isSmOrMd ? "flex-start" : "center"}
              >
                <Text fontSize="11px">{curso.subcategory} - {curso.category}</Text> 
              </Box>
            </Flex>
  
            <Button
              ml={isSmOrMd ? "0" : "5rem"}
              mr={isSmOrMd ? "10" : "0"}
              p={2}
              variant="solid"
              colorScheme="#0880A2;"
              w='90%'
              size={isSmOrMd ? "sm" : "md"}
              fontSize={isSmOrMd ? 11 : 13}
              onClick={() => {
                salvaIdMemoria("id_sumario",curso.id)
                RedirecionaParaConteudoPorIdSumarioMatriculado(curso.id);
              }}
            >
              Continuar de onde parou
            </Button>
          </Flex>
          <Flex alignItems="center" gap="10px" justifyContent="space-between">
            <Text fontSize="10px">{0}%</Text>
  
            <Progress
              colorScheme="whiteAlpha"
              size="md"
              h="2px"
              value={0}
              flex="1"
              mr={2}
              bg="grey"
            />
          </Flex>
        </Stack>
      </Card>
    );
  };


  export default CardComponentCursoIniciado;