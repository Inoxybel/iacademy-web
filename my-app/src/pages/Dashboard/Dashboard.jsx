import {
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
  VStack,
  useMediaQuery
} from '@chakra-ui/react';
import React from 'react';
import Menu from '../Menu';
import PaginationComponent from './PaginationComponent';
import useDashboardInitialization from './UseDashboardInitialization';
import CardComponentCursoIniciado from './CardComponenteCursoIniciado';

function DashboardBody() {
  const { listaCursosNaoMatriculadosParaRenderizar, listaCursosMatriculadosParaRenderizar, isLoading } = useDashboardInitialization()

  const [isSmOrMd] = useMediaQuery('(max-width: 55em)');
  const [isMobile] = useMediaQuery('(max-width: 440px)');

  return (
    <Container overflow={isSmOrMd ? "auto" : "none"}>
      {
        isLoading ? (
          <>
            <Center>
              <Heading as='h1'
                fontSize='48'
                my='15'
              >
                Dashboard
              </Heading>
            </Center>
            <Flex
              flexDir={isSmOrMd ? 'column' : 'row'}
              mt={isSmOrMd ? '2rem' : '1rem'}
              justifyContent={'center'}
              columnGap={isSmOrMd ? '0' : '2rem'}
              rowGap={isSmOrMd ? '7rem' : '0'}
            >
              <Skeleton>
                <VStack alignItems="center" >
                  <Heading as="h2" size="sm" mb="2">
                    Treinamentos em andamento
                  </Heading>
                  {listaCursosMatriculadosParaRenderizar.data !== undefined && listaCursosMatriculadosParaRenderizar.data.length !== 0 ? (
                    listaCursosMatriculadosParaRenderizar.data.map((curso, index) => (
                      <CardComponentCursoIniciado key={index} curso={curso} />
                    ))
                  ) : (
                    <Text>Você ainda não esta matriculado em algum treinamento</Text>
                  )}
                </VStack>
              </Skeleton>
              <Skeleton>
                <VStack alignItems="center" >
                  <Flex flexDir="column"  >
                    <Heading
                      as="h2"
                      size="sm"
                      mb="1rem"
                    >
                      Treinamentos Disponíveis
                    </Heading>
                    <Flex w='100%'>
                      <Input
                        w='100%'
                        variant="filled"
                        size={isSmOrMd ? "sm" : "md"}
                        border="none"
                        borderRadius={5}
                        borderColor="#0880A2"
                        mb="1rem"
                        mr={2}
                      />
                      <Button bg="#0880A2" color="white" size={isSmOrMd ? "sm" : "md"} borderRadius={12}>
                        Pesquisar
                      </Button>
                    </Flex>
                  </Flex>
                  <Flex >

                    {listaCursosNaoMatriculadosParaRenderizar.data !== undefined && listaCursosNaoMatriculadosParaRenderizar.data.length !== 0 ? (
                      <PaginationComponent
                        items={listaCursosNaoMatriculadosParaRenderizar.data}
                      />
                    ) : (
                      <Text>Não há treinametos disponíveis para você</Text>
                    )}
                  </Flex>
                </VStack>
              </Skeleton>
            </Flex>
          </>
        ) : (
          <>
            <Center>
              <Heading as='h1'
                fontSize='48'
                my='15'
              >
                Dashboard
              </Heading>
            </Center>
            <Flex
              flexDir={isSmOrMd ? 'column' : 'row'}
              mt={isSmOrMd ? '2rem' : '1rem'}
              justifyContent={'center'}
              columnGap={isSmOrMd ? '0' : '2rem'}
              rowGap={isSmOrMd ? '7rem' : '0'}
            >
              <VStack alignItems="center" >
                <Heading as="h2" size="sm" mb="2">
                  Treinamentos em andamento
                </Heading>
                {listaCursosMatriculadosParaRenderizar.data !== undefined && listaCursosMatriculadosParaRenderizar.data.length !== 0 ? (
                  listaCursosMatriculadosParaRenderizar.data.map((curso, index) => (
                    <CardComponentCursoIniciado key={index} curso={curso} />
                  ))
                ) : (
                  <Text>Você ainda não esta matriculado em algum treinamento</Text>
                )}
              </VStack>
              <VStack alignItems="center" >
                <Flex flexDir="column"  >
                  <Heading
                    as="h2"
                    size="sm"
                    mb="1rem"
                  >
                    Treinamentos Disponíveis
                  </Heading>
                  <Flex w='100%'>
                    <Input
                      w='100%'
                      variant="filled"
                      size={isSmOrMd ? "sm" : "md"}
                      border="none"
                      borderRadius={5}
                      borderColor="#0880A2"
                      mb="1rem"
                      mr={2}
                    />
                    <Button bg="#0880A2" color="white" size={isSmOrMd ? "sm" : "md"} borderRadius={12}>
                      Pesquisar
                    </Button>
                  </Flex>
                </Flex>
                <Flex >
                  {listaCursosNaoMatriculadosParaRenderizar.data !== undefined && listaCursosNaoMatriculadosParaRenderizar.data.length !== 0 ? (
                    <PaginationComponent
                      items={listaCursosNaoMatriculadosParaRenderizar.data}
                    />
                  ) : (
                    <Text>Não há treinametos disponíveis para você</Text>
                  )}
                </Flex>
              </VStack>
            </Flex>
          </>
        )

      }
    </Container>
  );
}

function Dashboard() {
  return (<>
    <Menu />
    <DashboardBody />
  </>

  );
}

export default Dashboard;
