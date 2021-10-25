import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  ImageBackground,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimaisDesaparecidos } from "../../service/animal";
import { login } from "../../service/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontFamily } from "../../constants/theme";


interface Login {
  accessToken: string;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Login">>();

  async function handleLogin() {
    if (email == "" || password == "") {
      alert("Preencha todos os campos.");
      return;
    }
    try {
      const { accessToken } = (await login(email, password)) as Login;
      await AsyncStorage.setItem("@amor-e-patas:user-token", accessToken);
      console.log(accessToken);
      navigation.navigate("Home");
    } catch (err) {
      alert("Usuário ou senha incorretos.");
    }
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Text
        style={{
          alignItems: "center",
          color: "#FFB800",
          fontSize: 25,
        }}
      >
        Login
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(e) => setEmail(e)}
        placeholder="E-mail"
      />
      <TextInput
        style={styles.input}
        onChangeText={(e) => setPassword(e)}
        placeholder="Senha"
      />
      <Pressable style={styles.botao} onPress={handleLogin}>
        <Text>Entrar</Text>
      </Pressable>
      <Text>Novo Usuário?</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Cadastre-se")}
      >
        <Text style={styles.cad}>Cadastre-se</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 320,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderRadius: 7,
    
  },

  button: {
    padding: 2,
  },

  cad: {
    color: "#890620",
    padding: 2
  },

  botao: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#B7E394",
    alignItems: "center",
    borderRadius: 5,
  },
});
export default Login;
