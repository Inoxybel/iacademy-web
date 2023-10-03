import {Box,Button,Divider,Flex,Image,Menu,MenuButton,MenuItem,MenuList,Progress,Skeleton,Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ContextProvider from '../context/ContextProvider'; // Substitua pelo caminho correto do arquivo
import { AiOutlineDown } from "react-icons/ai";
import { BsBookHalf } from "react-icons/bs";
import { FaClipboardList, FaPencilAlt } from 'react-icons/fa';
import { RiMenuFoldFill } from "react-icons/ri";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import imgTeste from '../../img/csharp_logo.png';
import { useGeralContext } from '../context/ContextProvider';
import { useSelecaoContext } from './ConteudoContext';
import SidebarStyledComponent from './SidebarStyleComponent';




const Sidebar = ({ idSumario, onSelectConteudo, onSetIdExercicioSelecionado, onSetAberto }) => {
    const { SolicitarSumario, SolicitarConteudoPorId, conteudoSelecionado, SolicitarExercicioPorID } = useGeralContext();
    const [listaSumario, setListaSumario] = useState()
    const [topicoAtual, setTopicoAtual] = useState(null)
    const { selecao, selecionar } = useSelecaoContext();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);


     const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
        onSetAberto(!isSidebarVisible);
     };

    const handleClickConteudo = () => {
        selecionar('conteudo');
    };
    const handleClickExercicio = () => {
        selecionar('exercicio');
    };

    const history = useNavigate();

    const redirecionarParaDashboard=()=>{
        history("/dashboard")
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const listaSumarioResponse = await SolicitarSumario(idSumario);
                setListaSumario(listaSumarioResponse)
                setTopicoAtual(listaSumarioResponse.topics[0])
                await SolicitarConteudoPorId(listaSumarioResponse.topics[0].subtopics[0].contentId)
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
        fetchData();
    }, []);
    if (!listaSumario || !topicoAtual || !topicoAtual.subtopics) {
        return (
            <SidebarStyledComponent >
                <Skeleton h='20%' ml='5%' marginBottom='10px' />
                <Skeleton h='5%' ml='5%' marginBottom='10px' />
                <Skeleton h='70%' ml='5%' marginBottom='10px' />
            </SidebarStyledComponent>
        )
    } else {
        return (
            
            <SidebarStyledComponent isSidebarVisible={isSidebarVisible}>
                <Flex className='container'>
                    <Flex className='menu' flexDir>
                        <Flex dir='row' justifyContent={"space-between"}>
                            <BiArrowBack className='iconeMenu' onClick={() => { redirecionarParaDashboard() }} />
                            <RiMenuFoldFill cursor= "pointer" size="2rem"onClick={toggleSidebar}/>
                            <Flex style={{ pointerEvents: isSidebarVisible ? "none" : "auto" }}position="fixed"  cursor="pointer" top="2" left="2" zIndex="999" transition="opacity 0.5s ease" _hover={{ opacity: 1 }} opacity={isSidebarVisible ? "0" : "0.1"}>
                                <RiMenuUnfoldFill size="2rem" onClick={toggleSidebar} />
                            </Flex>
                        </Flex>
                        <Flex className='menuDetalhesCurso'>
                            <Image src={imgTeste} w='40px' />
                            <Box>
                                <Text className='tema'>{listaSumario.theme}</Text>
                                <Box className='categorias'>
                                    <Text>{listaSumario.category}</Text> - <Text>{listaSumario.subcategory}</Text>
                                </Box>
                            </Box>
                        </Flex>
                        <Box >
                            <Progress w='100%' borderRadius='10px' size='sm' bg="#4E506F" colorScheme='whatsapp' value={20} />
                        </Box>
                    </Flex>

                    <Flex className='conteudo'>
                        <Flex className='cabecalhoConteudo'>
                            <Menu>
                                <MenuButton className='botaoMenu' as={Button}>
                                    <Box className='topicoAtualBotaoMenu'>
                                        <Text  fontSize='13px'> {topicoAtual.index}-{topicoAtual.title}</Text>
                                        <AiOutlineDown />
                                    </Box>
                                </MenuButton>
                                <MenuList className='listaMenu'>
                                    {listaSumario.topics.map((obj) => (
                                        <MenuItem className='itemMenu'
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#4E506F'; // Altera a cor de fundo ao passar o mouse
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = '#575A77'; // Restaura a cor de fundo ao retirar o mouse
                                            }}
                                            onClick={() => { setTopicoAtual(obj) }}> 
                                            {obj.title}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </Flex>


                        <Flex className="conteudoCorpo">
                            <Box className='inicioTopicosComIcone'>
                                <BsBookHalf/>
                                <Text>Tópicos</Text>
                            </Box>
                            
                            <Flex className="topicosExercicios">
                                {
                                    topicoAtual && topicoAtual.subtopics && topicoAtual.subtopics.map((obj, index) => (
                                        <Flex className='itemTopicosExercicios' key={index} >
                                            <Divider />
                                            <Box className='itemSelecionavelTopicosExercicios'  
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                SolicitarConteudoPorId(obj.contentId)
                                                handleClickConteudo()
                                            }}>
                                                <FaClipboardList/>
                                                <Text color='white'>{obj.index}-{obj.title}</Text>
                                            </Box>
                                            <Divider />
                                            <Box  className='itemSelecionavelTopicosExercicios'  
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onSetIdExercicioSelecionado(obj.exerciseId)
                                                handleClickExercicio()
                                            }} >
                                                <FaPencilAlt/>
                                                <Text color='white'>{obj.index}-Exercícios</Text>
                                            </Box>
                                        </Flex>
                                    ))
                                }
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </SidebarStyledComponent>
        );
    }
};

export default Sidebar;