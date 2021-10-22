
import axios, { authenticatedAPI } from "./services";
export async function criarUsuario(nome_usu: string,
    cpf: string,
    genero: string,
    data_nasc: string,
    celular: string,
    email: string,
    senha: string,
    endereco: string,
    numero: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    referencia : string) {
    try {
        await axios.post("/user", {
            nome_usu,
            cpf,
            genero,
            data_nasc,
            telefone: {
                num_telefone: celular
            },
            login: {
                email,
                senha
            },
            endereco: {
                endereco,
                numero,
                bairro,
                cep,
                cidade,
                estado,
                referencia
            }
        })
    } catch (error) {
        throw error;
    }
}


export async function getUser(){
    try{
      const response = await authenticatedAPI.get(`/user`);
      return response.data;
    } catch (err) {
      throw err;
    } 
  }


  export async function alterarUser(nome_usu: string, cpf: string, data_nasc: string, genero: string){
    try{
      const response = await authenticatedAPI.put("/user", {
        nome_usu, cpf, data_nasc, genero
      });
      return 
    } catch (err) {
      throw err;
    } 
  }