'use client'

import React from 'react'

import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Image,
  chakra,
  VisuallyHidden,
  Input,
  IconButton,
  Link, 
} from '@chakra-ui/react'
import { BiMailSend } from 'react-icons/bi'
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import logo_iacademy from "../../assets/logo-iacademy.png"

const Logo = (props) => {
  return (
    <Image w={["250px"]} src={logo_iacademy} alt='logo da IAcademy' />
  )
}

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function LargeWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'8xl'} py={10} px={10} >
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Logo />
            </Box>
            <Text fontSize={'sm'}>© 2023 IAcademy. All rights reserved</Text>
            <Stack direction={'row'} spacing={6} px={6}>
              <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/groups/9515487/'}>
                <FaLinkedin />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'https://www.youtube.com/@iacademy-tech'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'https://www.instagram.com/iacademy.tech/'}>
                <FaInstagram />
              </SocialButton>
              <SocialButton label={'E-mail'} href={'mailto:contato@iacademy.tech'}>
                <BiMailSend />
              </SocialButton>
            </Stack>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link _hover={{ cursor: "pointer"}} href={'https://www.linkedin.com/in/th-agomatos/'}>
              Thiago Matos
            </Link>
            <Box as="a" href={'https://www.linkedin.com/in/dev-lucas-costa/'}>
              Lucas Costa
            </Box>
            <Box as="a" href={'https://www.linkedin.com/in/igor-everton-s-479a90105/'}>
              Igor Everton
            </Box>
            <Box as="a" href={'https://www.linkedin.com/in/andrew-rian-27a0b6228/'}>
              Andrew Maia
            </Box>
            <Box as="a" href={'https://www.linkedin.com/in/vinicius-prado-mendes/'}>
              Vinicius Prado
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Box as="a" href={'#'}>
              Privacy Policy
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
          <ListHeader>Partners</ListHeader>
            <Box as={"a"} >
              you can be the first =)
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}