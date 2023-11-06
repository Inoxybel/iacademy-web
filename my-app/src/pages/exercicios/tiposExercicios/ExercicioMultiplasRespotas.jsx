import {
    Box,
    Checkbox,
    Text,
    VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';

const ExercicioMultiplasRespostas = ({ status,question, complementation, identification, exercicioEntregado,mandarParaListaDeRespostas }) => {
    const [respostasSelecionadas, setRespostasSelecionadas] = useState("");

    const handleCheckboxChange = (value) => {
        if (respostasSelecionadas.includes(value)) {
            // Remove a resposta da string
            const novaString = respostasSelecionadas.replace(value + "-", "");
            setRespostasSelecionadas(novaString);
        } else {
            // Adiciona a resposta à string
            setRespostasSelecionadas(respostasSelecionadas + value + "-");
        }
    };

    if (exercicioEntregado && respostasSelecionadas.length > 0) {
        // Aqui você pode usar a string respostasSelecionadas diretamente como desejar
        mandarParaListaDeRespostas(identification, respostasSelecionadas);
    }

    return (
        <Box style={{backgroundColor:"var(--background-card)",width:'100%',padding:'20px'}}>
            <Text fontSize="sm" fontWeight="semibold" mb="1rem">
                {identification} - {question}
            </Text>
            <VStack alignItems="flex-start" spacing="1rem">
                {complementation.map((option, key) => (
                    <Checkbox
                        isDisabled={status==='Finished'?true:false}
                        key={key}
                        isChecked={respostasSelecionadas.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        variant='circular'>
                        {option}
                    </Checkbox>
                ))}
            </VStack>
        </Box>
    );
};


export default ExercicioMultiplasRespostas;