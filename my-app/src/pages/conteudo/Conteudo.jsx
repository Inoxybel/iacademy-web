import {
    Flex
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContextProvider from '../../services/context/ContextProvider';
import Sidebar from "./SideBar";
import ConteudoOuExercicio from "./ConteudoOuExercicio";
import { SelecaoProvider } from './ConteudoContext';
import Cookies from "universal-cookie";

const App = () => {
    const cookies = new Cookies();
    const { id } = useParams();
    const [idExercicioSelecionado, setIdExercicioSelecionado] = useState();
    const [aberto, setAberto] = useState(true);
    
    useEffect(()=>{
        var exercicio = cookies.get("exercicio_atual")
        if(exercicio){
            setIdExercicioSelecionado(exercicio)
        }
    },[])

    return (
        <ContextProvider>
        <SelecaoProvider>
            <Flex w={"100%"} ml={aberto ?  "19.8rem" : "0"}  >
                <Sidebar onSetAberto={setAberto} idSumario={id} onSetIdExercicioSelecionado={setIdExercicioSelecionado} />
                <ConteudoOuExercicio idExercicioSelecionado={idExercicioSelecionado} />
            </Flex>
        </SelecaoProvider>
    </ContextProvider>
    );
};

export default App;