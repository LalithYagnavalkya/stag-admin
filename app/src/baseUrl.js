import axios from "axios";

const baseUrl = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_PORT,
});

export default baseUrl;
