import {
    Box,
    Flex,
    HStack,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useToast
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { MdCheckCircle } from "react-icons/md";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useGeralContext } from '../context/ContextProvider';
import { ViewIcon } from '@chakra-ui/icons';



const customRenderers = {
    code({ node, inline, className, children, ...props }) {
        if (!inline) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
                <SyntaxHighlighter
                    {...props}
                    language={match[1]}
                    style={oneDark}
                    PreTag="div"
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code {...props}>{children}</code>
            );
        }
        return <code {...props}>{children}</code>;
    },
    h1: 'h3'
};



const ConteudoItem = ({ position, conteudo, idConteudo }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [fonte, setFonte] = useState(15);
    const [conteudoAtualRenderizado, setConteudoAtualRenderizado] = useState();
    const [mostrarCabecalho, setMostrarCabecalho] = useState(true); // Estado para controlar a visibilidade do cabeçalho
    const { conteudoSelecionado, SolicitarAtualizaçãoConteudoId, SolicitarConteudoPorId } = useGeralContext();
    const toast = useToast();
    useEffect(() => {

    if (conteudoSelecionado) {
        
        const conteudoMaisRecente = conteudo.subcontentHistory.find((obj) => obj.disabledDate === "0001-01-01T00:00:00Z") ;
        console.log(conteudoMaisRecente)
        setConteudoAtualRenderizado(conteudoMaisRecente.content);
        // Verifique se o conteúdo começa com '##' e oculte o cabeçalho se for o caso
        if (conteudoMaisRecente.content.startsWith('##')) {
            setMostrarCabecalho(false);
        } else {
            setMostrarCabecalho(true);
        }
    }
}, [conteudoSelecionado, conteudo.subcontentHistory,setConteudoAtualRenderizado]);


return (
    <Flex flexDir='column'>
        {mostrarCabecalho&&(
                 <Flex className='cabecalho' margin='none' alignItems="center" justifyContent='flex-end'>
                 <HStack spacing={1} >
                     <Tooltip label='Atualizar conteudo' fontSize='md'>
                         <IconButton
                             bg="none"
                             _hover="none"
                             color='#70728C'
                             size="lg"
                             icon={<AiOutlineEdit style={{ width: '20px', height: '20px' }} />}
                             onClick={async () => {
                                 try {
                                     setIsUpdating(true);
                                     toast({
                                         title: "Atualização solicitada, aguarde...",
                                         status: "info",
                                         duration: 10000,
                                         isClosable: true
                                     });
                                     await SolicitarAtualizaçãoConteudoId(idConteudo, position);
                                     toast({
                                         title: "Seu conteúdo foi atualizado",
                                         status: "success",
                                         duration: 10000,
                                         isClosable: true,
                                         render: ({ onClose }) => (
                                             <Box bg='green' width='100%' color='white' justifyContent='space-around' display='flex' gap='10px' alignItems='center' p='15px' borderRadius='3px'>
                                                 <MdCheckCircle />
                                                 <Text>Conteúdo atualizado.</Text>
                                             </Box>
                                         ),
                                     });
                                     setIsUpdating(false);
                                 } catch (error) {
                                     console.error(error);
                                     toast({
                                         title: "Erro ao solicitar atualização",
                                         description: "Ocorreu um erro ao tentar solicitar a atualização.",
                                         status: "error",
                                         duration: 3000,
                                         isClosable: true,
                                     });
                                     setIsUpdating(false);
                                 }
                             }}
                         />
                     </Tooltip>
                     <Menu>
                         <Tooltip label='Histórico' fontSize='md'>
                             <MenuButton
                                 bg='none'
                                 _hover='none'
                                 as={IconButton}
                                 aria-label='Options'
                                 icon={<BiHistory color='#70728C' style={{ width: '20px', height: '20px' }} />}
                             />
                         </Tooltip>
                         <MenuList bg="#2F3142" p='10px' flexDir='row' justifyContent='flex-start]'>
                             {conteudo.subcontentHistory.map((obj, index) => (
                                 <MenuItem key={index} bg='#2F3142' _hover={{ bg: "#075E81" }} _active={{ bg: "#054B60" }} onClick={() => {
                                     setConteudoAtualRenderizado(obj.content);
                                 }}>
                                     <Flex flexDir='row' alignSelf='center' justifyContent='space-around' gap='30px'>
                                         <Text minW='70%'>{obj.content.slice(0, 20)}...</Text>
                                         <Box>
                                         {obj.disabledDate === '0001-01-01T00:00:00Z'   ? <Box><ViewIcon /></Box>
                                        : 
                                        <></>}
                                      
                                         </Box>
                                     </Flex>
                                 </MenuItem>
                             ))}
                         </MenuList>
                     </Menu>
                 </HStack>
             </Flex>
        )}
        <Flex className='corpoConteudo' margin='none' w='100%' flexDir='column' h='100%'>
            <ReactMarkdown components={customRenderers}>
                {conteudoAtualRenderizado}
            </ReactMarkdown>
        </Flex>
    </Flex>
)
}

export default ConteudoItem;