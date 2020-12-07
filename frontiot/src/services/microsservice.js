import axios from "axios";
import { getToken } from "./auth";

const microApiFactory = () => { 
  
  const micro_host = process.env.REACT_APP_MICRO_HOST || "localhost"
  const micro_port = process.env.REACT_APP_MICRO_PORT  || 9001
  
  let microAPI = axios.create({
    baseURL: `http://${micro_host}:${micro_port}/`
  });

  // Se autenticado -> Insere as API-KEY
  if(getToken()){
    microAPI.interceptors.request.use((config) => {
      config.params = config.params || {};
      config.params['APIKEY'] = getToken().microsservice.APIKEY;
      return config;
    });
  }

  return microAPI
}

export default microApiFactory;
