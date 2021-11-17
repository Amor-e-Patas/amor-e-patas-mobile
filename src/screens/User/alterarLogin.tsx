import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { alterarLogin, getLogin } from "../../service/login";
import { AuthContext } from "../../contexts/auth";

interface Endereco {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Alterar login">>();

    useEffect(() => {
      async function fetchAPI() {
          try {
              const login = await getLogin();

              setEmail(login.email);

          } catch (err) {
              console.log(err);
          }
      }

      fetchAPI();
  }, [isAuthenticated]);

  async function eventoCriarUsuario() {
   
    if (email == "") {
      alert("Por favor, insira seu e-mail");
      return;
    }

    if (password == "") {
      alert("Por favor, insira a senha.");
      return;
    }

    if (password !=  passwordConfirm){
      alert("Senhas não conferem!");
      return;
    }

    if (password.length < 6 || password.length > 10) {
      alert("Senha não atende os requisitos mínimos.");
      return;
    }

    try {
      const token = await alterarLogin(email, password);
      alert("Login atualizado");
      navigation.navigate("Meu perfil");
  } catch (err) {
      alert("Erro ao atualizar login.")
  }
  }

  return (
    <ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop:"5%"
          
        }}
      >
        <Text
          style={{
            alignItems: "center",
            color: "#FFB800",
            fontSize: 20,
            margin: "1%",
          }}
        >
          Login
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#575245"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#575245"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#575245"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
        />

        <Pressable onPress={eventoCriarUsuario} style={styles.botao}>
          <Text>Atualizar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    backgroundColor: "#f8f8f8",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    height: 40,
    borderRadius: 6,
    padding: 10,
    width: "90%",
    marginLeft: "5%",
    marginTop: "2%",
  },
  botao: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#B7E394",
    alignItems: "center",
    borderRadius: 4,
  },
});
