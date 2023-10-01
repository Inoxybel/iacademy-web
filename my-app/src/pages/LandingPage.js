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
    VStack,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    color
} from "@chakra-ui/react";
import imagem_estudando from "../img/imagem-estudando.jpg"
import styles from "./styles.js";


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


            <Box bg="purple.100">
                <Container maxW={"100%"} padding={0} pt={5}>
                    <Flex alignItems="center" justifyContent="center">
                        <Image opacity={0.5} src={imagem_estudando} alt="mulher estudando com anotacoes no caderno" />
                        <Box color="blue.900" textShadow="2px 2px 2px white" fontWeight={"semibold"} position="absolute" left={"10%"} top={"20%"} maxW={"55%"}>
                            <Text fontSize={"2.5vw"} position="relative" >Desenvolvendo habilidades da sua maneira</Text>
                            <Text fontSize={"1.4vw"} position="relative" top={5} left={"10%"} color={"gray.700"} textShadow="2px 2px 2px white">Na Iacademy, o aprendizado é flexível. Personalize seu caminho de aprendizado e peça para gerar explicações de curso sob medida para se adequar ao seu estilo.</Text>
                            <Button w={"14vw"} h={"2vw"} fontSize={"1vw"} top={10} left={"90%"} backgroundColor={"blue.400" } color={"white" } _hover={{ backgroundColor:"whiteAlpha.700" , color: "blue.800"}}>Conheça nossa plataforma</Button>
                        </Box>
                    </Flex>
                </Container>
            </Box>


            <Box py={10}>
                <Container maxW="container.xl" color={"black"}>
                    <VStack spacing={8}>
                        <Box>
                            <Image src="/path/to/your-image1.jpg" alt="Image 1" maxH={300}/>
                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                        </Box>
                        <Box>
                            <Image src="/path/to/your-image2.jpg" alt="Image 2" maxH={300} />
                            <Text>Nulla facilisi. Etiam ultrices massa sit amet.</Text>
                        </Box>
                        <Box>
                            <Image src="/path/to/your-image3.jpg" alt="Image 3" maxH={300} />
                            <Text>Phasellus euismod augue nec est feugiat, nec tristique.</Text>
                        </Box>
                    </VStack>
                </Container>
            </Box>
        </Box>
    );
}
