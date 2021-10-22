import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Headers {
  Authorization: string;
}

const api = axios.create({
  baseURL: "http://192.168.1.69:3333/",
});

export default api;



export const authenticatedAPI = axios.create(
  {
    baseURL: "http://192.168.1.69:3333/"
  }
);

export async function createAuthenticatedAPI() {
  //na hora de fazer login usa isso
  await AsyncStorage.setItem("@amor-e-patas:user-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxLCJyb2xlIjoidXNlciIsImlkX2xvZ2luIjoxLCJpZF9lbmRlcmVjbyI6MSwiaWRfdGVsZWZvbmUiOjEsImlhdCI6MTYzNDg2ODI5NH0.P33BVclWwMDeEgPp9_3zjgFxDQmIrcwXa3FUuwGWAYQ");
  
  const token = await AsyncStorage.getItem("@amor-e-patas:user-token");
  console.log(token, "token - services");
  authenticatedAPI.defaults.headers.common['Authorization'] = `Baerer ${token}`;
}

createAuthenticatedAPI();