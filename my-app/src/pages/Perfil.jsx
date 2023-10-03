import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  theme,
  Container,
} from "@chakra-ui/react";
import stylesForms from '../styles/stylesForms.js';
import Menu from "./Menu.jsx";
import axios from 'axios';


const apiUrl = 'https://iacademy-api.azurewebsites.net';

function Perfil() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");



  useEffect(() => {
    // Usar userId para buscar as informações do usuário da API assim que a página for carregada
    const buscarInformacoesUsuario = async () => {
      try {

        const token = localStorage.getItem("token", token);
        const response = await axios.get(`${apiUrl}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserId(response.data.id || "");
        setNomeCompleto(response.data.nomeCompleto || "");
        setCnpj(response.data.cnpj || "");
        setEmail(response.data.email || "");

      } catch (error) {
        console.error('Erro ao buscar informações do usuário', error);
      }
    };

    // userId e token sejam válidos antes de fazer a solicitação
    if (userId && token) {
      buscarInformacoesUsuario();
    }
  }, [userId, token]);

  const atualizarCadastroUsuario = async () => {
    // Construir o objeto de dados que será enviado para a API
    if (!nomeCompleto || !cnpj || !email) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    const dadosUsuario = {
      nomeCompleto,
      email,
      senha,
    };

    try {

      const resposta = await axios.put(`${apiUrl}/api/user/${userId}`, dadosUsuario, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


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
      <Box sx={{ ...stylesForms.formFather }} >
        <Menu sx={{ ...stylesForms.menu }} />

        <Heading sx={{ ...stylesForms.header }} >Perfil do Usuário</Heading>

        <Box sx={{ ...stylesForms.formCadastro }} >
          {erro && (
            <Alert status="error" mb="4" color={"brown"}>
              <AlertIcon />
              <AlertTitle >{erro}</AlertTitle>
            </Alert>
          )}
          <FormControl id="nomeCompleto" sx={{ ...stylesForms.formControl }}>
            <FormLabel sx={{ ...stylesForms.formLabel }}>Nome Completo</FormLabel>
            <Input sx={{ ...stylesForms.input }}
              type="text"
              placeholder="Seu nome completo"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <FormControl id="cnpj" sx={{ ...stylesForms.formControl }}>
            <FormLabel sx={{ ...stylesForms.formLabel }}>CNPJ da Empresa</FormLabel>
            <Input sx={{ ...stylesForms.input }}
              type="text"
              placeholder="CNPJ da sua empresa"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <FormControl id="email" sx={{ ...stylesForms.formControl }}>
            <FormLabel sx={{ ...stylesForms.formLabel }}>Email</FormLabel>
            <Input sx={{ ...stylesForms.input }}
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <FormControl id="password" sx={{ ...stylesForms.formControl }}>
            <FormLabel sx={{ ...stylesForms.formLabel }}>Nova Senha</FormLabel>
            <Input sx={{ ...stylesForms.input }}
              type="password"
              placeholder="Nova senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <FormControl id="confirmPassword" sx={{ ...stylesForms.formControl }}>
            <FormLabel sx={{ ...stylesForms.formLabel }}>Confirmar Nova Senha</FormLabel>
            <Input sx={{ ...stylesForms.input }}
              type="password"
              placeholder="Confirmar nova senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              variant="filled"
            />
          </FormControl>
          <Button
            sx={{ ...stylesForms.buttonEnviar }}
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