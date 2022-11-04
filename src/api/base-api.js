import axios from "axios";
import utils from "../utils";
const BaseApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
BaseApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${utils.getToken()}`;
  return config;
});
export { BaseApi };
