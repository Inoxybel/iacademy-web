import {useEffect, useReducer, useState} from "react";
import Cookies from "universal-cookie";
import { estado,perfilReducer,CAMPO_ALTERAR,LISTA_INICIAR,SENHA_ALTERAR,LIMPAR_SENHA,SENHA_CONFIRMAR,LISTA_ATUALIZAR } from "./PerfilReducer";
import { atualizarUsuario, pegarUsuarioPorId } from "../../services/Fetchers/FetchersUsuario";
import { useNavigate } from "react-router-dom";


const usePerfil = ()=>{
  const [state,dispatch] = useReducer(perfilReducer,estado);
  const cookies = new Cookies();
  const userCoockie = cookies.get("user");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
        
        const user = await pegarUsuarioPorIdController(userCoockie.id);
        try {
            const obj = {
                'id': user.id,
                'name': user.name,
                'companyRef': user.companyRef,
                'cpf': userCoockie.cpf,
                'email': user.email
            };
            dispatch({type:LISTA_INICIAR,payload:{...obj}})
          
        } catch (error) {
            console.error('Erro ao buscar informações do usuário', error);
        }
    };
  
    fetchUserData();
}, []);

  const pegarUsuarioPorIdController = async (id)=>{
    try {
        const response =await pegarUsuarioPorId(id);
         
         if(response.status===200){
            const user = response.data
            return user
         }
    } catch (error) {
        if (error.response.status === 400) {
            const errorData = error.response.data;
            return errorData;
        } else if (error.response.status === 401) {
            navigate("/login");
        } else if (error.response.status === 404) {
            alert("Não encontrado");
        } else if (error.response.status === 500) {
            alert("Ocorreu um erro do nosso lado. Já resolveremos");
        }
    }
}

async function atualizarUsuarioPorIdController(user_id,dados) {
 
    try {
      const response = await atualizarUsuario(user_id,dados);
      if (response.status === 204) {
        return {result:"ATUALIZADO"};
      } 
  } catch (error) {
    if (error.response.status === 400) {
        const errorData = error.response.data;
        return {result:errorData};

    } else if (error.response.status === 401) {
        navigate("/login");
    } else if (error.response.status === 404) {
        alert("Não encontrado");
    } else if (error.response.status === 500) {
        alert("Ocorreu um erro do nosso lado. Já resolveremos");  
    }
    }
  }

  
  

  return{
    state,dispatch,atualizarUsuarioPorIdController,pegarUsuarioPorIdController,CAMPO_ALTERAR,SENHA_ALTERAR,LIMPAR_SENHA,SENHA_CONFIRMAR,LISTA_ATUALIZAR
  }
}



export default usePerfil