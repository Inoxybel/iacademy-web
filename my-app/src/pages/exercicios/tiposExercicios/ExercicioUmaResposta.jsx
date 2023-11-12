import {
    Box,
    Flex,
    Radio,
    RadioGroup,
    Text,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';



const ExercicioUmaResposta = ({ status, question, complementation, identification, exercicioEntregado, mandarParaListaDeRespostas }) => {
    const [alternativaSelecionada, setAlternativaSelecionada] = useState("");


    if (exercicioEntregado && alternativaSelecionada) {
        mandarParaListaDeRespostas(identification, alternativaSelecionada);
    }

    return (
        <Box style={{backgroundColor:"var(--background-card)",width:'100%',padding:'20px'}}>
            <Text fontSize="sm" fontWeight="semibold" mb={'1rem'}>
                {identification} - {question}
            </Text>
            <RadioGroup>
                <Flex alignItems='flex-start' direction="column" rowGap={'1rem'} mb={'2rem'}>
                    <RadioGroup onChange={setAlternativaSelecionada} isDisabled={status === 'Finished' ? true : false} value={alternativaSelecionada} alignItems='flex-start'>
                        <VStack direction='row' alignItems='flex-start'>
                            {complementation.map((option, key) => (
                                <Radio key={key} value={option}>{option}</Radio>
                            ))}
                        </VStack>
                    </RadioGroup>
                </Flex>
            </RadioGroup>
        </Box>
    )
}


export default ExercicioUmaResposta;
