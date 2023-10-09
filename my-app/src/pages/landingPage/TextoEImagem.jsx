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
                flexWrap="wrap-reverse">
                <Flex
                    flex={['1', '1', '2']}
                    alignItems="center"
                    justifyContent="center"
                    mb={[4, 4, 24]}>

                    <Image src={imagem} alt={`Image for ${titulo}`} maxH="300px" />
                </Flex>
                <Flex
                    flex={['1', '1', '2']}
                    flexDir="column"
                    alignItems="center"
                    textAlign={['center', 'center', 'left']}
                    mb={[4, 4, 24]}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                        {titulo}
                    </Text>
                    <Text fontSize="lg">{descricao}</Text>
                </Flex>
            </Flex>
        </Container>
    )
}
export default TextoEImagem;