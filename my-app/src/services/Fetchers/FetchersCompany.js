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

const userApi = axios.create({
  baseURL: 'https://iacademy-user-v1-api.azurewebsites.net/api',
});

const api = axios.create({
  baseURL: 'https://iacademy-v1-api.azurewebsites.net/api',
});

const getTrainings = async () => {
  await setAuthorizationHeader(api);
  return api.get('/summary/company/available');
};

const getCompanyById = async id => {
  let token = await getTokenAsync();
  return userApi.get(`/company/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

const companyLogin = dados => {
  return userApi.post(`/company/login`, dados);
};

const companyRegister = dados => {
  return userApi.post('/company', dados, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

const editCompany = async (id, dados) => {
  await setAuthorizationHeader(api);
  return userApi.put('/company/' + id, dados);
};

export {
  getTrainings,
  companyLogin,
  companyRegister,
  editCompany,
  getCompanyById,
};
