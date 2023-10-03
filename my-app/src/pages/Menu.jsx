import React, { useState, } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Text,
  IconButton,
  Link as ChakraLink,
  Icon,
  MenuButton,
  Menu,
  Divider,
  Grid,
  useMediaQuery
} from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiBook } from 'react-icons/bi';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useGeralContext } from './context/ContextProvider';
import { useParams } from 'react-router-dom';

export default function App() {

  const [isSmOrMd] = useMediaQuery("(max-width: 960px)");

  const stylesFlex = {
    position: 'fixed',
    left: '0',
    right: isSmOrMd ? 'none' : '0',
    h: isSmOrMd ? '4rem' : '100%',
    w: isSmOrMd ? '100%' : '45px',
    flexDirection: isSmOrMd ? 'row' : 'column',
    overflow: isSmOrMd ? 'auto' : 'hidden',
    alignItems: isSmOrMd ? 'center' : 'flex-start',
    justifyContent: isSmOrMd ? 'space-around' : 'flex-start',
    bg: '#262734',
    zIndex: '999',
    bottom: '0',
    gap: '3rem',
  }

  return (
    <Flex
      sx={{ ...stylesFlex }}
    >

      <IconButton
        background="none"
        _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
        icon={<HamburgerIcon w={6} h={6} color="white" mt={5} mb={isSmOrMd ? 5 : 3} />}

      />
      <Divider
        w={isSmOrMd ? '0' : '70%'}
        alignSelf={"center"}
      />
      <ChakraLink
        as={RouterLink}
        to="/dashboard"
        p={3}
        borderRadius={8}
        _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}

      >
        <Flex alignItems="center">
          <Icon as={AiFillHome} color="#0880A2" h={5} w={5} />
        </Flex>
      </ChakraLink>
      <Divider
        w={isSmOrMd ? '0' : '70%'}
        alignSelf={"center"}
      />
      <ChakraLink
        as={RouterLink}
        to="/perfil"
        p={3}
        borderRadius={8}
        _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}

      >
        <Flex alignItems="center">
          <Icon as={BsFillPersonFill} fontSize="xl" color="#0880A2" h={6} w={6} />
        </Flex>
      </ChakraLink>
    </Flex>

  );
}