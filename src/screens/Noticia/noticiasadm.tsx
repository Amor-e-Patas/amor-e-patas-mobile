import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Modal, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimais, Animal } from "../../service/animal";
import { getPosts, Noticia, deletePost } from "../../service/post";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from "react-native-gesture-handler";

export default function NoticiasAdm() {
  const [noticias, setNoticias] = useState(Array<Noticia>());
  const [nome, setNome] = useState("");
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [excluirNoticiaId, setExcluirNoticiaId] = useState(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchAPI() {
      try {
        const noticias = await getPosts();
        setNoticias(noticias);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, [isFocused]);

  const abrirNoticia = (noticiaId: number) => {
    navigation.navigate("Noticia", {
      noticiaId,
    });
  };

  const abrirAlterarNoticia = (noticiaId: number) => {
    navigation.navigate("Alterar noticia", {
      noticiaId,
    });
  }

  const deleteNoticia = async () => {
    await deletePost(excluirNoticiaId);
    const noticias = await getPosts();
    setNoticias(noticias);
    setShowExcluirModal(false);
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={showExcluirModal}
      >
        <View style={styles.centeredView}>
          <Pressable onPress={deleteNoticia}><Text>Sim</Text></Pressable>
          <Pressable onPress={() => { setShowExcluirModal(false) }}><Text>Não</Text></Pressable>
        </View>
      </Modal>
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
                      uri: `http://192.168.1.69:3333/${noticia.filepath}`,
                    }}
                  ></Image>
                </View >
                <View style={{
                  marginBottom: 25,
                }}>
                  <Text style={styles.frase}>{noticia.titulo}</Text>
                  <Text style={styles.frase}>{noticia.autor}</Text>
                  <Text style={styles.frase}>{noticia.data}</Text>
                  <RectButton onPress={() => abrirAlterarNoticia(noticia.id_post)}><Text>Alterar</Text></RectButton>
                  <RectButton onPress={async () => {
                    await setExcluirNoticiaId(noticia.id_post);
                    setShowExcluirModal(true);
                  }}><Text>Deletar</Text></RectButton>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
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
