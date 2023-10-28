import {
    Flex,
    IconButton,
    Skeleton,
    Text,
    Tooltip
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { HiOutlineZoomIn, HiZoomOut } from "react-icons/hi";
import styled from 'styled-components';
import ConteudoItem from './ConteudoItem';
import { useGeralContext } from '../../services/context/ContextProvider';


const EstiloConteudoPrincipal = styled.div`
    padding:1rem;
/* Adiciona uma barra de rolagem quando o conteúdo for maior que o contêiner */
  code {
    max-width: 100%;
  }
  pre{
    max-width: '100%';
} 
h3{
    font-weight: bold;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 5px;
    }
  
  h2 {
    font-weight: bold;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
    margin-top: 3%;
  }

  p {
    margin-bottom: 16px;
    margin-left: 5px;
    color: #EDEDED;
    word-wrap: break-word; /* Quebra palavras longas em várias linhas */
  }
  
  h1 {
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 3%;
    margin-top: 3%;
  }

  ol {
    margin-left: 25px;
  }
  
`;



const ConteudoBody = () => {


    function zoom() {
        setFonte((prevFonte) => prevFonte + 2);
    }
    function diminuir() {
        setFonte((prevFonte) => prevFonte - 2);
    }

    
    const [fonte, setFonte] = useState(15);
    const { conteudoSelecionado} = useGeralContext();


    const valor = conteudoSelecionado ? conteudoSelecionado.body.contents : undefined;
    const [conteudoRenderizadoAtual, setConteudoRenderizadoAtual] = useState(valor);
 
    useEffect(() => {
        if (conteudoSelecionado) {
            const novoValor = conteudoSelecionado.body.contents;
            setConteudoRenderizadoAtual(novoValor);
        }
    }, [conteudoSelecionado]);


    if (!conteudoSelecionado) {
        
        return (
            <Flex flex={3} h='100%' flexDir='column' p='10px'>
                <Skeleton mb='20px' h='10%' p='10px' />
                <Skeleton h='90%' p='10px' />
            </Flex>

        )

    } else {
        return (
            <Flex className='conteudo' fontSize={fonte} w='100%' flexDir='column' bg='#474859' minH='100vh'>
  <Flex className='cabecalho' bg='#262734' minH='100px' alignItems="center" justifyContent="center" p='10px'>
    <Text textAlign="center" color='white' fontWeight='bold' ml={['0.5rem', '1.5rem']} fontSize={['16px', '26px']} >{conteudoSelecionado.title}</Text>
  </Flex>
  
  <Flex className='corpoConteudo' flexWrap='wrap' flexDir='column' m='0.5rem' alignItems='center'>
    {conteudoRenderizadoAtual ? (
      <EstiloConteudoPrincipal>
        {conteudoRenderizadoAtual.map((obj, index) => {
          return <ConteudoItem key={index} conteudo={obj} idConteudo={conteudoSelecionado.id} />;
        })}
      </EstiloConteudoPrincipal>
    ) : (
      <></>
    )}
  </Flex>

  <Flex
    style={{
      position: "fixed",
      right: "0",
      bottom: "0",
      transform: "translateY(-50%)",
      zIndex: "999",
      opacity: "50%"
    }}
  >
    <Tooltip label='Aumentar zoom' fontSize='md'>
      <IconButton
        bg="none"
        _hover="none"
        color="white"
        size="lg"
        onClick={zoom}
        icon={<HiOutlineZoomIn />}
      />
    </Tooltip>
    <Tooltip label='Diminuir zoom' fontSize='md'>
      <IconButton
        bg="none"
        _hover="none"
        color="white"
        size="lg"
        onClick={diminuir}
        icon={<HiZoomOut />}
      />
    </Tooltip>
  </Flex>
       </Flex>

        )
    }
}

export default ConteudoBody;

