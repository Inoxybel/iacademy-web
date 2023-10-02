import React, { useState, useEffect } from "react";
import {
    Box,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Alert,
    AlertIcon,
    AlertTitle,
    theme,
    Container,
    Flex,
    Image,
    Text,
    HStack,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import Footer from "./landingPage/FooterLP.js"
import imagem_estudando from "../img/imagem-estudando.jpg"
import like from '../img/like.png'
import celular from '../img/celular.png'
import feedback from '../img/feedback.png'
import tarefas from '../img/tarefas.png'
import styles from "./styles.js";
import { MdFeedback } from "react-icons/md";


export default function LandingPage() {
    return (
        <Box backgroundColor={"white"}>
            <Flex bg="blue.500" w="100vw" py={0} position="fixed" zIndex="1" h={20} alignItems="flex-end">
                <Flex alignItems="center" justifyContent="space-between" px={20} w="100%">
                    <Text color="white" fontSize={28} fontStyle="italic" pos={"relative"} bottom="5">Iacademy</Text>

                    <Breadcrumb separator="" spacing={"3vw"}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='#'>About</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='#'>Contact</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <Breadcrumb separator="" spacing={"1.5vw"}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/login'>Sign In</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/cadastro'>Sign Up</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Flex>
            </Flex>


            <Box bg="blue.100">
                <Container maxW={"100%"} padding={0} pt={5}>
                    <Flex alignItems="center" justifyContent="center">
                        <Image opacity={0.6} src={imagem_estudando} alt="mulher estudando com anotacoes no caderno" />
                        <Box color="blue.900" textShadow="2px 2px 2px white" fontWeight={"semibold"} position="absolute" left={"10%"} top={"15%"} maxW={"55%"}>
                            <Text fontSize={"2.5vw"} position="relative" >Desenvolvendo habilidades da sua maneira</Text>
                            <Text fontSize={"1.4vw"} position="relative" top={5} left={"10%"} color={"gray.700"} textShadow="2px 2px 2px white">Na Iacademy, o aprendizado é flexível. Personalize seu caminho de aprendizado e peça para gerar explicações de curso sob medida para se adequar ao seu estilo.</Text>
                            <Button w={"14vw"} h={"2vw"} fontSize={"0.9vw"} top={10} left={"90%"} backgroundColor={"blue.400"} color={"white"} _hover={{ backgroundColor: "whiteAlpha.700", color: "blue.800" }}>Conheça nossa plataforma</Button>
                        </Box>
                    </Flex>
                </Container>
            </Box>


            <Box py={10}>
                <Flex color={"black"} justifyContent={"space-around"} h={150} alignItems={"center"}>
                    <Flex w={"20%"} h={"100%"} alignItems="center">
                        <Image src={like} alt="Image 1" maxH={50} m={2}/>

                        <Flex flexDir="column" >
                            <Text><strong>Consuma o que você gostar</strong></Text>
                            <Text>Aproveite a versatilidade de conteúdos que alteram conforme a sua opção</Text>
                        </Flex>
                    </Flex>
                    <Flex w={"20%"}  h={"100%"} alignItems="center">
                        <Image src={feedback} alt="Image 2" maxH={50} m={2}/>
                        <Flex flexDir="column">
                            <strong>
                                <Text>Obtenha Feedback Instantâneo</Text>
                            </strong>
                            <Text>Com auxilio de IA receba avaliação imediata sobre sua atividade para melhorar continuamente.</Text>
                        </Flex>
                    </Flex> 
                    <Flex w={"20%"}  h={"100%"} alignItems="center">
                        <Image src={tarefas} alt="Image 3" maxH={50} m={2}/>
                        <Flex flexDir="column">
                            <strong>
                                <Text>Suas pendências organizadas</Text>
                            </strong>
                            <Text>Gerencie as suas tarefas e acesse rapidamente seus objetivos com nossa lista de pendências.</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>


        <Flex backgroundColor={"yellow.200"} h={500} w={"100%"}>
            
        </Flex>

        <Footer>
            
        </Footer>



        </Box>
    );
}
