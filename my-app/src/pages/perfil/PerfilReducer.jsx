const LISTA_INICIAR = "LISTA_INICIAR";
const CAMPO_ALTERAR = "CAMPO_ALTERAR";
const SENHA_ALTERAR = "SENHA_ALTERAR";
const LIMPAR_SENHA = "LIMPAR_SENHA";
const SENHA_CONFIRMAR="SENHA_CONFIRMAR";
const LISTA_ATUALIZAR="LISTA_ATUALIZAR";

const estado ={
    formulario:{
        id:"",
        name:"",
        companyRef:"",
        email:'',
        password:""
    },
    formularioSenha:{
        semhaAtual:"",
        novaSenha:"",
        novaSenhaConfirmar:""
    }

}

const perfilReducer = (state,action)=>{
    if(action.type===LISTA_INICIAR){
        return{
            ...state,formulario:{
                ...state.formulario,
                id:action.payload.id,
                name:action.payload.name,
                companyRef:action.payload.companyRef,
                email:action.payload.email,
                cpf:action.payload.cpf
            }
           
        }
    }
    else if(action.type===CAMPO_ALTERAR){
        const novoEstado = {
            ...state,
            formulario: {
              ...state.formulario,
              [action.payload.campo]: action.payload.valor
            }
          };
        return novoEstado
    }
    else if(action.type===SENHA_ALTERAR){
        const novoEstado={
            ...state,
            formularioSenha:{
                ...state.formularioSenha,
                [action.payload.campo]:action.payload.valor
            }
        }
        return novoEstado
    }
    else if(action.type===LIMPAR_SENHA){
         const novoEstado={
            ...state,
            formulario:{
                ...state.formulario,
                password:""
            },
            formularioSenha:{
                ...state.formularioSenha,
                senhaAtual:"",
                novaSenha:"",
                novaSenhaConfirmar:""
            }
         }
         return novoEstado
    }
    else if(action.type===SENHA_CONFIRMAR){
        const novoEstado={
            ...state,
            formulario:{
                ...state.formulario,
                password:action.payload.valor
            }
        }
        return novoEstado
    }
    else if(action.type===LISTA_ATUALIZAR){
        const novoEstado={
            ...state,
            formulario:{
                ...state.formulario,
                email:action.payload.email,
                companyRef:action.payload.companyRef,
                name:action.payload.name
            }
        }
        return novoEstado
    }
  }

  export {estado,perfilReducer,CAMPO_ALTERAR,LISTA_INICIAR,SENHA_ALTERAR,LIMPAR_SENHA,SENHA_CONFIRMAR,LISTA_ATUALIZAR}