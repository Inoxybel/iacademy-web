import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const api = axios.create({
  baseURL: " https://iacademy-v1-api.azurewebsites.net",
});

function setAuthorizationHeader(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Função para obter o token dos cookies
function getTokenFromCookies() {
  return cookies.get("token") || null;
}

// Configurar o cabeçalho de autorização ao inicializar
async function initializeApi() {
  const token = getTokenFromCookies();
  if (token) {
    setAuthorizationHeader(token);
  }
}

// Chame esta função no ponto de inicialização do seu aplicativo
async function setupApi() {
  await initializeApi();
}

// Inicialize o API antes de usar qualquer função
setupApi();
const cursosDisponiveis= () =>{
    return api.get(`/summary/available`);
 } 

 const cursosMatriculados= () =>{
    return api.get('/summary/enrolled')
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

const pegarSumario= (idSumario) =>{
   return api.get(`/summary/${idSumario}`)
}

const pegarTodosConteudosPorSumario = (id) =>{
   return api.get(`/content/summary/${id}`)
}

const pegarConteudoPorId= (idConteudo) =>{
   return api.get(`/content/${idConteudo}`)
}

const pegarExercicioPorId= (idExercicio)=>{
   return api.get(`/exercise/${idExercicio}`);
}

const corrigirExercicio= (idExercicio,respostas)=>{
   return api.post(`/ai/exercise/${idExercicio}/request-correction`,respostas,{
      headers: {
         'Content-Type': 'application/json',
         'accept': '*/*',
     },
   })
}


const atualizarConteudo= (idConteudo,indice)=>{
   return api.post(`/ai/content/${idConteudo}/new-content`,
   {
      "subcontentIndex": indice
    }
   )
}

const pegarFeedbackDeExercicio = (idCorrecao)=>{
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
 
