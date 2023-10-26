import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import Menu from "../Menu.jsx";
import formStyles from "../../styles/formStyles.js";
import FormularioSenha from "./FormularioSenha.jsx";
import ModalConfirmacao from "./ModalConfirmacao.jsx";
import usePerfil from "./UsePerfil.jsx";
import { SENHA_ALTERAR } from "./PerfilReducer.jsx";

function Perfil() {

  const { state, dispatch, CAMPO_ALTERAR, LIMPAR_SENHA, LISTA_ATUALIZAR, SENHA_CONFIRMAR, pegarUsuarioPorIdController, atualizarUsuarioPorIdController } = usePerfil();
  const { isOpen: isModalSenhaOpen, onOpen: onModalSenhaOpen, onClose: onModalSenhaClose } = useDisclosure()
  const { isOpen: isModalConfirmacaoOpen, onOpen: onModaConfirmacaoOpen, onClose: onModalConfirmacaoClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const cancelRef = React.useRef(null)

  return (
    <>
      <Menu />
      <Box sx={{ ...formStyles.formFather }} >
        <Menu sx={{ ...formStyles.menu }} />
        <Heading sx={{ ...formStyles.formTitle }} >Perfil do Usuário</Heading>
        <Box sx={{ ...formStyles.formCadastro }} >
          <FormControl id="nomeCompleto" sx={{ ...formStyles.formControl }}>
            <FormLabel sx={{ ...formStyles.formLabel }}>Nome Completo</FormLabel>
            <Input sx={{ ...formStyles.input }}
              type="text"
              value={state.formulario.name===""?"Carregando...":state.formulario.name}
              onChange={(e) => {
                dispatch({
                  type: CAMPO_ALTERAR,
                  payload: { campo: 'name', valor: e.target.value }
                })
              }}
              variant="filled"
            />
          </FormControl>
          <FormControl id="cnpj" sx={{ ...formStyles.formControl }}>
            <FormLabel sx={{ ...formStyles.formLabel }}>CNPJ da Empresa</FormLabel>
            <Input sx={{ ...formStyles.input }}
              type="text"
              value={state.formulario.companyRef===""?"Carregando...":state.formulario.companyRef}
              onChange={(e) => {
                dispatch({
                  type: CAMPO_ALTERAR,
                  payload: { campo: 'companyRef', valor: e.target.value }
                })
              }}
              variant="filled"
            />
          </FormControl>
    
          <FormControl id="email" sx={{ ...formStyles.formControl }}>
            <FormLabel sx={{ ...formStyles.formLabel }}>Email</FormLabel>
            <Input sx={{ ...formStyles.input }}
              type="email"
              value={state.formulario.email===""?"Carregando...":state.formulario.email}
              onChange={(e) => {
                dispatch({
                  type: CAMPO_ALTERAR,
                  payload: { campo: 'email', valor: e.target.value }
                })
              }}
              variant="filled"
            />
          </FormControl>
          <Button
            sx={{ ...formStyles.buttonEnviar }}
            onClick={() => {
              onModaConfirmacaoOpen()
            }}>
            Salvar Alterações
          </Button>
          <Button
            sx={{ ...formStyles.buttonEnviar }}
            onClick={onModalSenhaOpen}
          >
            Alterar senha
          </Button>
          <ModalConfirmacao
            onClose={onModalConfirmacaoClose}
            isOpen={isModalConfirmacaoOpen}
            cancelRef={cancelRef}
            state={state}
            dispatch={dispatch}
            LISTA_ATUALIZAR={LISTA_ATUALIZAR}
            LIMPAR_SENHA={LIMPAR_SENHA}
            SENHA_CONFIRMAR={SENHA_CONFIRMAR}
            pegarUsuarioPorIdController={pegarUsuarioPorIdController}
            atualizarUsuarioPorIdController={atualizarUsuarioPorIdController}
          />
          <FormularioSenha 
          onClose={onModalSenhaClose} 
          isOpen={isModalSenhaOpen} 
          initialRef={initialRef} 
          finalRef={finalRef} 
          state={state}
          dispatch={dispatch}
          SENHA_ALTERAR={SENHA_ALTERAR} 
          LIMPAR_SENHA={LIMPAR_SENHA}/>
        </Box>
      </Box>
    </>
  );
}

export default Perfil;