import { Box, Flex } from "@chakra-ui/react";
import styles from '../../styles'
import { TypeAnimation } from 'react-type-animation';
export default function MissaoEVisao() {
  return (
  
  <Flex backgroundColor={"green"} w={"100vw"}>
    
      <TypeAnimation
        sequence={[
         
          'We produce food for Mice',
          1000, 
          'We produce food for Hamsters',
          1000,
          'We produce food for Guinea Pigs',
          1000,
          'We produce food for Chinchillas',
          1000
        ]}
        wrapper="span"
        speed={100}
        style={{ fontSize: '2em', display: 'inline-block', color: "black" }}
        repeat={Infinity}
      />
  </Flex>
  );
}
