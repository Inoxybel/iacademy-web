import { useState, useEffect } from 'react';
import useDasboard from "./UseDasboard";

const useDashboardInitialization = () => {
  const { SolicitarListaCursosDisponiveis, SolicitarListaCursosMatriculados } = useDasboard();

  const [listaCursosNaoMatriculadosParaRenderizar, setListaCursosNaoMatriculadosParaRenderizar] = useState([]);
  const [listaCursosMatriculadosParaRenderizar, setListaCursosMatriculadosParaRenderizar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const listaTodosOsCursosDisponiveisRetornado = await SolicitarListaCursosDisponiveis();
      const listaCursosMatriculados = await SolicitarListaCursosMatriculados();

      setListaCursosMatriculadosParaRenderizar(listaCursosMatriculados);
      setListaCursosNaoMatriculadosParaRenderizar(listaTodosOsCursosDisponiveisRetornado);
      setIsLoading(false); 
    };

    fetchData();
  }, []);
  
  return {
    listaCursosNaoMatriculadosParaRenderizar,
    listaCursosMatriculadosParaRenderizar,
    isLoading, 
  };
};

export default useDashboardInitialization;
