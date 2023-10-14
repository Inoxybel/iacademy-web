import axios from "axios";

const api = axios.create({baseURL:" https://iacademy-user-v1-api.azurewebsites.net/"})

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
export {
    logar,
    cadastrar
}