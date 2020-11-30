import axios from "axios";
import { getToken } from "./auth";

// Build API
// const api = axios.create();

// NPM Start API
const api = axios.create({
    baseURL: "http://localhost:3333/"
});

export default api;
