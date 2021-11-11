import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimais, Animal } from "../../service/animal";
import { getPosts, Noticia, deletePost } from "../../service/post";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from "react-native-gesture-handler";
import moment from "moment";

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
  };

  const deleteNoticia = async () => {
    await deletePost(excluirNoticiaId);
    const noticias = await getPosts();
    setNoticias(noticias);
    setShowExcluirModal(false);
  };

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
        <Text style={styles.rText}>Deseja realmente excluir?</Text>
          <Pressable onPress={deleteNoticia}>
            <Text style={styles.rText}>Sim</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setShowExcluirModal(false);
            }}
          >
            <Text style={styles.rText}>Não</Text>
          </Pressable>
        </View>
      </Modal>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          marginBottom: "auto",
        }}
      >
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
                </View>
                <View>
                  <Text style={styles.frase}>{noticia.titulo}</Text>
                  <Text style={styles.frase}>{noticia.autor}</Text>
                  <Text style={styles.frase}>
                    {moment(noticia.data, "YYYY-MM-DD").format("DD/MM/YYYY")}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "stretch",
                      justifyContent: "center",
                      marginBottom: 5,
                    }}
                  >
                    <RectButton
                      onPress={() => abrirAlterarNoticia(noticia.id_post)}
                    >
                      <Text style={styles.acoes}>Alterar</Text>
                    </RectButton>

                    <RectButton
                      onPress={async () => {
                        await setExcluirNoticiaId(noticia.id_post);
                        setShowExcluirModal(true);
                      }}
                    >
                      <Text style={styles.acoes}>Excluir</Text>
                    </RectButton>
                  </View>
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
    backgroundColor: "white",
    flexDirection: "row",
  },
  titulo: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 20,
    margin: "2%",
  },
  stretch: {
    width: 400,
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
  acoes: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 14,
    color: "#737373",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  rText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
    margin: "2%",
    textAlign: "center",
  },
});
