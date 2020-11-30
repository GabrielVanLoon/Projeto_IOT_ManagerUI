import axios from "axios";
import { getToken } from "./auth";


const microApiFactory = () => { 
  if(!getToken())
    return null

  let microAPI = axios.create({
    baseURL: `http://${getToken().microsservice.host}:${getToken().microsservice.port}`
  });
  
  microAPI.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params['APIKEY'] = getToken().microsservice.APIKEY;
    return config;
  });

  return microAPI
}

// microAPI.interceptors.request.use(async config => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default microApiFactory;
