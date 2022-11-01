import axios from 'axios'
import utils from '../utils';
export const BaseApi = axios.create({
    baseURL : process.env.VUE_APP_API_URL,
    headers: {
         Authorization: `Bearer ${utils.getToken()}`
    }
});