import axios from "axios";

const baseUrl = axios.create({
  // baseURL: "https://campus-backend-drf-bfr8p.ondigitalocean.app/",
  // baseURL: 'http://13.233.194.93:8000/',
  // baseURL: 'https://hammerhead-app-4smkg.ondigitalocean.app/',
  // baseURL: 'https://api-campus.herokuapp.com',
});

export default baseUrl;
