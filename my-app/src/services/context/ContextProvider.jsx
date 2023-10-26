import React, { useState, useContext, createContext } from 'react';
import { atualizarConteudo, corrigirExercicio, pegarConteudoPorId, pegarExercicioPorId, pegarFeedbackDeExercicio, pegarSumario, pegarTodosConteudosPorSumario } from '../Fetchers/FetchersApp';
import { useNavigate } from 'react-router-dom';

const ContextGeral = createContext();

function ContextProvider({ children }) {

    const [exercicioConteudoSelecionado, setExercicioConteudoSelecionado] = useState();
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
            navigate("/login")
           }
        }
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
            if(error.response.status===401){
                navigate("/login")
               }
        }
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
            if(error.response.status===401){
                navigate("/login")
               }
        }
    }

    async function SolicitarExercicioPorID(exerciseID) {
        try {
            const response = await pegarExercicioPorId(exerciseID);
            if(response.status===401){
                navigate('/login')
            }
            if (response.status === 200) {
                const exercicio = response.data
                setExercicioConteudoSelecionado(exercicio)
            } else {
                throw new Error(`Erro ao buscar dados para o exerciseID ${exerciseID}`);
            }
        } catch (error) {
            if(error.response.status===401){
                navigate("/login")
               }
        }
    }

    async function CriarCorrecaoPorExerciseId(exerciseID, respostas) {
        try {
            const response = await corrigirExercicio(exerciseID,respostas);
            if(response.status===401){
                navigate('/login')
            }
            if (response.status === 201) {
                const feedback = response.data;
                return feedback;
            } 
        } catch (error) {
            if(error.response.status===401){
                navigate("/login")
               }
            console.log(error)
         
        }
    }

    async function SolicitarAtualizaçãoConteudoId(conteudoId,index) {
        try {
            const response = await atualizarConteudo(conteudoId,index);
            if(response.status===401){
                navigate('/login')
            }
            if (response.status === 204) {
                     
                       return true
            } else {
                console.log(`Erro ao obter novo conteudo criado`);
            }
        } catch (error) {
            console.error(error);
            if(error.response.status===401){
                navigate("/login")
               }
        }
    }
    
    async function CorrecaoPorCorrectionId(correctionID) {
        try {
            const response = await pegarFeedbackDeExercicio(correctionID);
            if(response.status===401){
                navigate('/login')
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
                navigate("/login")
               }
        }
    }

    

    return (
        <ContextGeral.Provider
            value={{
                SolicitarConteudoPorId,
                SolicitarExercicioPorID,
                SolicitarSumario,
                SolicitarConteudosPorSumario,
                setExercicioConteudoSelecionado,
                exercicioConteudoSelecionado,
                CorrecaoPorCorrectionId,
                CriarCorrecaoPorExerciseId,
                SolicitarAtualizaçãoConteudoId,
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




