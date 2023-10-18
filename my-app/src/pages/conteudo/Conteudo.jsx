import {
    Flex
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ContextProvider from '../../services/context/ContextProvider';
import Sidebar from "./SideBar";
import Tela from "./Tela";
import { SelecaoProvider } from './ConteudoContext';

const App = () => {
    const { id } = useParams();
    const [idExercicioSelecionado, setIdExercicioSelecionado] = useState();
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