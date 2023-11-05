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
import formStyles from '../styles/formStyles';
import { logar } from "../services/Fetchers/FetchersUsuario.js";
import Cookies from "universal-cookie";

function Login({ setAuthenticated }) {
  const navigate = useNavigate();
  const cookies = new Cookies();

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
    if (!formData.email || !formData.password) {
      setError("Preencha todos os campos.");
      return;
    }
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

        cookies.set('token', token, { path: '/' });
        cookies.set('tokenExpiration', tokenExpiration, { path: '/' });
        cookies.set('user', userData, { path: '/' });

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
    <Container sx={{ ...formStyles.formFather }}>
      <Heading sx={{ ...formStyles.formTitle }}>Login</Heading>
      <Box sx={{ ...formStyles.formLogin }}>
        {error && (
          <Text sx={{ ...formStyles.formError, alignSelf: "center" }}>
            {error}
          </Text>
        )}
        <FormControl id="email" isRequired sx={{ ...formStyles.formControl }}>
          <FormLabel sx={{ ...formStyles.formLabel }}>Email</FormLabel>
          <Input
            sx={{ ...formStyles.input }}
            type="email"
            placeholder="Seu e-mail"
            name="email"
            value={formData.email}
            onChange={(e)=>{
              handleInputChange(e)
              setError(null)
            }}
            variant="filled"
          />
        </FormControl>
        <FormControl id="password" isRequired sx={{ ...formStyles.formControl }}>
          <FormLabel sx={{ ...formStyles.formLabel }}>Senha</FormLabel>
          <Input
            sx={{ ...formStyles.input }}
            type="password"
            placeholder="Sua senha"
            name="password"
            value={formData.password}
            onChange={(e)=>{
              handleInputChange(e)
              setError(null)
            }}
            variant="filled"
          />
        </FormControl>
        <Button onClick={handleLogin} sx={{ ...formStyles.buttonEnviar }}>
          Entrar
        </Button>
      </Box>
      <Text sx={{ m: 3, color: 'var(--primary-white)' }}>
        Não tem uma conta? <Link onClick={() => navigate("/cadastro")} as={'span'} sx={formStyles.formLink}>Cadastre-se aqui</Link>
      </Text>
    </Container>
  );
}

export default Login;
