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
import Cookies from "universal-cookie";

const cookies = new Cookies();
import useDasboard from './UseDasboard';

function salvaIdMemoria(chave, valor) {
  if (localStorage.getItem(chave) !== null) {
    localStorage.removeItem(chave);
  }
  localStorage.setItem(chave, valor);
}

function verificarTopicoAtualExibe (){
  var topicoAtual = cookies.get("topico_selecionado")
  var conteudoOuExercicio = cookies.get("conteudoOuExercicioAtual")
  if(topicoAtual){

    if(conteudoOuExercicio==="conteudo" || undefined){
      return "Você está em " + topicoAtual.title
    }
    if(conteudoOuExercicio==="exercicio"){
      return "Você está em exercício de " + topicoAtual.title
    }
    else{
      return "Você está em " + topicoAtual.title
    }
  }
  else{
    return " "
  }

}



const CardComponentCursoIniciado = ({ curso }) => {
    const { isSmOrMd, RedirecionaParaConteudoPorIdSumarioMatriculado } =useDasboard();
 
     return (
      <Card
        flexDirection="row"
        overflow="hidden"
        w='20rem'
        background="var(--background-card)"

        p={isSmOrMd ? 1 : 2}
      >
        <Image
          objectFit="cover"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(curso.icon)}`}
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
              w='90%'
              bg="#0880A2" color="white"
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
            <Text fontSize="0.8rem" fontWeight='bold'>{verificarTopicoAtualExibe()}</Text>
          </Flex>
        </Stack>
      </Card>
    );
  };


  export default CardComponentCursoIniciado;