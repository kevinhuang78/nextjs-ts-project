import axios from "axios";
import { AUTH_TOKEN } from "../constants/login";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WECASA_API_URL,
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "accept-language": "fr",
    "Wecasa-Country": "FR",
  },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  config.headers.Authorization = token || "";
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
