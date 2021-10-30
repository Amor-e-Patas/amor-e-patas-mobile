import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimais, getAnimaisApro } from "../../service/animal";
import { useNavigation } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";

interface Animal {
  nome_ani: string;
  id_animal: number;
  id_status: number;
  images: Array<{
    filepath: string;
  }>;
}

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [animais, setAnimais] = useState(Array<Animal>());
  const [nome, setNome] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();

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
  }, []);
  return (
    <ScrollView
    style={{
      backgroundColor: "white",
    }}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          marginBottom:"100%"
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
            flex: 1,
            flexDirection: "row",
            flexWrap:'wrap',
            justifyContent: "space-between",
            alignItems: 'flex-start'
          }}
        >
          {animais.map((animal) => (
            <View
              style={{
                height: 200,
                width: "45%",
                marginBottom:5,
                marginLeft:5,
                marginTop:5,
                alignContent:'flex-end'
              }}
            >
              <>
                <Text> {animal.nome_ani}</Text>
              </>
            </View>
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
});
