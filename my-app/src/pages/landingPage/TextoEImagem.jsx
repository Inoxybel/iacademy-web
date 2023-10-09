import {
    Flex,
    Container,
    Box,
    Text,
    Image,
} from "@chakra-ui/react";
import React from "react";

const TextoEImagem = ({
    titulo,
    descricao,
    imagem,
    reverso}
) => {


    return (

        <Container maxW="100vw" py={8} color={"black"} backgroundColor={"blue.50"}>
            <Flex
                direction={['column', 'column', reverso ? 'row' : 'row-reverse']}
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap-reverse" marginY={[4, 4, 32]}>
                <Flex
                    flex={['1', '1', '2']}
                    alignItems="center"
                    justifyContent="center"
                    >

                    <Image src={imagem} alt={`Image for ${titulo}`} maxW={["220px","280px","300px","300px","300px","450px"]} />
                </Flex>
                <Flex
                    flex={['1', '1', '2']}
                    flexDir="column"
                    alignItems="center"
                    textAlign={['center', 'center', 'left']}
                    mb={[2, 4, 32]}>
                    <Text fontSize={["md","2xl","32","36","40","40"]} fontWeight="bold" mb={4}>
                        {titulo}
                    </Text>
                    <Text fontSize={["sm","md","20","22","24","24"]}>{descricao}</Text>
                </Flex>
            </Flex>
        </Container>
    )
}
export default TextoEImagem;