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
        console.log(animal, "aniii");
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
          backgroundColor: "white",
          marginBottom: "10%",
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
            <Text style={styles.adotar2}>Dados do anunciante</Text>
            <View style={{
            flex: 4,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: 200,
            marginTop: 10,
          }}>
              
              
              <Text style={styles.dados}>{animal?.nome_usu}</Text>
              
              <Text style={styles.dados}>{animal?.num_telefone}</Text>
              
              <Text style={styles.dados}>
                {animal?.cidade} - {animal?.estado}
              </Text>
            </View>
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
              uri: `http://192.168.1.64:3333/${animal?.images[0].filepath}`,
            }}
          ></Image>

          {animal?.images.map((image, index) => (
            <Pressable
              key={index}
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
        </View>

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
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            alignContent: "flex-start",
            marginHorizontal: 20,
          }}
        >
          <Image
            style={styles.icon}
            source={require("../../../assets/patas.png")}
          />
          <Text style={styles.dados}>{animal?.nome_esp}</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            alignContent: "flex-start",
            marginHorizontal: 50,
            marginTop: 2,
          }}
        >
          <Text style={styles.dados}>{animal?.idade}</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            alignContent: "flex-start",
            marginHorizontal: 20,
            marginTop: 2,
          }}
        >
          {animal?.tipo_sexo == "Masculino" ? (
            <Image
              style={styles.icon2}
              source={require("../../../assets/male-gender.png")}
            />
          ) : (
            <Image
              style={styles.icon2}
              source={require("../../../assets/femea.png")}
            />
          )}
          <Text style={styles.dados}>{animal?.tipo_sexo}</Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            alignContent: "flex-start",
            marginHorizontal: 50,
            marginTop: 2,
          }}
        >
          <Text style={styles.dados}>{animal?.caracteristica_animal}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            alignContent: "flex-start",
            marginHorizontal: 20,
            marginTop: 2,
          }}
        >
          <Image
            style={styles.icon2}
            source={require("../../../assets/endereco2.png")}
          />
          <Text style={styles.dados}>
            Localizado em {animal?.cidade} - {animal?.estado}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 70,
            marginTop: 5,
          }}
        >
          <Text style={styles.dados}>Temperamento</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            alignContent: "flex-start",
            marginHorizontal: 90,
            marginTop: 2,
          }}
        >
          {animal?.temperamentos.map((temperamento, index) => (
            <Text key={index} style={styles.dados2}>
              {temperamento.descricao}
            </Text>
          ))}
        </View>

        <View
          style={{
            marginHorizontal: 70,
            marginTop: 5,
          }}
        >
          <Text style={styles.dados}>Sociavel com </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            alignContent: "flex-start",
            marginHorizontal: 90,
            marginTop: 2,
          }}
        >
          {animal?.sociaveis.map((sociavel, index) => (
            <Text key={index} style={styles.dados2}>
              {sociavel.descricao}
            </Text>
          ))}
        </View>
        <View
          style={{
            marginHorizontal: 70,
            marginTop: 5,
          }}
        >
          <Text style={styles.dados}>Vive bem com </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            alignContent: "flex-start",
            marginHorizontal: 90,
            marginTop: 2,
          }}
        >
          {animal?.vivencias.map((vivencia, index) => (
            <Text style={styles.dados2} key={index}>
              {vivencia.descricao}
            </Text>
          ))}
        </View>

        <RectButton onPress={() => setShowAdotarModal(true)}>
          <Text style={styles.adotar}>Quero adotar</Text>
        </RectButton>
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
    paddingTop: 350
    //flexDirection: "row",
    
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
  dados: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
    color: "gray",
  },

  dados2: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 15,
    color: "#7D6B7D",
  },

  icon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },

  icon2: {
    width: 20,
    height: 20,
    marginRight: 8,
  },

  adotar: {
    marginTop: 15,
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
    color: "purple",
    textAlign: "center",
  },

  adotar2: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 20,
    color: "purple",
    textAlign: "center",
  },
});
