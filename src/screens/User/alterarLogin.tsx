import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import {
  formata_CPF,
  formata_telefone,
  valida_CPF,
  valida_email,
} from "../../utils/format_cpf_email";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { criarUsuario } from "../../service/user";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import DatePicker from "react-native-date-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CheckBox from "@react-native-community/checkbox";
import { alterarLogin, getLogin } from "../../service/login";

interface Endereco {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function SignUp() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [datanasc, setDatanasc] = useState("22-10-2021");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [referencia, setReferencia] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [password, setPassword] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Cadastre-se">>();

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
  }, []);

  async function eventoCriarUsuario() {
   
    if (email == "") {
      alert("Por favor, insira seu e-mail");
      return;
    }

    if (senha == "") {
      alert("Por favor, insira a senha.");
      return;
    }

    if (senha.length < 6 || senha.length > 10) {
      alert("Senha não atende os requisitos mínimos.");
      return;
    }

    try {
      const token = await alterarLogin(email, password);
      alert("Login atualizado");
      navigation.navigate("Alterar login");
      //window.location.href = "/alterarlogin";
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
