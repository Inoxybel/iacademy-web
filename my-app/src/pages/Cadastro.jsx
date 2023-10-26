import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import formStyles, { botaoVoltarCadastro } from '../styles/formStyles';
import { cadastrar } from "../services/Fetchers/FetchersUsuario.js";


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
    <Box sx={{ ...formStyles.formFather }}>
      <Heading sx={{ ...formStyles.formTitle }}>Cadastro</Heading>

      <Box sx={{ ...formStyles.formCadastro }}>

        <Box style={botaoVoltarCadastro} >
          <RiArrowGoBackLine onClick={() => navigate("/login")} />
        </Box>

        <FormControl id="nomeCompleto" isRequired sx={{ ...formStyles.formControl }}>
          <FormLabel sx={{ ...formStyles.formLabel }}>Nome Completo</FormLabel>


          <Input sx={{ ...formStyles.input }}
            type="text"
            name="nomeCompleto"
            placeholder="Seu nome completo"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.nomeCompleto &&
            <Text style={{ ...formStyles.formError }}>
              {formErrors.nomeCompleto}
            </Text>
          }
          {errosResponse.name && errosResponse.Name.map((obj) => (
            <Text style={{ ...formStyles.formError }}>
              {obj}
            </Text>
          ))}
        </FormControl>

        <FormControl id="cnpj" sx={{ ...formStyles.formControl }}>
          <FormLabel sx={{ ...formStyles.formLabel }}>CNPJ da Empresa</FormLabel>
          <Input sx={{ ...formStyles.input }}
            type="text"
            name="cnpj"
            placeholder="CNPJ da sua empresa"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.cnpj && <Text sx={{ ...formStyles.formError }}>
            {formErrors.cnpj}
          </Text>
          }
        </FormControl>

        <FormControl id="cpf" isRequired sx={{ ...formStyles.formControl }}>
          <FormLabel sx={{ ...formStyles.formLabel }}>CPF do usuario</FormLabel>
          <Input sx={{ ...formStyles.input }}
            type="text"
            name="cpf"
            placeholder="Seu CPF"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.cpf && <Text sx={{ ...formStyles.formError }}>
            {formErrors.cpf}
          </Text>
          }
          {errosResponse.Cpf && errosResponse.Cpf.length > 0 ? errosResponse.Cpf.map((obj) => (
            <Text style={{ ...formStyles.formError }}>
              {obj}
            </Text>
          )) : null}
        </FormControl>

        <FormControl id="email" isRequired sx={{ ...formStyles.formControl }}>
          <FormLabel sx={{ ...formStyles.formLabel }}>Email</FormLabel>
          <Input sx={{ ...formStyles.input }}
            type="email"
            name="email"
            placeholder="Seu e-mail"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.email &&
            <Text style={{ ...formStyles.formError }}>
              {formErrors.email}
            </Text>
          }
          {errosResponse.Email && errosResponse.Email.length > 0 ? errosResponse.Email.map((obj) => (
            <Text style={{ ...formStyles.formError }}>
              {obj}
            </Text>
          )) : null}

        </FormControl>
        <FormControl id="password" isRequired sx={{ ...formStyles.formControl }}>
          <FormLabel sx={{ ...formStyles.formLabel }}>Senha</FormLabel>
          <Input sx={{ ...formStyles.input }}
            type="password"
            name="password"
            placeholder="Sua senha"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.password &&
            <Text style={{ ...formStyles.formError }}>
              {formErrors.password}
            </Text>
          }
          {errosResponse.Password && errosResponse.Password.length > 0 ? errosResponse.Password.map((obj) => (
            <Text style={{ ...formStyles.formError }}>
              {obj}
            </Text>
          )) : null}
        </FormControl>
        <FormControl id="confirmPassword" isRequired sx={{ ...formStyles.formControl }}>

          <FormLabel sx={{ ...formStyles.formLabel }}>Confirmar Senha</FormLabel>

          <Input sx={{ ...formStyles.input }}
            type="password"
            name="confirmPassword"
            placeholder="Confirmar senha"
            onChange={handleInputChange}
            variant="filled" />
          {formErrors.confirmPassword &&
            <Text style={{ ...formStyles.formError }}>
              {formErrors.confirmPassword}
            </Text>
          }
          {errosResponse.Password && errosResponse.Password.length > 0 ? errosResponse.Password.map((obj) => (
            <Text style={{ ...formStyles.formError }}>
              {obj}
            </Text>
          )) : null}
        </FormControl>

        <Button sx={{ ...formStyles.buttonEnviar }}
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
