import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimais, Animal } from "../../service/animal";
import { getPosts, getPost, Noticia } from "../../service/post";
import { useNavigation, useRoute } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { getComentarios } from "../../service/comentario";

interface NoticiaParams {
  noticiaId: number;
}

interface Comentario {
  texto: string;
  data: string;
  id_comentario: number;
  nome_usu: string;
  id_post: number;
  id_usuario: number;
}

export default function Post() {
  const [noticia, setNoticia] = useState<Noticia>();
  const route = useRoute();
  const routeParams = route.params as NoticiaParams;
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();
  const { width } = useWindowDimensions();
  const [comentarios, setComentarios] = useState(Array<Comentario>());

  useEffect(() => {
    async function fetchAPI() {
      try {
        const noticia = await getPost(routeParams.noticiaId);
        console.log(noticia, "notizia");
        setNoticia(noticia);

        const comentario = await getComentarios(routeParams.noticiaId);
        setComentarios(comentario);
        console.log(comentario);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAPI();
  }, [routeParams]);

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          marginBottom: "100%",
        }}
      >
        <View>
          <Image
            style={styles.stretch}
            source={{
              uri: `http://192.168.1.64:3333/${noticia?.images[0].filepath}`,
            }}
          ></Image>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginBottom: "10%",
            marginLeft: "5%",
            marginRight: "5%",
          }}
        >
          <Text style={styles.autor}>
            {noticia?.autor} | {noticia?.data}
          </Text>

          {noticia?.assuntos.map((assunto) => (
            <Text style={styles.autor2}>{assunto.nome_ass}</Text>
          ))}
          <Text style={styles.titulo}>{noticia?.titulo}</Text>
          <RenderHtml
            contentWidth={width}
            source={{ html: noticia?.corpo || "" }}
          />
        </View>
        <Hr />

        <View
          style={{
            backgroundColor: "white",
            marginTop: "5%",
            alignContent: "center",
            marginLeft: "5%",
            marginRight: "5%",
          }}
        >
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholderTextColor="#575245"
            style={{
              height: 100,
              textAlignVertical: "top",
              width: "100%",
              marginTop: "5%",
              borderWidth: 1,
              padding: 5,
              color: "black",
              borderRadius: 2,
              backgroundColor: "#f8f8f8",
            }}
            //onChangeText={(e) => setCorpo(e)}
            placeholder="Adicionar um comentário..."
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            marginTop: "10%",
            alignContent: "center",
            marginLeft: "5%",
            marginRight: "5%",
            borderWidth: 0.2,
            padding: 20
          }}
        >
          {comentarios.map((comentario) => (
            <>
              <Text
                style={{
                  fontFamily: "Raleway_600SemiBold",
                  fontSize: 12,
                  margin: "2%",
                  textAlign: "left",
                  color:"purple"
                }}
              >
                {comentario.nome_usu}
              </Text>
              <Text style={{
                  fontFamily: "Raleway_600SemiBold",
                  fontSize: 12,
                  margin: "2%",
                  textAlign: "left",
                  color:"#737373"
                }}>{comentario.data}</Text>
              <Text style={{
                  fontFamily: "Raleway_600SemiBold",
                  fontSize: 12,
                  marginLeft: "10%",
                  textAlign: "left",
                  color:"black"
                }}>{comentario.texto}</Text>
            </>
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
    textAlign: "center",
  },
  stretch: {
    width: 400,
    height: 200,
    maxHeight: 200,
    marginBottom: "4%",
  },

  corpo: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 15,
    margin: "2%",
    textAlign: "justify",
  },

  frase: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 14,
    color: "#737373",
    textAlign: "center",
    marginLeft: "5%",
    marginRight: "5%",
  },
  autor: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 13,
    color: "black",
    textAlign: "left",
  },

  autor2: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 13,
    color: "black",
    textAlign: "left",
  },
});
