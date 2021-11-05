import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimais, Animal } from "../../service/animal";
import { useNavigation } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from "react-native-gesture-handler";

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [animais, setAnimais] = useState(Array<Animal>());
  const [nome, setNome] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();

  useEffect(() => {
    async function fetchAPI() {
      try {
        const animais = await getAnimais();
        setAnimais(animais);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  const abrirPaginaAnimal = (animalId: number) => {
    navigation.navigate("Animal", {
      animalId,
    });
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          marginBottom: "100%",
        }}
      >
        <Text
          style={{
            alignItems: "center",
            color: "#FFB800",
            fontSize: 25,
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          Meus Animais
        </Text>

        <View
          style={{
            flex: 2,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: 400,
            marginTop: 10,
          }}
        >
          {animais.map((animal, index) => (
            <RectButton
              key={index}
              onPress={() => abrirPaginaAnimal(animal.id_animal)}
            >
              <View
                style={{
                  height: 200,
                  width: "45%",
                  marginBottom: 5,
                  marginLeft: 5,
                  marginTop: 5,
                  alignContent: "center",
                }}
              >
                <Image
                  style={styles.stretch}
                  source={{
                    uri: `http://192.168.1.69:3333/${animal?.images[0].filepath}`,
                  }}
                ></Image>

                <Text
                  style={{
                    color: "purple",
                    fontFamily: "Raleway_600SemiBold",
                    textAlign: "right",
                  }}
                >
                  {animal.nome_ani}
                </Text>
              </View>
            </RectButton>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  stretch: {
    width: 180,
    height: 400,
    maxWidth: 180,
    maxHeight: 170,
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
    marginRight: "5%",
  },
});
