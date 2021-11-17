import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { formata_telefone } from "../../utils/format_cpf_email";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { alterarPhone, getPhone } from "../../service/telefone";
import { AuthContext } from "../../contexts/auth";

interface Endereco {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function SignUp() {

  const [celular, setCelular] = useState("");
  const { isAuthenticated } = useContext(AuthContext);


  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Alterar telefone">>();

  useEffect(() => {
    async function fetchAPI() {
      try {
        const getTelefone = await getPhone();

        setCelular(getTelefone.num_telefone);

      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, [isAuthenticated]);

  async function eventoCriarUsuario() {
    if (celular == "") {
      alert("Preencha o telefone.");
      return;
    }
    try {
      const token = await alterarPhone(celular);
      alert("Meu perfil");
      //window.location.href = "/alterartelefone";
    } catch (err) {
      alert("Erro ao atualizar telefone.")
    }
  }

  return (
    <ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5%"

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
          Telefone
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Celular"
          placeholderTextColor="#575245"
          keyboardType="decimal-pad"
          value={celular}
          maxLength={15}
          onChangeText={(text) => setCelular(formata_telefone(text, text))}
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
