import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Button,
  Container,
  FormControl,
  FormLabel,
  Link,
  Text,
} from "@chakra-ui/react";
import stylesForms from '../styles/stylesForms.js';
import { logar } from "./Fetchers/FetchersUsuario.js";
import Cookies from "universal-cookie"; // Importe a biblioteca Universal Cookie

function Login({ setAuthenticated }) {
  const navigate = useNavigate();
  const cookies = new Cookies(); // Crie uma instância de Cookies

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    // Verifique se os campos de email e senha não estão vazios
    if (!formData.email || !formData.password) {
      setError("Preencha todos os campos.");
      return;
    }

    // Limpe todos os cookies antes de configurar os novos
    cookies.remove('token');
    cookies.remove('tokenExpiration');
    cookies.remove('user');

    try {
      const response = await logar(formData)
      const token = response.data.token;
      const userData = response.data;

      if (token) {
        const sessionDuration = 60 * 60;
        const tokenExpiration = Date.now() / 1000 + sessionDuration;

        // Configure os novos cookies com Universal Cookie
        cookies.set('token', token, { path: '/' });
        cookies.set('tokenExpiration', tokenExpiration, { path: '/' });
        cookies.set('user', JSON.stringify(userData), { path: '/' });

        setAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.log(error);
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <Container sx={{ ...stylesForms.formFather }}>
      <Heading sx={{ ...stylesForms.header }}>Login</Heading>
      <Box sx={{ ...stylesForms.formLogin }}>
        {error && (
          <Text sx={{ ...stylesForms.formError, alignSelf: "center" }}>
            {error}
          </Text>
        )}
        <FormControl id="email" isRequired sx={{ ...stylesForms.formControl }}>
          <FormLabel sx={{ ...stylesForms.formLabel }}>Email</FormLabel>
          <Input
            sx={{ ...stylesForms.input }}
            type="email"
            placeholder="Seu e-mail"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="filled"
          />
        </FormControl>
        <FormControl id="password" isRequired sx={{ ...stylesForms.formControl }}>
          <FormLabel sx={{ ...stylesForms.formLabel }}>Senha</FormLabel>
          <Input
            sx={{ ...stylesForms.input }}
            type="password"
            placeholder="Sua senha"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            variant="filled"
          />
        </FormControl>
        <Button onClick={handleLogin} sx={{ ...stylesForms.buttonEnviar }}>
          Entrar
        </Button>
      </Box>
      <Link onClick={() => navigate("/cadastro")} sx={{ m: 3 }}>
        Não tem uma conta? Cadastre-se aqui
      </Link>
    </Container>
  );
}

export default Login;