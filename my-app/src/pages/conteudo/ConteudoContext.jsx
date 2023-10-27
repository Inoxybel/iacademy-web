import React, { createContext, useContext, useState } from 'react';

const ConteudoContext = createContext();

export const useSelecaoContext = () => {
  return useContext(ConteudoContext);
};


export const SelecaoProvider = ({ children }) => {
  const [selecao, setSelecao] = useState('conteudo'); // 'conteudo' ou 'exercicio'
  const selecionar = (opcao) => {
    setSelecao(opcao);
  };


  return (
    <ConteudoContext.Provider value={{ selecao, selecionar }}>
      {children}
    </ConteudoContext.Provider>
  );
};
