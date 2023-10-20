import React from 'react'

import {
  Flex, useMediaQuery, Text, Box, List, ListItem, Img
} from '@chakra-ui/react';
import MenuEmpresa from '../../Components/Empresa/MenuEmpresa';


export default function App() {

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const styles = {
    flex: {
      color: 'var(--primary-white)',
      width: '100vw',
      flexDirection: isSmallerThan768 ? 'column' : 'row',
      justifyContent: isSmallerThan768 ? 'space-evenly' : 'space-between',
      gap: '1rem',
      paddingX: isSmallerThan768 ? '1rem' : '5rem',
      paddingY: '2rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    groupsFlex: {
      backgroundColor: 'var(--background-form)',
      width: '100%',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      borderRadius: '0.2rem'
    },
  }

  return (

    <>
      <MenuEmpresa />
      <Box>
        <Flex padding='2rem 0 0 5.1rem'>
          <Img w='7rem' src='https://t.ctcdn.com.br/rN4f2Z8fsqpbKVA6eAmaiFNjv9Y=/400x400/smart/i490024.jpeg' />
        </Flex>
        <Flex sx={styles.flex}>
          <Box sx={styles.groupsFlex}>
            <Text>Nome da Empresa</Text>
            <Text>CNPJ</Text>
            <Text>Infomacoes do Plano</Text>
          </Box>
        </Flex >
      </Box>
    </>

  )

}