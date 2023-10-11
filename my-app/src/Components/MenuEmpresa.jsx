import React from 'react';
import {
  Flex,
  useMediaQuery,
  Box,
  Icon
} from '@chakra-ui/react';
import { BsBuildings, BsClipboard2Data } from 'react-icons/bs';


export default function App() {

  const [isSmOrMd] = useMediaQuery("(max-width: 960px)");

  const styles = {

    stylesFlex: {
      backgroundColor: 'var(--background-menu)',
      position: 'fixed',
      left: '0',
      right: isSmOrMd ? 'none' : '0',
      paddingTop: '1rem',
      h: isSmOrMd ? '4rem' : '100%',
      w: isSmOrMd ? '100%' : '45px',
      flexDirection: isSmOrMd ? 'row' : 'column',
      overflow: isSmOrMd ? 'auto' : 'hidden',
      alignItems: isSmOrMd ? 'center' : 'space-between',
      justifyContent: isSmOrMd ? 'space-around' : 'flex-start',
      zIndex: '999',
      bottom: '0',
      gap: '3rem',
    },
    stylesButton: {
      height: '6',
      width: '6',
      background: "none",
      color: "var(--primary-white)",
      cursor: 'pointer',
      _hover: {
        color: 'var(--background-button)'
      }
    }
  }

  return (
    <Flex
      sx={styles.stylesFlex}
    >
      <Box alignSelf='center'>
        <Icon as={BsBuildings} sx={styles.stylesButton} />
      </Box>
      <Box alignSelf='center'>
        <Icon as={BsClipboard2Data} sx={styles.stylesButton} />
      </Box>

    </Flex>

  );
}