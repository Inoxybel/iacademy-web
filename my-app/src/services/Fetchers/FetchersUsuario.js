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

const api = axios.create({baseURL:"https://iacademy-user-v1-api.azurewebsites.net/api"})

const logar =(dados)=>{
    return api.post(`/user/login`,dados);
}

const cadastrar = (dados) => {
    return api.post("/user", dados, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // Adicione o cabeçalho Accept aqui
      },
});
};

const atualizarUsuario = async (id,dados)=>{
    await setAuthorizationHeader(api);
    return api.put("/user/"+id,dados)
}

const pegarUsuarioPorId = async(id)=>{
   await setAuthorizationHeader(api)
   return api.get("/user/"+id)
}

const atualizarSenha = async(id,dados)=>{
   await setAuthorizationHeader(api)
   return api.put("/user/"+id+"/update-password",dados)
}
export {
    logar,
    cadastrar,
    atualizarUsuario,
    pegarUsuarioPorId,
    atualizarSenha
}