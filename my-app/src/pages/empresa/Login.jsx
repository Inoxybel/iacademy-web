import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {
  Box,
  Heading,
  Input,
  Button,
  Container,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { companyLogin } from "../../services/Fetchers/FetchersCompany";

function Login({ setAuthenticated }) {
  const styles = {
    formFather: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      minWidth: '100%',
      backgroundColor: 'var(--background-color)',
      justifyContent: 'center',
      alignItems: 'center',
      py: 8,
    },
    formTitle: {
      color: 'var(--primary-white)'
    },
    formControl: {
      w: '15rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      mb: '2',
    },
    formLabel: {
      alignSelf: 'flex-start',
      position: 'relative',
      left: '2',
      fontSize: 14,
    },
    input: {
      h: '6',
      fontSize: 14,
      color: 'gray',
      _placeholder: { fontSize: 12 },
    },
    formCadastro: {
      p: 5,
      borderWidth: 1,
      borderRadius: 'md',
      w: '22rem',
      minH: '28rem',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      bg: 'var(--backgroud-form)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formLogin: {
      p: 9,
      borderWidth: 1,
      borderRadius: 'md',
      boxShadow: 'lg',
      w: '20rem',
      minh: '20rem',
      rowGap: '1.2rem',
      color: 'white',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignSelf: 'center',
      bg: 'var(--backgroud-form)',
      mt: 5,
      mb: 6,
    },

    formError: {
      color: 'brown',
      position: 'relative',
      alignSelf: 'flex-start',
    },
    botaoVoltarCadastro: {
      cursor: 'pointer',
      width: 15,
      height: 15,
      alignSelf: 'flex-start',
      margin: 10,
      position: 'relative',
    }
  };

  const navigate = useNavigate();
  const cookies = new Cookies();

  const [formData, setFormData] = useState({
    cnpj: "",
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
    if (!formData.cnpj || !formData.password) {
      setError("Preencha todos os campos.");
      return;
    }

    cookies.remove('token');
    cookies.remove('tokenExpiration');
    cookies.remove('company');

    try {
      const response = await companyLogin(formData)
      const token = response.data.token;
      const companyData = response.data;

      if (token) {
        const sessionDuration = 60 * 60;
        const tokenExpiration = Date.now() / 1000 + sessionDuration;

        cookies.set('token', token, { path: '/' });
        cookies.set('tokenExpiration', tokenExpiration, { path: '/' });
        cookies.set('company', JSON.stringify(companyData), { path: '/' });

        setAuthenticated(true);
        navigate('/empresa/treinamentos');
      } else {
        setError('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.log(error);
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <Container sx={styles.formFather}>
      <Heading sx={styles.formTitle}>Login para Empresas</Heading>
      <Box sx={styles.formLogin}>
        {error && (
          <Text sx={styles.formError}>
            {error}
          </Text>
        )}
        <FormControl id="cnpj" isRequired sx={styles.formControl}>
          <FormLabel sx={styles.formLabel}>CNPJ</FormLabel>
          <Input
            sx={styles.input}
            type="cnpj"
            placeholder="CNPJ"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleInputChange}
            variant="filled"
          />
        </FormControl>
        <FormControl id="password" isRequired sx={styles.formControl}>
          <FormLabel sx={styles.formLabel}>Senha</FormLabel>
          <Input
            sx={styles.input}
            type="password"
            placeholder="Sua senha"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            variant="filled"
          />
        </FormControl>
        <Button onClick={handleLogin} sx={styles.buttonEnviar}>
          Entrar
        </Button>
      </Box>
    </Container>
  );
}

export default Login;