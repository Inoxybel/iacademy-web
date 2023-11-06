import {
    Box,
    Flex,
    Text,
    Textarea
} from '@chakra-ui/react';
import React, { useState } from 'react';

const ExercicioDescritivo = ({ status,question, identification, exercicioEntregado, mandarParaListaDeRespostas }) => {

    const [valor, setValor] = useState("")
    
    if (exercicioEntregado) {
        mandarParaListaDeRespostas(identification, valor)
    }

    return (
        <Box style={{backgroundColor:"var(--background-card)",width:'100%',padding:'20px'}}>
            <Text fontSize="sm" fontWeight="semibold" mb={'1rem'}>
                {identification} - {question}
            </Text>
            <Flex w={'100%'} direction="column" rowGap={'1rem'}>
                <Textarea placeholder='Escreva sua resposta'
                    size='sm' value={valor}
                    onChange={(event) => setValor(event.target.value)}
                    isDisabled={status==='Finished'?true:false} />
            </Flex>

        </Box>
    )

}

export default ExercicioDescritivo;