import React, { useState } from "react";
import Menu from '../Menu';
import {Flex} from '@chakra-ui/react'
import MenuPendencia from "./MenuPendencia";
import Questionario from '../exercicios/questionario/Questionario'
const Pendencia =()=>{

    const [exercicioPendente,setExercicioPendente] = useState(null);

    return(
        <>
        <Flex w={['0px','0px','0px','45px']}>
        <Menu />
        </Flex> 
            <MenuPendencia onSetExercicioPendente={setExercicioPendente}/>
            <Questionario idExercicio={exercicioPendente}/>
        </>
    )
}


export default Pendencia