import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  Pressable,
} from "react-native";
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
import { deleteComentario, getComentarios } from "../../service/comentario";
import { RectButton } from "react-native-gesture-handler";
import moment from "moment";
import { criarComentario } from "../../service/comentario";
import { AuthContext } from "../../contexts/auth";

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
  const [comentarios, setComentarios] = useState(Array<Comentario>());
  const [novoComentario, setNovoComentario] = useState("");
  const [showDeleteComentario, setShowDeleteComentario] = useState(false);
  const [deleteComentarioId, setDeleteComentarioId] = useState(0);
  const route = useRoute();
  const routeParams = route.params as NoticiaParams;
  const { id_usuario, isAdm, isAuthenticated } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();

  async function addComentario() {
    if (novoComentario == "") {
      alert("Escreva um comentário.");
      return;
    }
    await criarComentario(
      novoComentario,
      moment().format("YYYY-MM-DD"),
      0,
      routeParams.noticiaId
    );
    await fetchComentarios();
    setNovoComentario("");
  }
  async function fetchComentarios() {
    const comentario = await getComentarios(routeParams.noticiaId);
    setComentarios(comentario);
  }

  async function handleDeleteComentario() {
    await deleteComentario(deleteComentarioId);
    await fetchComentarios();
    setShowDeleteComentario(false);
  }

  useEffect(() => {
    async function fetchAPI() {
      try {
        const noticia = await getPost(routeParams.noticiaId);
        noticia.data = moment(noticia.data, "YYYY-MM-DD").format("DD/MM/YYYY");
        setNoticia(noticia);
        await fetchComentarios();
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
          marginBottom: "5%",
        }}
      >
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showDeleteComentario}
          >
            <View style={styles.centeredView}>
              <Text style={styles.rText2}>Deseja realmente excluir?</Text>
              <Pressable onPress={handleDeleteComentario}>
                <Text style={styles.rText2}>Sim</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowDeleteComentario(false);
                }}
              >
                <Text style={styles.rText2}>Não</Text>
              </Pressable>
            </View>
          </Modal>
          <Image
            style={styles.stretch}
            source={{
              uri: `http://192.168.1.69:3333/${noticia?.images[0].filepath}`,
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

          {noticia?.assuntos.map((assunto, index) => (
            <Text key={index} style={styles.autor2}>
              {assunto.nome_ass}
            </Text>
          ))}
          <Text style={styles.titulo}>{noticia?.titulo}</Text>

          <RenderHtml
            contentWidth={width}
            source={{ html: noticia?.corpo || "" }}
          />
        </View>
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
      { isAuthenticated ? (
      <>
        <TextInput
          value={novoComentario}
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
          onChangeText={setNovoComentario}
          placeholder="Adicionar um comentário..."
        />
        <RectButton onPress={addComentario}>
          <Text
            style={{
              fontFamily: "Raleway_600SemiBold",
              fontSize: 14,
              marginLeft: "10%",
              textAlign: "right",
              color: "black",
            }}
          >
            Adicionar comentário
          </Text>
        </RectButton>
        </>) : (
          <></>
        )
        
        }
      </View>

      <View style={{ marginTop: "7%" }}>
        {comentarios.map((comentario, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              marginTop: 5,
              alignContent: "center",
              marginLeft: "5%",
              marginRight: "5%",
              borderWidth: 0.2,
              padding: 20,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Raleway_600SemiBold",
                fontSize: 12,
                margin: "2%",
                textAlign: "left",
                color: "purple",
              }}
            >
              {comentario.nome_usu}
            </Text>
            <Text
              style={{
                fontFamily: "Raleway_600SemiBold",
                fontSize: 12,
                margin: "2%",
                textAlign: "left",
                color: "#737373",
              }}
            >
              {moment(comentario.data).format("DD/MM/YYYY")}
            </Text>
            <Text
              style={{
                fontFamily: "Raleway_600SemiBold",
                fontSize: 12,
                marginLeft: "10%",
                textAlign: "left",
                color: "black",
              }}
            >
              {comentario.texto}
            </Text>

            {id_usuario === comentario.id_usuario || isAdm ? (
              <RectButton
                onPress={() => {
                  setDeleteComentarioId(comentario.id_comentario);
                  setShowDeleteComentario(true);
                }}
              >
                <Text
                  style={{
                    fontFamily: "Raleway_600SemiBold",
                    fontSize: 13,
                    marginLeft: "10%",
                    textAlign: "right",
                    color: "#737373",
                  }}
                >
                  Excluir
                </Text>
              </RectButton>
            ) : (
              <></>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },
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
    maxWidth: 400,
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
  rText2: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
    margin: "2%",
    textAlign: "center",
  },
});
