import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WECASA_API_URL,
  timeout: 0,
  headers: { "Content-Type": "application/json" },
});

/* instance.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      api_key: process.env.REACT_APP_API_KEY,
    };
    return config;
  },
  (error) => Promise.reject(error)
); */

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
