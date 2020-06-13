import getAxiosInstance from '../singletons/axios';

const base_url = 'http://localhost:8080';
export const verifyToken = async token => {
  const axios = getAxiosInstance(token);
  const url = base_url + '/api/verify-token';
  const response = await axios.post(url);
  return response.data;
};

export const login = async credentials => {
  const axios = getAxiosInstance(null);
  const url = base_url + '/api/login';
  const response = await axios.post(url, credentials);
  console.log(response);
  return response.data;
};
