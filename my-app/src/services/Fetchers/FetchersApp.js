import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

async function getTokenAsync() {
   try {
      const token = await cookies.get("token");
      return token;
   } catch (error) {
      throw error;
   }
}

async function setAuthorizationHeader(api) {
   const token = await getTokenAsync();
   if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
}


const api = axios.create({
   baseURL: "https://iacademy-v1-api.azurewebsites.net/api",
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

const pegarExerciciosPendentes = async ()=>{
   await setAuthorizationHeader(api);
   return api.get('/exercise/type/Pendency')
}

const pegarConfiguracao = (idConfiguracao) =>{
   return api.get(`/api/configurations/${idConfiguracao}`, {
      headers: {
         'Content-Type': 'application/json',
         'accept': '*/*',
      },
    });
}

const atualizarConfiguracao = (idConfiguracao) =>{
   return api.put(`/api/configurations/${idConfiguracao}`)
}

const novaConfiguracao = (obj) =>{
   return api.post(`/api/configurations`,obj)
}

 export{
   pegarExerciciosPendentes,
   cursosDisponiveis,
   cursosMatriculados,
   matricularEmCurso,
   pegarSumario,
   pegarTodosConteudosPorSumario,
   pegarConteudoPorId,
   pegarExercicioPorId,
   corrigirExercicio,
   atualizarConteudo,
   pegarFeedbackDeExercicio,
   pegarConfiguracao,
   atualizarConfiguracao,
   novaConfiguracao
}
 
