import { createContext, useState, useEffect, ReactNode } from "react";
import { verifyAdm, verifyToken } from "../services/login";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  isAuthenticated: boolean;
  isAdm: boolean;
  id_usuario: number;
  role: string;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAdm, setIsAdm] = useState(true);
  const [id_usuario, setIdUsuario] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchAPI(){
      try{
        const user = await verifyToken();
        setIdUsuario(user.id_usuario);
        setRole(user.role);
        console.log(user,'data');
        setIsAuthenticated(true);
      } catch (err){
        setIsAuthenticated(false);
      }
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    async function fetchAPI(){
      try{
        await verifyAdm();
        setIsAdm(true);
      } catch (err){
        setIsAdm(false);
      }
    }

    fetchAPI();
  }, []);

  return (
    <AuthContext.Provider
      value={
        {
          isAdm,
          isAuthenticated,
          setIsAuthenticated,
          id_usuario,
          role
        }
      }
    >
      {children}
    </AuthContext.Provider>
  )
}