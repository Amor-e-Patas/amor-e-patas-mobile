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
import { Button } from "react-native-elements/dist/buttons/Button";

interface NoticiaParams {
  animalId: number;
}

export default function AnimalHome() {
  const [animal, setAnimal] = useState<Animal>();
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAdotarModal, setShowAdotarModal] = useState(false);
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
        console.log(animal, 'aniii')
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAdotarModal}
          onRequestClose={() => {
            setShowAdotarModal(!showAdotarModal);
          }}
        >
          <View style={styles.centeredView}>
          <Text>Dados do anunciante</Text>
          <Text>{animal?.nome_usu}</Text>
          <Text>{animal?.num_telefone}</Text>
          <Text>{animal?.cidade} - {animal?.estado}</Text>
          </View>
        </Modal>

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
              style={styles.stretch}
              source={{
                uri: modalImagelUrl,
              }}
            ></Image>
          </View>
        </Modal>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: 7,
          }}
        >
          <Image
            style={styles.stretch}
            source={{
              uri: `http://192.168.1.69:3333/${animal?.images[0].filepath}`,
            }}
          ></Image>

          {animal?.images.map((image, index) => (
            <Pressable
              key={index}
              onPress={() =>
                abrirModalImagem(`http://192.168.1.69:3333/${image.filepath}`)
              }
            >
              <Image
                style={styles.previewImage}
                source={{
                  uri: `http://192.168.1.69:3333/${image.filepath}`,
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
          <Text>{animal?.nome_esp}</Text>
          <Text>{animal?.idade}</Text>
          <Text>{animal?.tipo_sexo}</Text>
          <Text>Localizado em {animal?.cidade} - {animal?.estado}</Text>
          <RectButton onPress={() => setShowAdotarModal(true)}><Text>Quero adotar</Text></RectButton>
          <Text>{animal?.caracteristica_animal}</Text>
          {animal?.temperamentos.map((temperamento, index) => <Text key={index}>{temperamento.descricao}</Text>)}
          {animal?.sociaveis.map((sociavel, index) => <Text key={index}>{sociavel.descricao}</Text>)}
          {animal?.vivencias.map((vivencia, index) => <Text key={index}>{vivencia.descricao}</Text>)}
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
