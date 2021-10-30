import axios, { authenticatedAPI } from "./services";

interface Telefone{
  num_telefone: string
}

export async function getPhone(){
    try{
      const response = await authenticatedAPI.get<Telefone>(`/telefone`);
      return response.data;
    } catch (err) {
      throw err;
    } 
  }


  export async function alterarPhone(num_telefone: string){
    try{
      const response = await authenticatedAPI.put("/telefone", {
        num_telefone
      });
      return 
    } catch (err) {
      throw err;
    } 
  }