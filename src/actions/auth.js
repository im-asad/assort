import axiosAuth from 'axios';
import {_retrieveData} from '../utils/asyncStorage';

const base_url = 'https://instaconnect.ngrok.io';
export const verifyToken = async () => {
  const token = await _retrieveData('token');
  const url = base_url + '/api/verify-token';
  const response = await axiosAuth.post(url, null, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return response.data;
};

export const login = async credentials => {
  const url = base_url + '/api/login';
  console.log('ASD');
  const response = await axiosAuth.post(url, credentials);
  console.log(response);
  return response.data;
};
