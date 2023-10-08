import React, { useState, useContext, createContext, useEffect } from 'react';
import { atualizarConteudo, corrigirExercicio, pegarConteudoPorId, pegarExercicioPorId, pegarFeedbackDeExercicio, pegarSumario, pegarTodosConteudosPorSumario } from '../Fetchers/FetchersApp';
import { useNavigate } from 'react-router-dom';






const ContextGeral = createContext();

function ContextProvider({ children }) {

    const [listaExerciciosPendentes, setListaExerciciosPendentes] = useState()
    const [listaDeCursos, setListaDeCursos] = useState(); // Defina os dados iniciais aqui
    const [listaConteudoPorSumario, setListaConteudoPorSumario] = useState();
    const [exercicioConteudoSelecionado, setExercicioConteudoSelecionado] = useState();
    const [feedbackAtual, setFeedbackAtual] = useState()
    const [conteudoSelecionado,setConteudoSelecionado] =useState()
    const navigate =useNavigate()
    async function SolicitarSumario(id) {
        try {
            const response = await pegarSumario(id);

            if (response && response.data) {
                const dados = response.data;
                return dados;

            } else {
                return null;
            }
        } catch (error) {
           if(error.response.status===401){
            navigate("/")
           }
        }
    }

    function atualizaListaExerciciosPendentes(exercise, theme) {
        const novoObj = { "theme": theme, "exercise": exercise }
        const novaListaExerciciosPendentes = [...listaExerciciosPendentes, novoObj]
        setListaExerciciosPendentes(novaListaExerciciosPendentes)
    }

    async function SolicitarConteudosPorSumario(id) {
        try {
            const response = await pegarTodosConteudosPorSumario(id);
            if(response.status===401){
                navigate('/')
            }
            if (response && response.data) {
                const dados = response.data;
                return dados;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erro ao solicitar conteudos do sumário:", error);
            if(error.response.status===401){
                navigate("/")
               }
        }
    }

    function exercicioSelecionadoParaMenu(exercicio) {
        const exercicioJSON = JSON.stringify(exercicio);
        sessionStorage.setItem('exercicioSelecionado', exercicioJSON);
    }


    async function SolicitarConteudoPorId(contentID) {
        try {
            const response = await pegarConteudoPorId(contentID);
            if(response.status===401){
                navigate('/')
            }
            if (response.status === 200) {
                setConteudoSelecionado(response.data)
            } else {
                throw new Error(`Erro ao buscar dados para o contentID ${contentID}`);
            }
        } catch (error) {
            console.error(error);
            if(error.response.status===401){
                navigate("/")
               }
        }
    }

    async function SolicitarExercicioPorID(exerciseID) {
        try {
            const response = await pegarExercicioPorId(exerciseID);
            if(response.status===401){
                navigate('/')
            }
            if (response.status === 200) {
                const exercicio = response.data
                setExercicioConteudoSelecionado(exercicio)
            } else {
                throw new Error(`Erro ao buscar dados para o exerciseID ${exerciseID}`);
            }
        } catch (error) {
            if(error.response.status===401){
                navigate("/")
               }
        }
    }

 
    async function CriarCorrecaoPorExerciseId(exerciseID, respostas) {
        try {
            console.log("o id do exercicío é: ",exerciseID)
            console.log("As respostas são:", respostas)
            const response = await corrigirExercicio(exerciseID,respostas);
            if(response.status===401){
                navigate('/')
            }
            if (response.status === 201) {
                const feedback = response.data;
                return feedback;
            } 
        } catch (error) {
            if(error.response.status===401){
                navigate("/")
               }
            console.log(error)
         
        }
    }


    
    async function SolicitarAtualizaçãoConteudoId(conteudoId,index) {
        try {
            const response = await atualizarConteudo(conteudoId,index);
            if(response.status===401){
                navigate('/')
            }
            if (response.status === 204) {
                        console.log('conteudo atualizado')
                       return true
            } else {
                console.log(`Erro ao obter novo conteudo criado`);
            }
        } catch (error) {
            console.error(error);
            if(error.response.status===401){
                navigate("/")
               }
        }
    }
    
    async function CorrecaoPorCorrectionId(correctionID) {
        try {
            const response = await pegarFeedbackDeExercicio(correctionID);
            if(response.status===401){
                navigate('/')
            }
            if (response.status === 200) {
                const feedback = response.data
                return feedback
            } else {
                throw new Error(`Erro ao retornar o feedback ${correctionID}`);
            }
        } catch (error) {
            console.error(error);
            if(error.response.status===401){
                navigate("/")
               }
        }
    }

    return (
        <ContextGeral.Provider
            value={{
                listaExerciciosPendentes,
                atualizaListaExerciciosPendentes,
                listaDeCursos,
                SolicitarConteudoPorId,
                SolicitarExercicioPorID,
                SolicitarSumario,
                listaConteudoPorSumario,
                SolicitarConteudosPorSumario,
                setExercicioConteudoSelecionado,
                exercicioConteudoSelecionado,
                exercicioSelecionadoParaMenu,
                CorrecaoPorCorrectionId,
                CriarCorrecaoPorExerciseId,
                SolicitarAtualizaçãoConteudoId,
                feedbackAtual,
                conteudoSelecionado
            }}
        >
            {children}
        </ContextGeral.Provider>
    );
}

export default ContextProvider;

export const useGeralContext = () => {
    const context = useContext(ContextGeral);
    if (!context) {
        throw new Error('useGeralContext deve ser usado dentro de um ContextProvider');
    }
    return context;
};




