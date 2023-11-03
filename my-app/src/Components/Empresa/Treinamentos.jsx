import React from 'react'

import {
  Box, Flex, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, ListItem, List,
} from '@chakra-ui/react';
import SwitchPendencias from './SwitchPendencias';
import { useQuery } from 'react-query';
import { getTrainings } from '../../services/Fetchers/FetchersCompany';

export default function App({ setTraining }) {

  const styles = {
    flex: {
      padding: '0.5rem 0.5rem 0 0',
      position: 'relative'
    },
    box: {
      backgroundColor: 'var(--background-card)',
      borderRadius: '0.2rem',

      _hover: {
        filter: 'brightness(85%)',
        transition: '0.25s'
      }
    },

    icon: {
      transform: 'scale(0.6)',
    },
    h2: {
      fontSize: '1.25rem'
    },
    h3: {
      fontSize: '1.15rem',
      fontWeight: 'bold',
      marginTop: '0.5rem'
    },
    text: {
    },
  }

  const { isLoading, error, data } = useQuery('companyData', getTrainings)

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  let apiData = data.data.data

  return (
    <Flex sx={{
      flexDirection: 'column', gap: '1rem',
    }}>
      {
        apiData?.map((elem, index) =>
          <Box key={index} onClick={() => setTraining(elem)} role='button' sx={styles.box}>
            <Flex sx={styles.flex} >
              <Box dangerouslySetInnerHTML={{ __html: elem.icon }} sx={styles.icon} />
              <Flex sx={{ flexDir: 'column', justifyContent: 'center' }}>
                <Text as={'h2'} sx={styles.h2}>{elem.theme}</Text>
                <Text>Categoria: {elem.subcategory}</Text>
              </Flex>
              <Box as={SwitchPendencias} />
            </Flex>
            <Box>
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
                  <AccordionPanel pb={4} marginBottom='4rem'>

                    <List>
                      <Text as='h3' sx={styles.h3}>Conteudo</Text>
                      {
                        elem.topics.map((elem, index) =>
                          <ListItem key={index}>
                            <Text as='h3' sx={styles.h3}>{elem.title}:</Text>
                            <Text>{elem.description}</Text>
                          </ListItem>
                        )
                      }
                    </List>
                  </AccordionPanel >
                </AccordionItem>
              </Accordion>
            </Box>
          </Box >
        )
      }
    </Flex >
  )
}