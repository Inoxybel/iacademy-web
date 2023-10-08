import {
  Box, Flex, Icon, useMediaQuery, Text, Grid, Button
} from '@chakra-ui/react';
import MenuEmpresa from '../../Components/MenuEmpresa';
import SwitchPendencias from '../../Components/SwitchPendencias';
import Grupos from '../../Components/Grupos';
import AddGrupo from '../../Components/AddGrupo';

export default function App() {

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

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
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    subTitle: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      gridArea: '2 / 1 / 3 / 7',
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
    grid: {
      gridTemplateColumns: 'repeat(6, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      gridColumnGap: '0px',
      gridRowgap: '0px',
      backgroundColor: 'var(--background-form)',
      height: '6rem',
      borderRadius: '0.2rem',
      padding: '0.5rem',
    },
  }

  return (

    <>
      <MenuEmpresa />
      <Flex sx={styles.flex}>
        <Flex sx={styles.trainingFlex}>
          <Text as={'h2'} sx={styles.title}>Treinamentos</Text>
          <Grid sx={styles.grid}>
            <Text as={'h3'} sx={styles.subTitle}>{'MongoDB'}</Text>
            <SwitchPendencias />
          </Grid>
        </Flex>

        <Flex sx={styles.groupsFlex}>
          <Text as={'h2'} sx={styles.title}>Grupos</Text>

          <Grupos />

          <AddGrupo />

        </Flex>
      </Flex >
    </>

  )

}