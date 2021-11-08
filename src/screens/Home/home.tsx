import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimais, getAnimaisApro } from "../../service/animal";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from "react-native-gesture-handler";
import { Card, ListItem, Button, Icon } from "react-native-elements";

interface Animal {
  nome_ani: string;
  id_animal: number;
  id_status: number;
  images: Array<{
    filepath: string;
  }>;
}

export default function Home() {
  const [animais, setAnimais] = useState(Array<Animal>());

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchAPI() {
      try {
        const animais = await getAnimaisApro();
        //console.log(animais,'teste');

        setAnimais(animais);
        console.log(animais);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, [isFocused]);

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
        <Image
          style={styles.stretch}
          source={require("../../../assets/logo2.png")}
        ></Image>
        <Hr />
        <Text style={styles.titulo}>Não compre, adote</Text>
        <Text style={styles.frase}>
          Não compre, adote. Por que comprar um cão ou um gatinho se existem
          diversos bichinhos precisando de amor e um lar?
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
                key={index}
              >
                <Image
                  style={styles.imgani}
                  source={{
                    uri: `http://192.168.1.69:3333/${animal?.images[0].filepath}`,
                  }}
                ></Image>
                <Text
                  style={{ color: "purple", fontFamily: "Raleway_600SemiBold", textAlign: "right" }}
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
    marginRight: "5%",
  },
  imgani: {
    width: 180,
    height: 400,
    maxWidth: 180,
    maxHeight: 170,
  },
});
