// TyperAnimation.js
import React from "react";
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { Text } from "@chakra-ui/react";
import styles from "../styles";

export default function TyperAnimation({ frase }) {

  const [typeEffect] = useTypewriter({
    words: frase,
    loop: 1,
    typeSpeed: 30,
    deleteSpeed: 1,
  });

  return (
    <Text sx={styles.typeEffectFrase}>{typeEffect}</Text>
  )
}

