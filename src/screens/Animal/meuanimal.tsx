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
import { getAnimal, Animal, deleteAnimal } from "../../service/animal";
import { useNavigation, useRoute } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from "react-native-gesture-handler";

interface NoticiaParams {
  animalId: number;
}

export default function Home() {
  const [animal, setAnimal] = useState<Animal>();
  const [showImageModal, setShowImageModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [modalImagelUrl, setModalImageUrl] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();
  const [excluirAnimalId, setExcluirIdAnimal] = useState(0);
  const route = useRoute();
  const routeParams = route.params as NoticiaParams;

  useEffect(() => {
    async function fetchAPI() {
      try {
        const animal = await getAnimal(routeParams.animalId);
        setAnimal(animal);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, [route]);

  const abrirModalImagem = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setShowImageModal(!showImageModal);
  };

  const excluirAnimal = async () => {
    await deleteAnimal(excluirAnimalId);
    console.log(excluirAnimalId);
    setShowExcluirModal(false);
    navigation.navigate("Meus animais");
  };

  const abrirAlterarAnimal = (animalId: number) => {
    navigation.navigate("Alterar animal", {
      animalId,
    });
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
        visible={showImageModal}
        onRequestClose={() => {
          setShowImageModal(!showImageModal);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            onPress={() => setShowImageModal(!showImageModal)}
          ></Pressable>
          <Image
            style={styles.stretch2}
            source={{
              uri: modalImagelUrl,
            }}
          ></Image>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showExcluirModal}
      >
        <View style={styles.centeredView}>
        <Text style={styles.rText2}>Deseja realmente excluir?</Text>
          <Pressable onPress={excluirAnimal}>
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
          marginBottom: "100%",
        }}
      >
        <View>
          <Image
            style={styles.stretch}
            source={{
              uri: `http://192.168.1.64:3333/${animal?.images[0].filepath}`,
            }}
          ></Image>

          {animal?.images.map((image) => (
            <Pressable
              onPress={() =>
                abrirModalImagem(`http://192.168.1.64:3333/${image.filepath}`)
              }
            >
              <Image
                style={styles.previewImage}
                source={{
                  uri: `http://192.168.1.64:3333/${image.filepath}`,
                }}
              ></Image>
            </Pressable>
          ))}
          <View></View>
        </View>

        <View>
          <Text
            style={{
              color: "purple",
              fontFamily: "Raleway_600SemiBold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {animal?.nome_ani}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: 400,
            marginTop: 10,
          }}
        >
          <RectButton
            onPress={() => abrirAlterarAnimal(animal?.id_animal as number)}
          >
            <Text style={styles.rText}>Editar</Text>
          </RectButton>

          <RectButton
            onPress={() => {
              setExcluirIdAnimal(animal?.id_animal as number);
              setShowExcluirModal(true);
            }}
          >
            <Text style={styles.rText}>Excluir</Text>
          </RectButton>
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

  stretch: {
    width: 380,
    height: 350,
    resizeMode: "stretch",
  },

  stretch2: {
    width: 380,
    height: 350,
    resizeMode: "stretch",
    
  },

  rText: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
    margin: "2%",
    textAlign: "center",
  },

  rText2: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
    margin: "2%",
    textAlign: "center",
  },

  previewImage: {
    width: 70,
    height: 70,
    marginTop: 5,
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
