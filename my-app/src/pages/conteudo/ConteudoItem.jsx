import { ViewIcon } from '@chakra-ui/icons';
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
    Skeleton,
    Text,
    Tooltip,
    useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { MdCheckCircle } from "react-icons/md";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useGeralContext } from '../../services/context/ContextProvider';



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
    const [conteudoAtualRenderizado, setConteudoAtualRenderizado] = useState();
    const [mostrarCabecalho, setMostrarCabecalho] = useState(true); 
    const { conteudoSelecionado, SolicitarAtualizaçãoConteudoId} = useGeralContext();
    const toast = useToast();
    useEffect(() => {

    if (conteudoSelecionado) {   
        const conteudoMaisRecente = conteudo.subcontentHistory.find((obj) => obj.disabledDate === "0001-01-01T00:00:00Z") ;
        if (conteudoMaisRecente && conteudoMaisRecente.content) {
            setConteudoAtualRenderizado(conteudoMaisRecente.content);
            if (conteudoMaisRecente.content.startsWith('##')) {
              setMostrarCabecalho(false);
            } else {
              setMostrarCabecalho(true);
            }
          } else {
            setConteudoAtualRenderizado(" "); 
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
                             icon={<AiOutlineEdit style={{ width: '1rem', height: '1rem' }} />}
                             onClick={async () => {
                                 try {
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
                                                 <Text >Conteúdo atualizado.</Text>
                                                 <Link onClick={()=>{window.location.reload()}}>Clique aqui para ver</Link>
                                             </Box>
                                         ),
                                     });        
                                 } catch (error) {
                                     toast({
                                         title: "Erro ao solicitar atualização",
                                         description: "Ocorreu um erro ao tentar solicitar a atualização.",
                                         status: "error",
                                         duration: 3000,
                                         isClosable: true,
                                     });        
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
                                 icon={<BiHistory color='#70728C' style={{ width: '1rem', height: '1rem' }} />}
                             />
                         </Tooltip>
                         <MenuList bg="#2F3142" p='0.3rem' flexDir='row' justifyContent='flex-start]'>
                             {conteudo.subcontentHistory.map((obj, index) => (
                                 <MenuItem key={index} bg='#2F3142' _hover={{ bg: "#075E81" }} _active={{ bg: "#054B60" }} onClick={() => {
                                     setConteudoAtualRenderizado(obj.content);
                                 }}>
                                     <Flex flexDir='row' alignSelf='center' padding='0' justifyContent='space-around' gap='2rem'>
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
        {!conteudoAtualRenderizado&&(<Skeleton h={10} w='70vw'/>)}  
        <Flex style={{ wordWrap: 'break-word' }} color='white' margin='none' w={['350px','600px','100%']} flexDir='column' h='100%'>
    <ReactMarkdown components={customRenderers}>
        {conteudoAtualRenderizado}
    </ReactMarkdown>
</Flex>
    </Flex>
)
}

export default ConteudoItem;