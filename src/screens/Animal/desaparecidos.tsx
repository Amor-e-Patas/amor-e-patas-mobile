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
import { getAnimais, getAnimaisApro, getAnimaisDesaparecidosAll, Animal } from "../../service/animal";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from "react-native-gesture-handler";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";


export default function Desaparecidos() {
  const [images, setImages] = useState<File[]>([]);
  const [animais, setAnimais] = useState(Array<Animal>());
  const [animaisFiltrados, setAnimaisFiltrados] = useState(Array<Animal>());
  const [nome, setNome] = useState("");
  const [idPorte, setPorte] = useState<number>();
  const [idSexo, setSexo] = useState<number>();
  const [idEspecie, setEspecie] = useState<number>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchAPI() {
      try {
        const animais = await getAnimaisDesaparecidosAll();
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
                    uri: `http://192.168.1.64:3333/${animal?.images[0].filepath}`,
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
  input: {
    height: 60,
    width: 320,
    margin: 12,
    padding: 10,
    color: "black",
    borderRadius: 2,
    fontSize: 15,
    backgroundColor: "#f8f8f8",
  },
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
