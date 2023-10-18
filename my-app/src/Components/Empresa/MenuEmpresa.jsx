import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom'
import {
  Flex,
  Box,
  Icon,
  useMediaQuery
} from '@chakra-ui/react';
import { BsBuildings, BsClipboard2Data } from 'react-icons/bs';


export default function App() {

  const [isSmOrMd] = useMediaQuery("(max-width: 960px)");
  const match = useMatch('empresa')
  const navigate = useNavigate()

  const styles = {

    stylesFlex: {
      backgroundColor: 'var(--background-menu)',
      position: 'fixed',
      left: '0',
      right: isSmOrMd ? 'none' : '0',
      h: isSmOrMd ? '4rem' : '100%',
      w: isSmOrMd ? '100%' : '3.5rem',
      flexDirection: isSmOrMd ? 'row' : 'column',
      alignItems: isSmOrMd ? 'center' : 'space-between',
      justifyContent: isSmOrMd ? 'space-around' : 'flex-start',
      zIndex: '999',
      bottom: '0',
    },
    stylesBox: {
      width: '100%',
      textAlign: 'center',
      lineHeight: '4rem'
    },
    stylesButton: {
      height: '2rem',
      width: '2rem',
      background: "none",
      color: "var(--primary-white)",
      cursor: 'pointer',
      _hover: {
        color: 'var(--background-button)'
      },
    }
  }

  return (
    <Flex
      sx={styles.stylesFlex}
    >
      <Box sx={styles.stylesBox} bg={match && 'var(--background-black)'}>
        <Icon onClick={() => navigate('/empresa')} as={BsBuildings} sx={styles.stylesButton} />
      </Box>
      <Box sx={styles.stylesBox} bg={match ?? 'var(--background-black)'}>
        <Icon onClick={() => navigate('/empresa/treinamentos')} as={BsClipboard2Data} sx={styles.stylesButton} />
      </Box>

    </Flex>

  );
}