import  api, { authenticatedAPI }  from "./services";

export async function login(email: string, password: string){
  try{
    const response = await api.post("/auth/login", {
      email, password
    });
    return response.data;
  } catch (err) {
    throw err;
  } 
}

export async function verifyToken(){
    try{
      const res = await authenticatedAPI.post("/auth/verifytoken");
      return res.data;

    } catch (err) {
      throw err;
    } 
  }

  export async function verifyAdm(){
    try{
      await authenticatedAPI.post("/auth/verifyadm");
    } catch (err) {
      throw err;
    } 
  }
  
  export async function alterarLogin(email: string, senha: string){
    try{
      const response = await authenticatedAPI.put("/login", {
        email, senha
      });
      return response.data;
    } catch (err) {
      throw err;
    } 
  }

  export async function getLogin(){
    try{
      const response = await authenticatedAPI.get(`/login`);
      return response.data;
    } catch (err) {
      throw err;
    } 
  }
