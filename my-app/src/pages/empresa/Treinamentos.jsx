import React from 'react'

import {
  Flex, useMediaQuery, Text
} from '@chakra-ui/react';
import MenuEmpresa from '../../Components/Empresa/MenuEmpresa';
import Grupos from '../../Components/Empresa/Grupos';
import AddGrupo from '../../Components/Empresa/AddGrupo';
import Treinamentos from '../../Components/Empresa/Treinamentos';
import { useState } from 'react';

export default function App() {

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  const [training, setTraining] = useState()

  const styles = {
    flex: {
      width: '100vw',
      height: '100%',
      flexDirection: isSmallerThan768 ? 'column' : 'row',
      justifyContent: isSmallerThan768 ? 'space-evenly' : 'space-between',
      gap: '1rem',
      paddingX: isSmallerThan768 ? '1rem' : '5rem',
      paddingY: '2rem'
    },
    title: {
      color: 'var(--primary-white)',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    trainingFlex: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      gap: '1rem',
    },
    groupsFlex: {
      backgroundColor: 'var(--background-form)',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      borderRadius: '0.2rem'
    },
  }

  return (

    <>
      <MenuEmpresa />
      <Flex sx={styles.flex}>
        <Flex sx={styles.trainingFlex}>
          <Text as={'h2'} sx={styles.title}>Treinamentos</Text>
          <Treinamentos setTraining={setTraining} />
        </Flex>
        <Flex sx={styles.groupsFlex}>
          <Text as={'h2'} sx={styles.title}>Grupos</Text>
          <Grupos training={training} />
          <AddGrupo />
        </Flex>
      </Flex >
    </>

  )

}