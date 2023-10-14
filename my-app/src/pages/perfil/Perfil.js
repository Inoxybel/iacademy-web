import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Menu from "../Menu.js";
import styles from "../styles.js";
import ErroFormulario from "./ErroFormulario.js";


function Perfil() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState(null); 
 
  const cookies = new Cookies();
  const user = cookies.get("user");

  useEffect(() => {
    const buscarInformacoesUsuario = async () => {
      try {
        setCnpj(user.companyRef)
        setEmail(user.email)
        setNomeCompleto(user.name)
       
      } catch (error) {
        console.error('Erro ao buscar informações do usuário', error);
      }
    };
      buscarInformacoesUsuario();
  }, []);

  const atualizarCadastroUsuario = async () => {

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

  
    try {
      
      alert('Perfil atualizado com sucesso');
      
      setNomeCompleto("");
      setCnpj("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");

    } catch (erro) {
      
      console.error('Erro ao atualizar o perfil', erro);
  
    
      if (erro.response) {
        console.error('Erro da API:', erro.response.data);
      } else {
        console.error('Erro de rede:', erro.message);
      }
    }
  };


  return (
    <>
      <Menu />
        <Box sx={{...styles.formFather}} >
          <Menu sx={{...styles.menu}} />

            <Heading sx={{...styles.header}} >Perfil do Usuário</Heading>

          <Box sx={{...styles.formCadastro}} >
            {erro && (<ErroFormulario error={erro} />)}
            <FormControl id="nomeCompleto" sx={{...styles.formControl}}>
              <FormLabel sx={{...styles.formLabel}}>Nome Completo</FormLabel>
              <Input sx={{...styles.input}}
                type="text"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                variant="filled"
              />
            </FormControl>
            <FormControl id="cnpj"  sx={{...styles.formControl}}>
              <FormLabel sx={{...styles.formLabel}}>CNPJ da Empresa</FormLabel>
              <Input sx={{...styles.input}}
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                variant="filled"
              />
            </FormControl>
            <FormControl id="email" sx={{...styles.formControl}}>
              <FormLabel sx={{...styles.formLabel}}>Email</FormLabel>
              <Input sx={{...styles.input}}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="filled"
              />
            </FormControl>
            <FormControl id="password" sx={{...styles.formControl}}>
              <FormLabel sx={{...styles.formLabel}}>Nova Senha</FormLabel>
              <Input sx={{...styles.input}}
                type="password"
                placeholder="Nova senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                variant="filled"
              />
            </FormControl>
            <FormControl id="confirmPassword"  sx={{...styles.formControl}}>
              <FormLabel sx={{...styles.formLabel}}>Confirmar Nova Senha</FormLabel>
              <Input sx={{...styles.input}}
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                variant="filled"
              />
            </FormControl>
            <Button
            sx={{...styles.buttonEnviar}}
              onClick={atualizarCadastroUsuario}
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
    </>
  );
}

export default Perfil;