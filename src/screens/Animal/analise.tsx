import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Modal, Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { Animal, getAnimaisEmAnalise, alterarStatus } from "../../service/animal";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from "react-native-gesture-handler";

export default function Analise() {
  const [images, setImages] = useState<File[]>([]);
  const [animais, setAnimais] = useState(Array<Animal>());
  const [nome, setNome] = useState("");
  const [showAprovarModal, setShowAprovarModal] = useState(false);
  const [showNegarModal, setShowNegarModal] = useState(false);
  const [animalId, setAnimalId] = useState(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchAPI() {
      try {
        const animais = await getAnimaisEmAnalise();
        setAnimais(animais);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, [isFocused]);

  const aprovarAnimal = async () => {
    await alterarStatus(animalId, 1);
    const animais = await getAnimaisEmAnalise();
    setAnimais(animais);
    setShowAprovarModal(false);
  }

  const negarAnimal = async () => {
    await alterarStatus(animalId, 2);
    const animais = await getAnimaisEmAnalise();
    setAnimais(animais);
    setShowNegarModal(false);
  }

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
          visible={showAprovarModal}
        >
          <View style={styles.centeredView}>
            <Pressable onPress={aprovarAnimal}><Text>Sim</Text></Pressable>
            <Pressable onPress={() => { setShowAprovarModal(false) }}><Text>Não</Text></Pressable>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showNegarModal}
        >
          <View style={styles.centeredView}>
            <Pressable onPress={negarAnimal}><Text>Sim</Text></Pressable>
            <Pressable onPress={() => { setShowNegarModal(false) }}><Text>Não</Text></Pressable>
          </View>
        </Modal>
        <Text
          style={{
            alignItems: "center",
            color: "#FFB800",
            fontSize: 25,
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          Animais aguardando análise
        </Text>

        <View
          style={{
            flex: 2,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: 400,
            marginTop: 10,
          }}
        >
          {animais.map((animal, index) => (

            <View
              style={{
                height: 200,
                width: "45%",
                marginBottom: 5,
                marginLeft: 5,
                marginTop: 5,
                alignContent: "center",
              }}
            >
              <Image
                style={styles.stretch}
                source={{
                  uri: `http://192.168.1.69:3333/${animal?.images[0].filepath}`,
                }}
              ></Image>

              <Text
                style={{
                  color: "purple",
                  fontFamily: "Raleway_600SemiBold",
                  textAlign: "right",
                }}
              >
                {animal.nome_ani}
              </Text>
              <RectButton onPress={() => {
                setAnimalId(animal.id_animal);
                setShowAprovarModal(true);
              }}>
                <Text>Aprovar</Text>
              </RectButton>
              <RectButton onPress={() => {
                setAnimalId(animal.id_animal);
                setShowNegarModal(true);
              }}>
                <Text>Negar</Text>
              </RectButton>
            </View>
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
    marginTop: 22
  },
  stretch: {
    width: 180,
    height: 400,
    maxWidth: 180,
    maxHeight: 170,
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
