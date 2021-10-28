import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable
} from "react-native";
import {
  formata_CPF
} from "../../utils/format_cpf_email";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { alterarUser, criarUsuario, getUser } from "../../service/user";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { AuthContext } from "../../contexts/auth";


interface Usuario {
  nome_usu: string;
  cpf: string;
  genero: string;
}

export default function SignUp() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [datanasc, setDatanasc] = useState("22-10-2021");
  const { isAuthenticated } = useContext(AuthContext);


  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Cadastre-se">>();

    useEffect(() => {
        async function fetchAPI() {
          try {
            const user = await getUser();
            setNome(user.nome_usu);
            setCpf(user.cpf);
            setGenero(user.genero);
            console.log(user);
          } catch (err) {
            console.log(err);
          }
        }
    
        fetchAPI();
      }, [isAuthenticated]);

  async function eventoAlterarUsuario() {

    if (nome == "") {
      alert("Por favor, insira seu nome.");
      return;
    }

    if (cpf == "") {
      alert("Por favor, insira o CPF.");
      return;
    }

    if (datanasc == "") {
      alert("Por favor, insira a data de nascimento.");
      return;
    }


    try {
        const token = await alterarUser(nome, cpf, datanasc, genero);
        alert("Usuario atualizado");
        navigation.navigate("Alterar usuário");
      } catch (err) {
        alert("Erro ao atualizar usuario.")
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
          Cadastro de Usuário
        </Text>

        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholder="Nome Completo"
          placeholderTextColor="#575245"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#575245"
          keyboardType="decimal-pad"
          value={cpf}
          onChangeText={(text) => setCpf(formata_CPF(text, text))}
        />

        <Picker
          style={styles.input}
          selectedValue={genero}
          onValueChange={(itemValue, itemIndex) => {
            setGenero(itemValue);
          }}
        >
          <Picker.Item label="Selecione o gênero..." value={0} />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Não declarar" value="Não declarar" />
        </Picker>

        <Pressable onPress={eventoAlterarUsuario} style={styles.botao}>
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
