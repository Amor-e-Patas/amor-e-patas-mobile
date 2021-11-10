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
import {
  Animal,
  getAnimaisDesaparecidosAnalise,
  alterarStatus,
} from "../../service/animal";
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
        const animais = await getAnimaisDesaparecidosAnalise();
        setAnimais(animais);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, [isFocused]);

  const aprovarAnimal = async () => {
    await alterarStatus(animalId, 1);
    const animais = await getAnimaisDesaparecidosAnalise();
    setAnimais(animais);
    setShowAprovarModal(false);
  };

  const negarAnimal = async () => {
    await alterarStatus(animalId, 2);
    const animais = await getAnimaisDesaparecidosAnalise();
    setAnimais(animais);
    setShowNegarModal(false);
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
          marginBottom: "auto",
        }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAprovarModal}
        >
          <View style={styles.centeredView}>
          <Text style={styles.rText2}>Deseja realmente aprovar?</Text>
            <Pressable onPress={aprovarAnimal}>
              <Text style={styles.acoes2}>Sim</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowAprovarModal(false);
              }}
            >
              <Text style={styles.acoes2}>Não</Text>
            </Pressable>
          </View>
        </Modal>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={showNegarModal}
        >
          <View style={styles.centeredView}>
          <Text style={styles.rText2}>Deseja realmente negar?</Text>
            <Pressable onPress={negarAnimal}>
              <Text style={styles.acoes2}>Sim</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowNegarModal(false);
              }}
            >
              <Text style={styles.acoes2}>Não</Text>
            </Pressable>
          </View>
        </Modal>

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
                height: 230,
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
                  uri: `http://192.168.1.64:3333/${animal?.images[0].filepath}`,
                }}
              ></Image>

              <Text
                style={{
                  color: "purple",
                  fontFamily: "Raleway_600SemiBold",
                  textAlign: "center",
                }}
              >
                {animal.nome_ani}
              </Text>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <RectButton
                  onPress={() => {
                    setAnimalId(animal.id_animal);
                    setShowAprovarModal(true);
                  }}
                >
                  <Text style={styles.acoes}>Aprovar</Text>
                </RectButton>
                <RectButton
                  onPress={() => {
                    setAnimalId(animal.id_animal);
                    setShowNegarModal(true);
                  }}
                >
                  <Text style={styles.acoes}>Negar</Text>
                </RectButton>
              </View>
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
    marginTop: 22,
    backgroundColor:"white",
    flexDirection: "row",
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

  acoes: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 14,
    color: "#737373",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  acoes2: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
    color: "black",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },

  rText2: {
    fontFamily: "Raleway_600SemiBold",
    fontSize: 17,
    margin: "2%",
    textAlign: "center",
  },
});
