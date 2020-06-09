import getAxiosInstance from "../singletons/axios";

const base_url = "https://instaconnect.ngrok.io"
export const verifyToken = async (token) => {
  const axios = getAxiosInstance(token);
  const response = await axios.post("http://localhost:8080/api/verify-token");
  return response.data;
};

export const login = async (credentials) => {
  const axios = getAxiosInstance(null);
  const response = await axios.post(
    base_url+"/api/login",
    credentials
  );
  console.log(response)
  return response.data;
};
