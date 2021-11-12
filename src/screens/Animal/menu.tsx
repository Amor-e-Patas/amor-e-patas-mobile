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

export default function MenuAnimais() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthRoutesParamList, "Alterar endereço">
    >();

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
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
            <RectButton
              onPress={() => navigation.navigate("Cadastro de Animal")}
            >
              <Image
                style={styles.stretch}
                source={require("../../../assets/addanimal.png")}
              ></Image>

              <Text style={styles.text}>Cadastrar animal</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
          <RectButton onPress={() => navigation.navigate("Meus animais em analise")}>
              <Image
                style={styles.stretch}
                source={require("../../../assets/analise.png")}
              ></Image>
              <Text style={styles.text}>Animais em análise</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
            <RectButton onPress={() => navigation.navigate("Meus animais")}>
              <Image
                style={styles.stretch}
                source={require("../../../assets/animais.png")}
              ></Image>
              <Text style={styles.text}>Meus animais</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
            <RectButton
              onPress={() => navigation.navigate("Meus animais desaparecidos")}
            >
              <Image
                style={styles.stretch}
                source={require("../../../assets/desaparecidos.png")}
              ></Image>
              <Text style={styles.text}>Meus animais desaparecidos</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
            <RectButton onPress={() => navigation.navigate("Meus animais não aprovados")}>
              <Image
                style={styles.stretch}
                source={require("../../../assets/animais.png")}
              ></Image>
              <Text style={styles.text}>Meus animais não aprovados</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
            <RectButton onPress={() => navigation.navigate("Meus animais em analise")}>
              <Image
                style={styles.stretch}
                source={require("../../../assets/animais.png")}
              ></Image>
              <Text style={styles.text}>Meus animais em analise</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
            <RectButton onPress={() => navigation.navigate("Meus animais desaparecidos em analise")}>
              <Image
                style={styles.stretch}
                source={require("../../../assets/animais.png")}
              ></Image>
              <Text style={styles.text}>Meus animais desaparecidos em analise</Text>
            </RectButton>
          </View>

          <View style={styles.cards}>
            <RectButton onPress={() => navigation.navigate("Meus animais desaparecidos não aprovados")}>
              <Image
                style={styles.stretch}
                source={require("../../../assets/animais.png")}
              ></Image>
              <Text style={styles.text}>Meus animais desaparecidos não aprovados</Text>
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
    width: 120,
    height: 120,
    resizeMode: "stretch",
    marginHorizontal: 35,
    marginVertical: 35,
  },

  text: {
    color: "purple",
    fontFamily: "Raleway_600SemiBold",
    textAlign: "center",
  },
});
