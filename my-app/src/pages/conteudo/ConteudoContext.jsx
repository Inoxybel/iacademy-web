import React, { createContext, useContext, useState,useEffect } from 'react';
import Cookies from "universal-cookie";

const ConteudoContext = createContext();

export const useSelecaoContext = () => {
  return useContext(ConteudoContext);
};


export const SelecaoProvider = ({ children }) => {
  const [selecao, setSelecao] = useState(); 

  const cookies = new Cookies();

  useEffect(() => {
    const conteudoOuExercicioAtualCookie = cookies.get('conteudoOuExercicioAtual');
    
    setSelecao(conteudoOuExercicioAtualCookie || 'conteudo');
  }, []);
  const selecionar = (opcao) => {
    setSelecao(opcao);
  };


  return (
    <ConteudoContext.Provider value={{ selecao, selecionar }}>
      {children}
    </ConteudoContext.Provider>
  );
};
