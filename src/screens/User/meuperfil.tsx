import React from "react";
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
import { RectButton } from "react-native-gesture-handler";

export default function MeuPerfil() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Alterar endereço">>();

  return (
    <ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5%"

        }}
      >
        <RectButton onPress={() => navigation.navigate("Alterar usuário")}><Text>Atualizar meus dados pessoais</Text></RectButton>
      <RectButton onPress={() => navigation.navigate("Alterar endereço")}><Text>Atualizar meu endereço</Text></RectButton>
      <RectButton onPress={() => navigation.navigate("Alterar telefone")}><Text>Atualizar meu contato</Text></RectButton>
      <RectButton onPress={() => navigation.navigate("Alterar login")}><Text>Atualizar senha</Text></RectButton>
    </View>
    </ScrollView >
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
