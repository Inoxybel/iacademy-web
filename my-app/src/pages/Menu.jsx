import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  IconButton,
  Link as ChakraLink,
  Icon,
  Divider,
  useMediaQuery 
} from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiBook } from 'react-icons/bi';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function App() {  
  const [isSmOrMd] = useMediaQuery("(max-width: 60em)");
  return (
    <Flex
    pos="fixed"
    h={isSmOrMd ? '50px' : '100vh'}
    w={isSmOrMd ? '100vw' : '45px'}
    flexDirection={isSmOrMd ? 'column' : 'row'}
    bg="var(--background-menu)"
    left="0"
    right={isSmOrMd ? 'none' : '0'}
    zIndex="999"
    bottom="0"
    overflow={isSmOrMd ? 'auto' : 'hidden'}
    justifyContent="space-around"
  >
    <Flex
      flexDirection={isSmOrMd ? 'row' : 'column'}
      alignItems={isSmOrMd ? 'center' : 'flex-start'}
      as="nav"
      mt={isSmOrMd ? '0' : '10'}
      ml={isSmOrMd ? '5' : '0'}
      justifyContent="flex-start"
      gap={"3rem"}
      
    >
      {
  !isSmOrMd && (
    <>
      <IconButton
        background="none"
        _hover={{ background: 'none' }}
        icon={<HamburgerIcon w={6} h={6}  mt={5} mb={isSmOrMd ? 5 : 3} ml={2} />}
      />
      <Divider
        w={isSmOrMd ? '15' : '70%'}
        alignSelf="center"
      />
    </>
  )
}

     
      <ChakraLink
        as={RouterLink}
        to="/pendencia"
        p={3}
        borderRadius={8}
        _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
        w="100%"
      >
        <Flex alignItems="center">
          <Icon as={BiBook} fontSize="xl" h={5} w={5} />
        </Flex>
      </ChakraLink>
      <Divider 
        w={isSmOrMd ? '15' : '70%'}
        alignSelf={"center"}
      />
      <ChakraLink
        as={RouterLink}
        to="/dashboard"
        p={3}
        borderRadius={8}
        _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
        w="100%"
      >
        <Flex alignItems="center">
          <Icon as={AiFillHome} fontSize="xl"  h={5} w={5} />
        </Flex>
      </ChakraLink>
      <Divider 
        w={isSmOrMd ? '15' : '70%'}
        alignSelf={"center"}
      />
      <ChakraLink
        as={RouterLink}
        to="/perfil"
        p={3}
        borderRadius={8}
        _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
        w="100%"
      >
        <Flex alignItems="center">
          <Icon as={BsFillPersonFill} fontSize="xl" h={6} w={6} />
        </Flex>
      </ChakraLink>
    </Flex>
  </Flex>
);
}