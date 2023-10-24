import { useState, useEffect } from 'react';
import useDasboard from "./UseDasboard";

const useDashboardInitialization = () => {
  const { SolicitarListaCursosDisponiveis, SolicitarListaCursosMatriculados } = useDasboard();

  const [listaCursosNaoMatriculadosParaRenderizar, setListaCursosNaoMatriculadosParaRenderizar] = useState([]);
  const [listaCursosMatriculadosParaRenderizar, setListaCursosMatriculadosParaRenderizar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const listaTodosOsCursosDisponiveisRetornado = await SolicitarListaCursosDisponiveis();
      const listaCursosMatriculados = await SolicitarListaCursosMatriculados();

      setListaCursosMatriculadosParaRenderizar(listaCursosMatriculados);
      setListaCursosNaoMatriculadosParaRenderizar(listaTodosOsCursosDisponiveisRetornado);
    };

    fetchData();
  }, []);
  
  return {
    listaCursosNaoMatriculadosParaRenderizar,
    listaCursosMatriculadosParaRenderizar,
  };
};

export default useDashboardInitialization;
