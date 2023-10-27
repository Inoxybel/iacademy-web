import {
    Box,
    Button,
    Container,
    Flex,
    Image,
    Link,
    Text,
    Heading
} from "@chakra-ui/react";
import React, { useState } from "react";
import feedback from '../assets/feedback.png';
import like from '../assets/like.png';
import tarefas from '../assets/tarefas.png';
import undraw_lugares from "../assets/undraw_lugares.svg";
import undraw_organization from "../assets/undraw_organization.svg";
import undraw_reading from "../assets/undraw_reading_re_29f8.svg";
import undraw_skills from "../assets/undraw_skills.svg";
import Footer from "./landingPage/FooterLP.jsx";
import Menu from "./landingPage/Menu";
import TextoEImagem from "./landingPage/TextoEImagem";
import TyperAnimation from "./landingPage/TyperAnimation";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import styles from "./styles";

import { useBreakpointValue } from "@chakra-ui/react";


const breakpoints = {
    base: "0em", // 0px
    sm: "30em", // ~480px. 
    md: "48em", // ~768px
    lg: "62em", // ~992px
    xl: "80em", // ~1280px
    "2xl": "96em", // ~1536px
};

export default function LandingPage() {
    const [sequenciaAtual, setSequenciaAtual] = useState(0);

    const frases = [["Na nossa plataforma, os cursos se adaptam ao seu ritmo de aprendizado, garantindo uma experiência de ensino personalizada."], ["Imagine um tutor virtual que entende o seu progresso e se ajusta para atender às suas necessidades de aprendizado. Com a nossa IA avançada, isso é uma realidade."], ["Acreditamos que a aprendizagem personalizada é o futuro da educação. Nossos cursos adaptáveis garantem que você alcance seus objetivos de forma eficaz e eficiente."], ["Em um mundo onde a tecnologia e o aprendizado se entrelaçam, nossa plataforma oferece uma narrativa única. Você faz parte de uma jornada educacional personalizada, onde cada curso se molda às suas preferências, tornando o aprendizado uma experiência envolvente e única."]]
    const breakpoint = useBreakpointValue(breakpoints);

    return (
        <Box backgroundColor={"white"} overflowY={"hidden"} >
            <Flex bg="blue.500" w="100vw" position={"fixed"} zIndex="5" h={["4rem", "4rem", "4rem", "5.9rem", "5.9rem", "6rem"]}>
                <Flex alignItems="center" justifyContent="space-between" px={["5rem", "4rem"]} w="100%">
                    <Link href="/" color="white" fontSize={["1.2rem", "1.3rem", "1.4rem", "1.5rem", "2rem"]} fontStyle="italic" fontWeight={"semibold"} _hover={{ textDecoration: "none" }} >IAcademy</Link>

                    <Menu breakpoint={breakpoint} breakpoints={breakpoints} />

                </Flex>
            </Flex>


            <Box bg="white">

                <Container maxW={"100vw"} p={0}>
                    <Flex alignItems="center" justifyContent="center">
                        <Box h={["100vh"]} />
                        <Flex justifyContent={"flex-end"} top={["5%", "5%", "5%", "5%", "5%", "10%"]} right={[5, 5, 5, 20, 20, 20]} position={breakpoints <= "md" ? "absolute" : "relative"} >
                            <Image w={["45vw", "30vw", "28vw", "25vw", "25vw", "25vw"]} src={undraw_reading} position={"relative"} top={["15vw", "20vw", "10vw", "10vw", "3vw", "-8vw"]} right={["-5vw", "3vw", "10vw", "3vw", "3vw", "3vw"]} />
                        </Flex>



                        <Box color="blue.900" maxH={"100vh"} textShadow="2px 2px 2px white" fontWeight={"semibold"} position="absolute" left={["5%", "5%", "10%", "10%", "10%", "10%"]} top={["5%", "8%"]} maxW={["70%", "60%", "45%", "45%", "50%", "55%"]}>
                            <Card align='center'>
                                <CardHeader>
                                    <Heading fontSize={["5px", "10px", "15px", "28px", "48px", "48px"]} position={breakpoints <= "sm" ? "relative" : "absolute"} maxW={["100%", "100%", "100%", "100%", "100%", "100%"]}>Desenvolvendo habilidades da sua maneira</Heading>
                                </CardHeader>
                                <CardBody>
                                <TyperAnimation fontSize={"12px"}key={sequenciaAtual} frase={frases[sequenciaAtual]}></TyperAnimation>
                                </CardBody>
                                <CardFooter>
                                <Button sx={styles.buttonExperimentar} onClick={() => { setSequenciaAtual(sequenciaAtual <= 2 ? sequenciaAtual + 1 : sequenciaAtual == 3 && 0) }}>Experimente!</Button>
                                </CardFooter>
                            </Card>
                        </Box>
                    </Flex>
                </Container>

            </Box>

            <TextoEImagem titulo={"Estude onde desejar!"} descricao={"A tecnologia ao seu alcance a todo momento"} imagem={undraw_lugares} reverso={false} />
            <TextoEImagem titulo={"Organize seus estudos com facilidade"} descricao={"Suas pendencias facilmente gerenciadas"} imagem={undraw_organization} reverso={true} />
            <TextoEImagem titulo={"Aprimore suas skills"} descricao={"Seu desenvolvimento baseado no progresso evolui gradativamente"} imagem={undraw_skills} reverso={false} />



            <Box py={10} display={["none", "block", "block", "block", "block", "block"]}>
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


            <Flex backgroundColor={"yellow.100"} h={[500, 600, 600, 600, 600, 600,]} w={"100%"} justifyContent={"center"} align={"center"}>

                {/* <AspectRatio minW={['320px', '480px', '770px', '770px', '770px']} h={["181px", "270px", "435px", "435px", "435px"]} ratio={1}>
                    <iframe
                        title='VideoPitch'
                        src={"#"}
                        allowFullScreen
                    />
                </AspectRatio> */}
            </Flex>

            <Footer >
            </Footer>



        </Box>
    );
}