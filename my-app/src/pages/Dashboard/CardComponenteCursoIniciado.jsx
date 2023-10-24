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


const CardComponentCursoIniciado = ({ curso }) => {
    const { isSmOrMd, RedirecionaParaConteudoPorIdSumarioMatriculado } =useDasboard;
  
     return (
      <Card
        flexDirection="row"
        overflow="hidden"
        bg="#262734"
        color="white"
        p={isSmOrMd ? 1 : 2}
      >
        <Image
          objectFit="cover"
          src=""
          bg="white"
          borderRadius="5"
          alignSelf={'center'}
          h="110px"
          w="110px"
          mr="13px"
        />
  
        <Stack flexDir="column" justifyContent="space-between">
          <Flex justifyContent="space-between" flexDir={isSmOrMd ? "column" : "row"}>
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
                <Text fontSize="11px">{curso.subcategory}</Text> - <Text fontSize="11px">{curso.category}</Text>
              </Box>
            </Flex>
  
            <Button
              ml={isSmOrMd ? "0" : "5rem"}
              mr={isSmOrMd ? "10" : "0"}
              p={2}
              variant="solid"
              colorScheme="#0880A2;"
              size={isSmOrMd ? "sm" : "md"}
              fontSize={isSmOrMd ? 11 : 13}
              onClick={() => {
                RedirecionaParaConteudoPorIdSumarioMatriculado(curso.id);
              }}
            >
              Continuar de onde parou
            </Button>
          </Flex>
          <Flex alignItems="center" gap="10px" justifyContent="space-between">
            <Text fontSize="10px">{20}%</Text>
  
            <Progress
              colorScheme="whiteAlpha"
              size="md"
              h="2px"
              value={20}
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