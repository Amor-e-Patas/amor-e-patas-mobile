import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";


interface Login {
  accessToken: string;
}



function Login() {
  const { isAuthenticated, sincronizarUsuario } = useContext(AuthContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Login">>();

  async function logOut(){
    await AsyncStorage.removeItem("@amor-e-patas:user-token");
    sincronizarUsuario();
  }

  useEffect(() => {
    if(isAuthenticated){
      logOut();
    }
    
  }, []);

  return (
    <></>
  );
}
export default Login;
