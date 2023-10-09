import {
    AspectRatio,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Container,
    Flex,
    Image,
    Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import feedback from '../img/feedback.png';
import imagem_estudando from "../img/imagem-estudando.jpg";
import like from '../img/like.png';
import tarefas from '../img/tarefas.png';
import video from '../video/Video_pitch_IAcademy.mp4';
import Footer from "./landingPage/FooterLP.jsx";
import MenuAction from './landingPage/menuAction.jsx';
import TextoEImagem from "./landingPage/TextoEImagem";
import undraw_reading from "../img/undraw_reading_re_29f8.svg"
import undraw_organization from "../img/undraw_organization.svg"
import undraw_skills from "../img/undraw_skills.svg"
import undraw_lugares from "../img/undraw_lugares.svg"
const breakpoints = {
    base: "0em", // 0px
    sm: "30em", // ~480px. 
    md: "48em", // ~768px
    lg: "62em", // ~992px
    xl: "80em", // ~1280px
    "2xl": "96em", // ~1536px
};


export default function LandingPage() {
    const [menuActionVisible, setMenuActionVisible] = useState(false)

    return (
        <Box backgroundColor={"white"}>
            <Flex bg="blue.500" w="100vw" position="fixed" zIndex="1" h={["4rem", "4rem", "4rem", "5.9rem", "5.9rem", "6rem"]}>
                <Flex alignItems="center" justifyContent="space-between" px={["5rem", "4rem"]} w="100%">
                    <Text color="white" fontSize={["1.2rem", "1.3rem", "1.4rem", "1.5rem", "2rem"]} fontStyle="italic" pos={"relative"} alignSelf="center">Iacademy</Text>

                    <Breadcrumb p={["0.8rem", "0.8rem", "0.8rem", "0.8rem", "1rem", "1rem"]} separator="" spacing={["1.4rem", "1.8re", "2.0rem", "2.2vw", "2.8vw", "3vw"]} alignSelf="flex-end" fontSize={["0.6rem", "0.7rem", "0.8rem", "0.8rem", "1vw", "1vw"]}>
                        <BreadcrumbItem onMouseEnter={() => { setMenuActionVisible(true) }} onMouseLeave={() => setMenuActionVisible(false)}>
                            <MenuAction optionName={"Home"} isVisible={menuActionVisible}></MenuAction>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <MenuAction optionName={"About"} isVisible={menuActionVisible}></MenuAction>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <MenuAction optionName={"Contact"} isVisible={menuActionVisible}></MenuAction>
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <Flex alignSelf="center">
                        <Breadcrumb separator="" >
                            <BreadcrumbItem>
                                <BreadcrumbLink fontSize={["0.3rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]} p={["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"]} px={["1vw", "1vw", "1vw", "1vw", "1vw", "1vw"]} borderRadius={["1.2vw", "0.8vw", "0.4vw"]} borderWidth={1} backgroundColor={"blue.600"} color={"blue.50"} _hover={{ backgroundColor: "blackAlpha.700", color: "white", textDecoration: "none", }} href='/login'>Sign in</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink fontSize={["0.3rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]} p={["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"]} px={["1vw", "1vw", "1vw", "1vw", "1vw", "1vw"]} borderRadius={["1.2vw", "0.8vw", "0.4vw"]} borderWidth={1} backgroundColor={"blue.300"} color={"white"} _hover={{ backgroundColor: "whiteAlpha.900", color: "black", textDecoration: "none", borderColor: "blue.700" }} href='/cadastro'>Sign Up</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Flex>
                </Flex>
            </Flex>


            <Box bg="white">
                <Container maxW={"100%"} p={0} pt={5}>
                    <Flex alignItems="center" justifyContent="center">
                        <Box h={["100vh"]} />
                        <Flex justifyContent={"flex-end"} top={["5%", 10, 10, 10, 10, 10]} right={[5, 5, 5, 20, 20, 20]} position={breakpoints <= "md" ? "absolute" : "relative"} >
                            <Image w={"50%"} src={undraw_reading} />
                        </Flex>
                        <Box color="blue.900" h={"100%"} textShadow="2px 2px 2px white" fontWeight={"semibold"} position="absolute" left={"10%"} top={["5%", "10%"]} maxW={["40%", "40%","55%","55%","55%","55%"]}>
                            <Text fontSize={["5vw", "2.5vw", "2.5vw", "2.5vw", "2.5vw", "2.5vw"]} position="relative" >Desenvolvendo habilidades da sua maneira</Text>
                            <Text fontSize={["3vw", "3vw", "2.0vw", "2.0vw", "1.4vw", "1.4vw"]} position="relative" top={5} left={"10%"} color={"gray.700"} textShadow="2px 2px 2px white">Na Iacademy, o aprendizado é flexível. Personalize seu caminho de aprendizado e gere explicações de curso para se adequar ao seu estilo.</Text>
                            <Button w={["26vw","14vw","14vw","14vw","14vw","14vw"]} h={["3vw","2vw","2vw","2vw","2vw","2vw"]} top={10} left={"70%"} fontSize={["0.3rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]} p={["1", "1.6", "0.2vw", "0.2vw", "0.2vw", "0.2vw"]} px={["1vw", "1vw", "1vw", "1vw", "1vw", "1vw"]} borderRadius={["1.2vw", "0.8vw", "0.4vw"]} borderWidth={1} backgroundColor={"blue.300"} color={"white"} _hover={{ backgroundColor: "whiteAlpha.900", color: "black", textDecoration: "none", borderColor: "blue.700" }}>Conheça nossa plataforma</Button>
                        </Box>
                    </Flex>
                </Container>

            </Box>

            <TextoEImagem titulo={"Estude onde desejar!"} descricao={"A tecnologia ao seu alcance a todo momento"} imagem={undraw_lugares} reverso={false} />
            <TextoEImagem titulo={"Organize seus estudos com facilidade"} descricao={"Suas pendencias facilmente gerenciadas"} imagem={undraw_organization} reverso={true} />
            <TextoEImagem titulo={"Aprimore suas skills"} descricao={"Seu desenvolvimento baseado no progresso evolui gradativamente"} imagem={undraw_skills} reverso={false} />



            <Box py={10}>
                <Flex color={"black"} justifyContent={"space-around"} h={200} fontSize={["0.3rem", "0.4rem", "0.5rem", "0.9vw", "0.9vw", "0.9vw"]}>
                    <Flex w={"25%"} h={"100%"} alignItems="center">
                        <Image src={like} alt="Image 1" maxH={["6vw", "6vw", "5vw", "5vw", "4vw", "3.5vw"]} m={["0.6rem", "0.8rem", "1rem", "1.4rem", "1.4rem", "1.4rem"]} />

                        <Flex flexDir="column" >
                            <Text fontSize={["0.5rem", "0.6rem", "0.7rem", "1.2vw", "1.2vw", "1.2vw"]} fontWeight={"bold"}>Consuma o que você gostar</Text>
                            <Text>Aproveite a versatilidade de conteúdos que alteram conforme a sua opção</Text>
                        </Flex>
                    </Flex>
                    <Flex w={"25%"} h={"100%"} alignItems="center">
                        <Image src={feedback} alt="Image 2" maxH={["6vw", "6vw", "5vw", "5vw", "4vw", "3.5vw"]} m={["0.6rem", "0.8rem", "1rem", "1.4rem", "1.4rem", "1.4rem"]} />
                        <Flex flexDir="column">
                            <Text fontSize={["0.5rem", "0.6rem", "0.7rem", "1.2vw", "1.2vw", "1.2vw"]} fontWeight={"bold"}>Obtenha Feedback Instantâneo</Text>
                            <Text>Com auxilio de IA receba avaliação imediata sobre sua atividade para melhorar continuamente.</Text>
                        </Flex>
                    </Flex>
                    <Flex w={"25%"} h={"100%"} alignItems="center">
                        <Image src={tarefas} alt="Image 3" maxH={["6vw", "6vw", "5vw", "5vw", "4vw", "3.5vw"]} m={["0.6rem", "0.8rem", "1rem", "1.4rem", "1.4rem", "1.4rem"]} />
                        <Flex flexDir="column">
                            <Text fontSize={["0.5rem", "0.6rem", "0.7rem", "1.2vw", "1.2vw", "1.2vw"]} fontWeight={"bold"}>Suas pendências organizadas</Text>
                            <Text>Gerencie as suas tarefas e acesse rapidamente seus objetivos com nossa lista de pendências.</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>


            <Flex backgroundColor={"yellow.100"} h={500} w={"100%"} justifyContent={"center"} align={"center"}>

                <AspectRatio minW={['320px', '480px', '770px', '770px', '770px']} h={["181px", "270px", "435px", "435px", "435px"]} ratio={1}>
                    <iframe
                        title='VideoPitch'
                        src={video}
                        allowFullScreen
                    />
                </AspectRatio>
            </Flex>

            <Footer>
            </Footer>



        </Box>
    );
}