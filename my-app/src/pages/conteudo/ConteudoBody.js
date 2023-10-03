import { ViewIcon } from '@chakra-ui/icons';
import {
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Skeleton,
    Text,
    Button,
    Box,
    Tooltip,
    useToast,
    Link
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { useGeralContext } from '../context/ContextProvider'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styled from 'styled-components';
import { HiZoomOut } from "react-icons/hi";
import { HiOutlineZoomIn } from "react-icons/hi";
import { MdCheckCircle } from "react-icons/md"
import ConteudoItem from './ConteudoItem';

//Isso estiliza o conteudo markdown. Linhas, titulos, topicos
const EstiloConteudoPrincipal = styled.div`
    
/* Adiciona uma barra de rolagem quando o conteúdo for maior que o contêiner */
  code {
    max-width: 100%;
  }
  /* pre{
    max-width: 55rem;
} */
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

    //Funções de auxílio para zoom
    function zoom() {
        setFonte((prevFonte) => prevFonte + 2);
    }
    function diminuir() {
        setFonte((prevFonte) => prevFonte - 2);
    }

    
    const [fonte, setFonte] = useState(15);
    const { conteudoSelecionado} = useGeralContext();


    //Verifica se conteudo já está dusponível, e pega a descrição do conteudo com menor data, que pelo padrão da api é o conteudo mais recente
    // const valor = conteudoSelecionado ? conteudoSelecionado.body.contents[0].subcontentHistory.find((obj) => obj.disabledDate === "0001-01-01T00:00:00Z") : undefined;
    const valor = conteudoSelecionado ? conteudoSelecionado.body.contents : undefined;
    const [conteudoRenderizadoAtual, setConteudoRenderizadoAtual] = useState(valor);
    // Use um useEffect para rastrear mudanças em conteudoSelecionado e atualizar conteudoRenderizadoAtual
    useEffect(() => {
        if (conteudoSelecionado) {
            const novoValor = conteudoSelecionado.body.contents;
            setConteudoRenderizadoAtual(novoValor);
        }
    }, [conteudoSelecionado]);

    //Conteudo que será renderizado na tela
  

    //Skeletom para efeito na tela enquanto conteudo nao atualiza
    if (!conteudoSelecionado) {
        return (
            <Flex flex={3} h='100%' flexDir='column' p='10px'>
                <Skeleton mb='20px' h='10%' p='10px' />
                <Skeleton h='90%' p='10px' />
            </Flex>

        )

    } else {
        return (
            <Flex className='conteudo' fontSize={fonte} flexDir='column' h='100%' bg='#474859'>
                <Flex className='cabecalho' bg='#262734' minH='100px' alignItems="center" justifyContent="center" p='10px'>
                    <Text textAlign="center" fontWeight={'bold'} ml="1.5rem" fontSize={['16px', '16px', '16px', '26px']} >{conteudoSelecionado.title}</Text>
                </Flex>
                <Flex className='corpoConteudo' flexWrap='wrap' flexDir='column' m='10px' h='100%' alignItems='center'>
                    {conteudoRenderizadoAtual ? (
                        <EstiloConteudoPrincipal>
                            {
                            conteudoRenderizadoAtual.map((obj, index) => {
                                const  i = index;
                                return <ConteudoItem position={i} key={index} conteudo={obj} idConteudo={conteudoSelecionado.id} />;
                            })}
                        </EstiloConteudoPrincipal>
                    ) : (
                        <div>Ainda não possui conteúdo</div>
                    )}
                </Flex>
                {/*Zomm */}
                <Flex
                    style={{
                        position: "fixed",
                        right: "0",
                        bottom: "0",
                        transform: "translateY(-50%)",
                        zIndex: "999",
                        opacity: "50%"
                    }}>
                    <Tooltip label='Aumentar zoom' fontSize='md'>
                        <IconButton
                            bg="none"
                            _hover="none"
                            color="white"
                            size="lg"
                            onClick={zoom}
                            icon={< HiOutlineZoomIn />} />
                    </Tooltip>
                    <Tooltip label='Diminuir zoom' fontSize='md'>
                        <IconButton
                            bg="none"
                            _hover="none"
                            color="white"
                            size="lg"
                            onClick={diminuir}
                            icon={<HiZoomOut />} />
                    </Tooltip>
                </Flex>
            </Flex>
        )
    }
}

export default ConteudoBody;

