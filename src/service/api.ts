import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: "http://192.168.1.69:3333/",
});

export default api;

export const authenticatedAPI = axios.create(
  {
    baseURL: "http://192.168.1.69:3333/",
    headers: {
      Authorization: `Bearer ${Cookies.get("user-token")}`
    }
  }
);