import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { useNavigation } from "@react-navigation/native";
import Hr from "../../components/Hr";

function Home() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Image
        style={styles.stretch}
        source={require("../../../assets/logo2.png")}
      ></Image>

      <Hr />

      <Text style={styles.titulo}>Não compre, adote</Text>
      <Text style={styles.frase}>Não compre, adote. Por que comprar um cão ou um gatinho se existem diversos bichinhos precisando de amor e um lar?</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  stretch: {
    width: "90%",
    height: 200,
    resizeMode: "stretch",
  },
  titulo: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 20,
    margin: "2%",
  },

  frase: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 14,
    color: "#737373",
    textAlign: "center",
    marginLeft: "5%",
    marginRight: "5%"
  }
});
export default Home;
