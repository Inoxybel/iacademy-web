import {
    Box,
    Flex
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../conteudo/SideBar";
import ContextProvider from '../context/ContextProvider';
import { SelecaoProvider, useSelecaoContext } from './ConteudoContext';
import Tela from "./Tela.js";

const App = () => {
    const { id } = useParams();
    const [idExercicioSelecionado, setIdExercicioSelecionado] = useState();
    // const { isSidebarVisible } = useSelecaoContext();
    const [aberto, setAberto] = useState(true);


    return (
        <ContextProvider>
            <SelecaoProvider>
                <Flex w={"100%"} ml={aberto ?  "19.8rem" : "0"}  >
                    <Sidebar onSetAberto={setAberto} idSumario={id} onSetIdExercicioSelecionado={setIdExercicioSelecionado} />
                    <Tela idExercicioSelecionado={idExercicioSelecionado} />
                </Flex>
            </SelecaoProvider>
        </ContextProvider>
    );
};

export default App;