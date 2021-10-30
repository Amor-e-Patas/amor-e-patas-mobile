import axios, { authenticatedAPI } from "./services";

interface Endereco{
  cep: string,
  bairro: string,
  endereco: string,
  numero: string,
  referencia: string,
  estado: string,
  cidade: string
}

export async function getAddres(){
    try{
      const response = await authenticatedAPI.get<Endereco>(`/endereco`);
      return response.data;
    } catch (err) {
      throw err;
    } 
  }


  export async function alterarAddres(cep: string, bairro: string, endereco: string, numero: string, referencia: string, estado: string, cidade: string){
    try{
      const response = await authenticatedAPI.put("/endereco", {
        cep, bairro, endereco, numero, referencia, estado, cidade
      });
      return 
    } catch (err) {
      throw err;
    } 
  }