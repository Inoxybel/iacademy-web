import { Box, Button, Divider, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Progress, Skeleton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from "react-icons/ai";
import { BsBookHalf } from "react-icons/bs";
import { FaClipboardList, FaPencilAlt } from 'react-icons/fa';
import { RiMenuFoldFill } from "react-icons/ri";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useGeralContext } from '../../services/context/ContextProvider';
import { useSelecaoContext } from './ConteudoContext';
import SidebarStyledComponent from './SidebarStyleComponent';
import Cookies from "universal-cookie";


const Sidebar = ({ idSumario, onSetIdExercicioSelecionado, onSetAberto }) => {
    const cookies = new Cookies();
    const { SolicitarSumario, SolicitarConteudoPorId } = useGeralContext();
    const [listaSumario, setListaSumario] = useState()
    const [topicoAtual, setTopicoAtual] = useState(null)
    const { selecionar } = useSelecaoContext();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);


    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
        onSetAberto(!isSidebarVisible);
    };

    const handleClickConteudo = () => {
        cookies.set('conteudoOuExercicioAtual',"conteudo")
        selecionar('conteudo');
    };
    const handleClickExercicio = () => {
        cookies.set('conteudoOuExercicioAtual',"exercicio")
        selecionar('exercicio');
    };

    const history = useNavigate();

    const redirecionarParaDashboard = () => {
        history("/dashboard")
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const listaSumarioResponse = await SolicitarSumario(idSumario);
                setListaSumario(listaSumarioResponse);
                
                const topicoSelecionadoSalvo = cookies.get("topico_selecionado");
                const conteudoAtualSalvo = cookies.get("conteudo_atual");
                if (topicoSelecionadoSalvo && conteudoAtualSalvo)  {
                    setTopicoAtual(topicoSelecionadoSalvo);
                    await SolicitarConteudoPorId(conteudoAtualSalvo);
                } else {
                    cookies.set("topico_selecionado",listaSumarioResponse.topics[0])
                    setTopicoAtual(listaSumarioResponse.topics[0]);
                    await SolicitarConteudoPorId(listaSumarioResponse.topics[0].subtopics[0].contentId);
                }
    
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
    
        fetchData();
    
    }, []);
    



    if (!listaSumario ) {
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
                            <RiMenuFoldFill cursor="pointer" size="2rem" onClick={toggleSidebar} />
                            <Flex style={{ pointerEvents: isSidebarVisible ? "none" : "auto" }} position="fixed" cursor="pointer" top="2" left="2" zIndex="999" transition="opacity 0.5s ease" _hover={{ opacity: 1 }} opacity={isSidebarVisible ? "0" : "0.1"}>
                                <RiMenuUnfoldFill size="2rem" onClick={toggleSidebar} />
                            </Flex>
                        </Flex>
                        <Flex className='menuDetalhesCurso'>
                            <Image w='3rem' src={`data:image/svg+xml;utf8,${encodeURIComponent(listaSumario.icon)}`} />
                            <Box>
                                <Text className='tema'>{listaSumario.theme}</Text>
                                <Box className='categorias'>
                                    <Text>{listaSumario.category}</Text> - <Text>{listaSumario.subcategory}</Text>
                                </Box>
                            </Box>
                        </Flex>
                        <Box >
                            <Progress w='100%' borderRadius='10px' size='sm' bg="var( --secundary-color)" value={0} />
                        </Box>
                    </Flex>

                    <Flex className='conteudo'>
                        <Flex className='cabecalhoConteudo'>
                            <Menu>
                                <MenuButton className='botaoMenu' as={Button}>
                                    <Box className='topicoAtualBotaoMenu'>
                                        <Text fontSize='13px'> {topicoAtual.index}-{topicoAtual.title}</Text>
                                        <AiOutlineDown />
                                    </Box>
                                </MenuButton>
                                <MenuList className='listaMenu'>
                                    {listaSumario.topics.map((obj,key) => (
                                        <MenuItem key={key} className='itemMenu'
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = 'var(--background-card)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'var(--background-form)';
                                            }}
                                             onClick={() => {
                                                cookies.set("topico_selecionado", obj);
                                                 setTopicoAtual(obj)
                                                 
                                                 }}>
                                            {obj.title}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                        </Flex>


                        <Flex className="conteudoCorpo">
                            <Box className='inicioTopicosComIcone'>
                                <BsBookHalf />
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
                                                    cookies.set("conteudo_atual",obj.contentId);
                                                    handleClickConteudo()
                                                }}>
                                                <FaClipboardList />
                                                <Text >{obj.index}-{obj.title}</Text>
                                            </Box>
                                            <Divider />
                                            <Box className='itemSelecionavelTopicosExercicios'
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    cookies.set("exercicio_atual",obj.exerciseId);
                                                    onSetIdExercicioSelecionado(obj.exerciseId)
                                                    handleClickExercicio()
                                                }} >
                                                <FaPencilAlt />
                                                <Text>{obj.index}-Exercícios</Text>
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