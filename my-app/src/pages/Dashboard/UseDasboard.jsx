import {
    useMediaQuery
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { cursosDisponiveis, cursosMatriculados, matricularEmCurso } from '../../services/Fetchers/FetchersApp';


const useDasboard = ()=>{
    const navigate = useNavigate();
    const [isSmOrMd] = useMediaQuery('(max-width: 108em)');
  
    function RedirecionaParaConteudoPorIdSumarioMatriculado(idSumario) {
      navigate('/conteudo/' + idSumario);
    }
  
    async function SolicitarListaCursosDisponiveis() {
      try {
        const response = await cursosDisponiveis();
        if (response.status === 401) {
          navigate("/")
        }
        if (response && response.data) {
          const dados = response.data;
          return dados;
        } else {
          return [];
        }
      } catch (error) {
        
        if (error.response.status === 401) {
          navigate("/")
        }
        else{
          return []
        }
      }
    }
  
    async function SolicitarListaCursosMatriculados() {
      try {
        const response = await cursosMatriculados();
        if (response.status === 401) {
          navigate("/")
        }
        if (response.status === 200 && response.data) {
          const dados = response.data;
          return dados;
        } else if (response.status === 404) {
          return [];
        }
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/")
        }else{
          return []
        }
      }
    }
  
      async function matricularEmCursos(idSumario) {
      try {
        const response = await matricularEmCurso(idSumario);
        if (response.status === 201) {
          const novoIdSumarioMatriculado = response.data;
          console.log(novoIdSumarioMatriculado);
          return novoIdSumarioMatriculado;
        } else {
          throw new Error(`Erro ao criar o novo id de sumário`);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          navigate("/")
        }
      }
    }
  
    function verificarSincronizaçãoDeCursos(
      listaTodosCursosCadastradados,
      listaCursosMatriculados
    ) {
      const cursosDisponiveisNaoIniciados = listaTodosCursosCadastradados.filter(
        cursoDisponivel => {
          return !listaCursosMatriculados.some(
            cursoIniciado => cursoIniciado.theme === cursoDisponivel.theme
          );
        }
      );
      return cursosDisponiveisNaoIniciados;
    }



    return({
        matricularEmCursos,
        SolicitarListaCursosDisponiveis,
        SolicitarListaCursosMatriculados,
        verificarSincronizaçãoDeCursos,
        RedirecionaParaConteudoPorIdSumarioMatriculado,
        isSmOrMd,
    })
}

export default useDasboard