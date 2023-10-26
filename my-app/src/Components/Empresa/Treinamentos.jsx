import React from 'react'

import {
  Box, Flex, Icon, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
} from '@chakra-ui/react';
import SwitchPendencias from './SwitchPendencias';
import data from "../../../json/treinamentos.json"

export default function App({ setTraining }) {

  const treinamentos = data.Items

  const styles = {
    flex: {
      backgroundColor: 'var(--background-form)',
      borderRadius: '0.2rem',
      justifyContent: 'space-between',
      padding: '0.5rem 0.5rem 0.5rem 0.5rem '
    },
    box: {
      backgroundColor: 'var(--background-form)',
      borderRadius: '0.2rem',

      _hover: {
        filter: 'brightness(85%)',
        transition: '0.25s'
      }
    },

    icon: {
      width: '5rem',
      height: '5rem',
      backgroundColor: 'var(--primary-white)',
      borderRadius: '0.5rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    text: {
      width: '100%'
    },

  }

  return (
    <Flex sx={{
      flexDirection: 'column', gap: '1rem', color: 'var(--primary-white)',
    }}>
      {
        treinamentos.map((elem, index) =>
          <Box key={index} onClick={() => setTraining(elem)} role='button' sx={styles.box}>
            <Flex sx={styles.flex} >
              <Icon sx={styles.icon}>{elem.TrainingIcon}</Icon>
              <Text as={'h2'} sx={styles.h2}>{elem.TrainingName}</Text>
              <Box as={SwitchPendencias} />
            </Flex>
            <Box sx={styles.text}>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1'>
                        Exibir descricao
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} >

                    <Text >{elem.TrainingDescription}</Text>
                    <Text>Duracao do curso: {elem.Duration}</Text>

                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </Box>
        )
      }
    </Flex >
  )
}