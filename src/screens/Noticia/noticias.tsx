import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimais, Animal } from "../../service/animal";
import { getPosts, Noticia } from "../../service/post";
import { useNavigation } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from "react-native-gesture-handler";

export default function Noticias() {
  const [noticias, setNoticias] = useState(Array<Noticia>());
  const [nome, setNome] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();

  useEffect(() => {
    async function fetchAPI() {
      try {
        const noticias = await getPosts();
        console.log(noticias, "teste");
        setNoticias(noticias);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  const abrirNoticia = (noticiaId: number) => {
    navigation.navigate("Noticia", {
      noticiaId,
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
          Blog
        </Text>
        <View>
          {noticias.map((noticia, index) => (
            <RectButton
              key={index}
              onPress={() => abrirNoticia(noticia.id_post)}
            >
              <View>
                <View>
                  <Image
                    style={styles.stretch}
                    source={{
                      uri: `http://192.168.1.64:3333/${noticia.filepath}`,
                    }}
                  ></Image>
                </View >
                <View style={{
                  marginBottom: 25,
                }}>
                  <Text style={styles.frase}>{noticia.titulo}</Text>
                  <Text style={styles.frase}>{noticia.autor}</Text>
                  <Text style={styles.frase}>{noticia.data}</Text>
                </View>
              </View>
            </RectButton>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 20,
    margin: "2%",
  },
  stretch: {
    maxWidth: 400,
    height: 200,
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
