import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Modal, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimal, Animal, deleteAnimal } from "../../service/animal";
import { useNavigation, useRoute } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from 'react-native-gesture-handler';

interface NoticiaParams {
  animalId: number
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
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          marginBottom: "100%"
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
            >
              <Text>X</Text>
            </Pressable>
            <Image
              style={styles.stretch}
              source={{
                uri: modalImagelUrl,
              }}></Image>
          </View>
        </Modal>
        <View>
          <Image
            style={styles.stretch}
            source={{
              uri: `http://192.168.1.69:3333/${animal?.images[0].filepath}`,
            }}></Image>
          <Text>{animal?.nome_ani}</Text>
          {
            animal?.images.map(image => <Pressable onPress={() => abrirModalImagem(`http://192.168.1.69:3333/${image.filepath}`)}>
              <Image
                style={styles.previewImage}
                source={{
                  uri: `http://192.168.1.69:3333/${image.filepath}`,
                }}></Image>
            </Pressable>)
          }
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
    marginTop: 22
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
  },
  previewImage: {
    width: 50,
    height: 50,
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
