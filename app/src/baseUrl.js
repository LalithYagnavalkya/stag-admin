import axios from "axios";

const baseUrl = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_PORT,
  baseURL: "https://stag-backend.onrender.com/api/v1",
});

export default baseUrl;
