// TyperAnimation.js
import React from "react";
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import styles from "../styles";

export default function TyperAnimation({frase}) {
  
  const [typeEffect] = useTypewriter({
    words: frase,
    loop: 1,
    typeSpeed: 10,
    deleteSpeed: 1,
  });

  return (
    <div>
      <h1>
        
        <span sx={styles.typeEffectFrase}>{typeEffect}</span>
        <Cursor></Cursor>
      </h1>
    </div>
  )
}

