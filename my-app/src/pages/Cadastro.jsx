import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  Text,
} from "@chakra-ui/react";
import { RiArrowGoBackLine } from 'react-icons/ri';
import styles from '../styles/styles.js';
import stylesForms, { botaoVoltarCadastro } from '../styles/stylesForms.js';
import { cadastrar } from "./Fetchers/FetchersUsuario.js";


function FormataDados(dados) {
  const response = {
    "name": dados.nomeCompleto,
    "email": dados.email,
    "cpf": dados.cpf,
    "password": dados.password,
    "companyRef": dados.cnpj
  }
  return response;
}

async function solicitacaoCadastroUsuario(dados) {

  try {
    const response = await cadastrar(dados);
    if (response.status === 201) {
      return { "status": response.status, "dados": response.data }
    }
  } catch (error) {
    console.log(error)
    return { "status": error.response.status, "dados": error.response.data }
  }

}

function Cadastro() {

  const navigate = useNavigate();

  const [errosResponse, setErrosResponse] = useState({
    Name: [],
    Cpf: [],
    Email: [],
    Password: [],
  })

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cnpj: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    nomeCompleto: "",
    cnpj: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toast = useToast()

  // Verificar se os campos obrigatórios não estão vazios
  const handleSubmit = async () => {


    const errors = {};
    let hasErrors = false;

    if (!formData.nomeCompleto.trim()) {
      errors.nomeCompleto = "Campo obrigatório";
      hasErrors = true;
    }

    if (!formData.email.trim()) {
      errors.email = "Campo obrigatório";
      hasErrors = true;
    }

    if (!formData.cpf.trim()) {
      errors.cpf = "Campo obrigatório";
      hasErrors = true;
    }

    if (!formData.password.trim()) {
      errors.password = "Campo obrigatório";
      hasErrors = true;
    }
    if (!formData.confirmPassword.trim()) {
      errors.password = "Campo obrigatório";
      hasErrors = true;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
      hasErrors = true;
    }


    setFormErrors(errors);

    if (!hasErrors) {
      const request = FormataDados(formData)

      const response = await solicitacaoCadastroUsuario(request);

      // Se a resposta tiver erros de validação (status 400), atualize o estado com esses erros
      if (response.status === 201) {
        toast({
          title: 'Conta criada',
          position: 'top',
          description: 'Seja bem-vindo(a) ao IAcademy.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        navigate('/')
      } else {
        setErrosResponse(response.dados)
      }
    };
  }

  return (
    <Box sx={{ ...stylesForms.formFather }}>
      <Heading sx={{ ...styles.header }}>Cadastro</Heading>

      <Box sx={{ ...stylesForms.formCadastro }}>

        <Box style={botaoVoltarCadastro} >
          <RiArrowGoBackLine onClick={() => navigate("/login")} />
        </Box>

        <FormControl id="nomeCompleto" isRequired sx={{ ...stylesForms.formControl }}>
          <FormLabel sx={{ ...stylesForms.formLabel }}>Nome Completo</FormLabel>


          <Input sx={{ ...stylesForms.input }}
            type="text"
            name="nomeCompleto"
            placeholder="Seu nome completo"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.nomeCompleto &&
            <Text style={{ ...stylesForms.formError }}>
              {formErrors.nomeCompleto}
            </Text>
          }
          {errosResponse.name && errosResponse.Name.map((obj) => (
            <Text style={{ ...stylesForms.formError }}>
              {obj}
            </Text>
          ))}
        </FormControl>

        <FormControl id="cnpj" sx={{ ...stylesForms.formControl }}>
          <FormLabel sx={{ ...stylesForms.formLabel }}>CNPJ da Empresa</FormLabel>
          <Input sx={{ ...stylesForms.input }}
            type="text"
            name="cnpj"
            placeholder="CNPJ da sua empresa"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.cnpj && <Text sx={{ ...stylesForms.formError }}>
            {formErrors.cnpj}
          </Text>
          }
        </FormControl>

        <FormControl id="cpf" isRequired sx={{ ...stylesForms.formControl }}>
          <FormLabel sx={{ ...stylesForms.formLabel }}>CPF do usuario</FormLabel>
          <Input sx={{ ...stylesForms.input }}
            type="text"
            name="cpf"
            placeholder="Seu CPF"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.cpf && <Text sx={{ ...stylesForms.formError }}>
            {formErrors.cpf}
          </Text>
          }
          {errosResponse.Cpf && errosResponse.Cpf.length > 0 ? errosResponse.Cpf.map((obj) => (
            <Text style={{ ...stylesForms.formError }}>
              {obj}
            </Text>
          )) : null}
        </FormControl>

        <FormControl id="email" isRequired sx={{ ...stylesForms.formControl }}>
          <FormLabel sx={{ ...stylesForms.formLabel }}>Email</FormLabel>
          <Input sx={{ ...stylesForms.input }}
            type="email"
            name="email"
            placeholder="Seu e-mail"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.email &&
            <Text style={{ ...stylesForms.formError }}>
              {formErrors.email}
            </Text>
          }
          {errosResponse.Email && errosResponse.Email.length > 0 ? errosResponse.Email.map((obj) => (
            <Text style={{ ...stylesForms.formError }}>
              {obj}
            </Text>
          )) : null}

        </FormControl>
        <FormControl id="password" isRequired sx={{ ...stylesForms.formControl }}>
          <FormLabel sx={{ ...stylesForms.formLabel }}>Senha</FormLabel>
          <Input sx={{ ...stylesForms.input }}
            type="password"
            name="password"
            placeholder="Sua senha"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.password &&
            <Text style={{ ...stylesForms.formError }}>
              {formErrors.password}
            </Text>
          }
          {errosResponse.Password && errosResponse.Password.length > 0 ? errosResponse.Password.map((obj) => (
            <Text style={{ ...stylesForms.formError }}>
              {obj}
            </Text>
          )) : null}
        </FormControl>
        <FormControl id="confirmPassword" isRequired sx={{ ...stylesForms.formControl }}>

          <FormLabel sx={{ ...stylesForms.formLabel }}>Confirmar Senha</FormLabel>

          <Input sx={{ ...stylesForms.input }}
            type="password"
            name="confirmPassword"
            placeholder="Confirmar senha"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.confirmPassword &&
            <Text style={{ ...stylesForms.formError }}>
              {formErrors.confirmPassword}
            </Text>
          }
          {errosResponse.Password && errosResponse.Password.length > 0 ? errosResponse.Password.map((obj) => (
            <Text style={{ ...stylesForms.formError }}>
              {obj}
            </Text>
          )) : null}
        </FormControl>

        <Button sx={{ ...stylesForms.buttonEnviar }}
          onClick={() => {
            handleSubmit()
          }}>
          Cadastrar
        </Button>

      </Box>
    </Box>
  );
}

export default Cadastro;
