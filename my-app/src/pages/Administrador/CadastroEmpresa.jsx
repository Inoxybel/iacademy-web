import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { companyRegister } from "../../services/Fetchers/FetchersCompany";

function formataDados(dados) {
  const response = {
    companyName: dados.companyName,
    cnpj: dados.cnpj,
    password: dados.password,
    groups: [
      {
        groupName: "",
        users: [
          {
            name: "",
            document: ""
          }
        ],
        authorizedTrainingIds: [
          ""
        ]
      }
    ]
  }
  return response;
}

const cadastrar = (formData) => {
  return api.post("/company", formData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

function Cadastro() {

  const [formData, setFormData] = useState({
    companyName: "",
    cnpj: "",
    password: "",
    groups: [
      {
        groupName: "",
        users: [],
        authorizedTrainingIds: []
      }
    ]

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const data = formataDados(formData)
    companyRegister(data)
  }

  return (
    <Flex >
      <Heading >Cadastro de Cliente</Heading>
      <Box >
        <FormControl id="companyName"  >
          <FormLabel >Nome da Empresa</FormLabel>
          <Input
            isRequired
            type="text"
            name="companyName"
            placeholder="Nome da Empresa"
            onChange={handleInputChange}
            variant="filled" />
        </FormControl>
        <FormControl id="cnpj"  >
          <FormLabel >CNPJ</FormLabel>
          <Input
            isRequired
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            onChange={handleInputChange}
            variant="filled" />
        </FormControl>
        <FormControl id="email" >
          <FormLabel >Email</FormLabel>
          <Input
            isRequired
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={handleInputChange}
            variant="filled" />
        </FormControl>
        <FormControl id="password" >
          <FormLabel >Senha</FormLabel>
          <Input
            isRequired
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleInputChange}
            variant="filled" />
        </FormControl>
        <FormControl id="confirmPassword" >
          <FormLabel >Confirmar Senha</FormLabel>
          <Input
            isRequired
            type="password"
            name="confirmPassword"
            placeholder="Confirmar senha"
            onChange={handleInputChange}
            variant="filled" />
        </FormControl>
        <Button
          onClick={() => {
            handleSubmit()
          }}>
          Cadastrar
        </Button>

      </Box>
    </Flex>
  )

}

export default Cadastro;
