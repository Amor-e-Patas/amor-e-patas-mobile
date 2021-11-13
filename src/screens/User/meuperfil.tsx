import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { RectButton } from "react-native-gesture-handler";

export default function MeuPerfil() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthRoutesParamList, "Alterar endereço">
    >();

  return (
    <ScrollView
    style={{
      backgroundColor: "white",
    }}>
      <View
        style={{
          alignItems: "center",
          marginBottom: "auto",
        }}
      >
        <View
          style={{
            flex: 2,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: 400,
            marginTop: 100,
          }}
        >
          <View style={styles.cards}>
          <RectButton onPress={() => navigation.navigate("Alterar usuário")}>
            <Image
              style={styles.stretch}
              source={require("../../../assets/perfil.png")}
            ></Image>
              <Text style={styles.text}>Atualizar meus dados pessoais</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
          <RectButton onPress={() => navigation.navigate("Alterar endereço")}>
            <Image
              style={styles.stretchend}
              source={require("../../../assets/endereco2.png")}
            ></Image>
              <Text style={styles.text}>Atualizar meu endereço</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
          <RectButton onPress={() => navigation.navigate("Alterar telefone")}>
            <Image
              style={styles.stretchcall}
              source={require("../../../assets/celular.png")}
            ></Image>
              <Text style={styles.text}>Atualizar meu contato</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
          <RectButton onPress={() => navigation.navigate("Alterar login")}>
            <Image
              style={styles.stretchpass}
              source={require("../../../assets/pass.png")}
            ></Image>
              <Text style={styles.text}>Atualizar senha</Text>
            </RectButton>
          </View>
        </View>
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
  cards: {
    height: 250,
    width: "45%",
    marginBottom: 5,
    marginLeft: 5,
    marginTop: 5,
    alignContent: "center",
    borderWidth: 0.3,
    borderRadius: 9,
  },
  stretch: {
    width: 150,
    height: 150,
    resizeMode: "stretch",
    marginHorizontal:15,
    marginVertical:20
  },
  stretchend: {
    width: 120,
    height: 120,
    resizeMode: "stretch",
    marginHorizontal:35,
    marginVertical:35
  },
  stretchcall: {
    width: 110,
    height: 110,
    resizeMode: "stretch",
    marginHorizontal:45,
    marginVertical:40
  },
  stretchpass: {
    width: 120,
    height: 120,
    resizeMode: "stretch",
    marginHorizontal:35,
    marginVertical:35
  },
  text: {
    color: "purple",
    fontFamily: "Raleway_600SemiBold",
    textAlign: "center",
  },
});
