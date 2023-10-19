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
import Menu from "../Menu.js";
import styles from "../styles.js";
import FormularioSenha from "./FormularioSenha.jsx";
import ModalConfirmacao from "./ModalConfirmacao.jsx";
import usePerfil from "./UsePerfil.jsx";

function Perfil() {

  const { state, dispatch, CAMPO_ALTERAR,LIMPAR_SENHA,LISTA_ATUALIZAR,SENHA_CONFIRMAR,pegarUsuarioPorIdController,atualizarUsuarioPorIdController } = usePerfil();
  const { isOpen: isModalSenhaOpen, onOpen: onModalSenhaOpen, onClose: onModalSenhaClose } = useDisclosure()
  const { isOpen: isModalConfirmacaoOpen, onOpen: onModaConfirmacaoOpen, onClose: onModalConfirmacaoClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const cancelRef = React.useRef(null)

  return (
    <>
      <Menu />
      <Box sx={{ ...styles.formFather }} >
        <Menu sx={{ ...styles.menu }} />
        <Heading sx={{ ...styles.header }} >Perfil do Usuário</Heading>
        <Box sx={{ ...styles.formCadastro }} >
          <FormControl id="nomeCompleto" sx={{ ...styles.formControl }}>
            <FormLabel sx={{ ...styles.formLabel }}>Nome Completo</FormLabel>
            <Input sx={{ ...styles.input }}
              type="text"
              value={state.formulario.name}
              onChange={(e) => {
                dispatch({
                  type: CAMPO_ALTERAR,
                  payload: { campo: 'name', valor: e.target.value }
                })
              }}
              variant="filled"
            />
          </FormControl>
          <FormControl id="cnpj" sx={{ ...styles.formControl }}>
            <FormLabel sx={{ ...styles.formLabel }}>CNPJ da Empresa</FormLabel>
            <Input sx={{ ...styles.input }}
              type="text"
              value={state.formulario.companyRef}
              onChange={(e) => {
                dispatch({
                  type: CAMPO_ALTERAR,
                  payload: { campo: 'companyRef', valor: e.target.value }
                })
              }}
              variant="filled"
            />
          </FormControl>
          <FormControl id="cpf" sx={{ ...styles.formControl }}>
            <FormLabel sx={{ ...styles.formLabel }}>CPF</FormLabel>
            <Input sx={{ ...styles.input }}
              type="text"
              value={state.formulario.cpf}
              onChange={(e) => {
                dispatch({
                  type: CAMPO_ALTERAR,
                  payload: { campo: 'cpf', valor: e.target.value }
                })
              }}
              variant="filled"
            />
          </FormControl>
          <FormControl id="email" sx={{ ...styles.formControl }}>
            <FormLabel sx={{ ...styles.formLabel }}>Email</FormLabel>
            <Input sx={{ ...styles.input }}
              type="email"
              value={state.formulario.email}
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
            sx={{ ...styles.buttonEnviar }}
            onClick={() => {
              onModaConfirmacaoOpen()
            }}>
            Salvar Alterações
          </Button>
          <Button
            sx={{ ...styles.buttonEnviar }}
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
          <FormularioSenha onClose={onModalSenhaClose} isOpen={isModalSenhaOpen} initialRef={initialRef} finalRef={finalRef} />
        </Box>
      </Box>
    </>
  );
}

export default Perfil;