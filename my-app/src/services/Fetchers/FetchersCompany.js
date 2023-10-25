import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function getTokenAsync() {
  try {
    const token = await cookies.get('token');
    return token;
  } catch (error) {
    throw error;
  }
}

async function setAuthorizationHeader(api) {
  const token = await getTokenAsync();
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
const api = axios.create({
  baseURL: 'https://iacademy-company-v1-api.azurewebsites.net/api',
});

const companyLogin = dados => {
  return api.post(`/company/login`, dados);
};

const companyRegister = dados => {
  return api.post('/company', dados, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

const editCompany = async (id, dados) => {
  await setAuthorizationHeader(api);
  return api.put('/company/' + id, dados);
};

const getCompanyById = async id => {
  await setAuthorizationHeader(api);
  return api.get('/company/' + id);
};

export { companyLogin, companyRegister, editCompany, getCompanyById };
