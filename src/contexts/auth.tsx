import React, { createContext, useState, useEffect, ReactNode } from "react";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { verifyAdm, verifyToken } from "../service/login";
import { authenticatedAPI } from "../service/services";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  isAuthenticated: boolean;
  isAdm: boolean;
  id_usuario: number;
  role: string;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  sincronizarUsuario: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAdm, setIsAdm] = useState(true);
  const [id_usuario, setIdUsuario] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchAPI() {
      try {
        const user = await verifyToken();
        setIdUsuario(user.id_usuario);
        setRole(user.role);
        console.log(user, 'data');
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    fetchAPI();
  }, [id_usuario]);

  useEffect(() => {
    async function fetchAPI() {
      try {
        await verifyAdm();
        setIsAdm(true);
      } catch (err) {
        setIsAdm(false);
      }
    }

    fetchAPI();
  }, [id_usuario]);

  async function sincronizarUsuario() {
    try {
      const token = await AsyncStorage.getItem("@amor-e-patas:user-token");
      console.log(token, "token - services");
      authenticatedAPI.defaults.headers.common['Authorization'] = `Baerer ${token}`;
      const user = await verifyToken();
      setIdUsuario(user.id_usuario);
      setRole(user.role);
      console.log(user, 'data auth');
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
      setIsAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider
      value={
        {
          isAdm,
          isAuthenticated,
          setIsAuthenticated,
          id_usuario,
          role,
          sincronizarUsuario
        }
      }
    >
      {children}
    </AuthContext.Provider>
  )
}