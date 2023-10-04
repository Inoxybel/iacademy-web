import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Função para obter o token de forma assíncrona
async function getTokenAsync() {
   try {
      const token = await cookies.get("token");
      return token;
   } catch (error) {
      throw error;
   }
}

// Função para adicionar o token ao cabeçalho de autorização
async function setAuthorizationHeader(api) {
   const token = await getTokenAsync();
   if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
}

// Funções da API

const api = axios.create({
   baseURL: "https://iacademy-api.azurewebsites.net/api",
});

const cursosDisponiveis = async () => {
   await setAuthorizationHeader(api);
   return api.get(`/summary/available`);
}

const cursosMatriculados = async () => {
   await setAuthorizationHeader(api);
   return api.get('/summary/enrolled');
}


const matricularEmCurso= (idSumario) =>{
 
   const obj = {
      summaryId: idSumario
    }
   return api.post('/summary/enroll',obj,{
      headers: {
         'Content-Type': 'application/json',
         accept: '*/*',
       },
   })
}

const pegarSumario=async (idSumario)=>{
   await setAuthorizationHeader(api);
   return api.get(`/summary/${idSumario}`)
}

const pegarTodosConteudosPorSumario =async (id) =>{
   await setAuthorizationHeader(api);
   return api.get(`/content/summary/${id}`)
}

const pegarConteudoPorId= async (idConteudo) =>{
   await setAuthorizationHeader(api);
   return api.get(`/content/${idConteudo}`)
}

const pegarExercicioPorId=async (idExercicio)=>{
   await setAuthorizationHeader(api);
   return api.get(`/exercise/${idExercicio}`);
}

const corrigirExercicio=async (idExercicio,respostas)=>{
   await setAuthorizationHeader(api);
   return api.post(`/ai/exercise/${idExercicio}/request-correction`,respostas,{
      headers: {
         'Content-Type': 'application/json',
         'accept': '*/*',
     },
   })
}


const atualizarConteudo=async (idConteudo,indice)=>{
   await setAuthorizationHeader(api);
   return api.post(`/ai/content/${idConteudo}/new-content`,
   {
      "subcontentIndex": indice
    }
   )
}

const pegarFeedbackDeExercicio =async (idCorrecao)=>{
   await setAuthorizationHeader(api);
   return api.get(`/correction/${idCorrecao}`)
}

 export{
   cursosDisponiveis,
   cursosMatriculados,
   matricularEmCurso,
   pegarSumario,
   pegarTodosConteudosPorSumario,
   pegarConteudoPorId,
   pegarExercicioPorId,
   corrigirExercicio,
   atualizarConteudo,
   pegarFeedbackDeExercicio
}
 
