import { FormControl, FormLabel, Switch, useMediaQuery } from '@chakra-ui/react';

export default function () {

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  const styles = {

    form: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      gridArea: '1 / 3 / 4 / 7',
    },
    switch: {
      marginLeft: '0.5rem'
    },
  }

  return (
    <FormControl sx={styles.form} >
      <FormLabel fontSize='0.85rem'>
        Ativar pendencias
        <Switch id='pendencias' sx={styles.switch} colorScheme='green' />
      </FormLabel>
    </FormControl>
  )
}