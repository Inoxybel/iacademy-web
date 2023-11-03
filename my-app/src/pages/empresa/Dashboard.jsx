import React from 'react'
import { Flex, useMediaQuery, Text, Box, Img } from '@chakra-ui/react';
import MenuEmpresa from '../../Components/Empresa/MenuEmpresa';
import Cookies from 'universal-cookie';
import { useQuery } from 'react-query';
import { getCompanyById } from '../../services/Fetchers/FetchersCompany';

export default function App() {

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const styles = {
    flex: {
      color: 'var(--primary-fontColor)',
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
      backgroundColor: 'var(--background-card)',
      width: '100%',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      borderRadius: '0.2rem'
    },
  }

  const cookies = new Cookies();

  const token = cookies.get('token');
  const jwtPayload = JSON.parse(atob(token.split('.')[1]));
  const companyId = jwtPayload.Id;

  const { isLoading, error, data } = useQuery('companyData', () => getCompanyById(companyId))

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data)

  return (

    <>
      <MenuEmpresa />
      <Box>
        <Flex sx={styles.flex}>
          <Box sx={styles.groupsFlex}>
            <Text>Empresa: {data.data.name}</Text>
            <Text>CNPJ: {data.data.cnpj}</Text>
            <br />
            <Text>Informações do Plano</Text>
            <Text>Limite de Acessos: <span>{data.data.limitPlan}</span></Text>
            <br />
            <Text>Obsevações: Para quaisquer alterações em Planos ou Acessos, é necessario entrar em contato conosco.</Text>
          </Box>
        </Flex >
      </Box>
    </>

  )

}