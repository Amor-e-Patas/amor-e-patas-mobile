import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Link, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import {
  criarPost,
  getAssuntos,
  criarImgPost,
  Imagem,
} from "../../service/post";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import moment from 'moment';


interface Assunto {
  id_assunto: number;
  nome_ass: string;
}

export default function Post() {
  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [autor, setAutor] = useState("");
  const [data, setData] = useState(moment().format('YYYY-MM-DD'));
  const [assuntos, setAssuntos] = useState<Assunto[]>([]);
  const [selectAssunto, setSelectAssunto] = useState<Number[]>([]);
  const [images, setImages] = useState<Imagem[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthRoutesParamList, "Cadastrar Notícia">
    >();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    async function fetchAPI() {
      try {
        const assunto = await getAssuntos();
        setAssuntos(assunto);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  const handleImagePicked = async (
    pickerResult: ImagePicker.ImagePickerResult
  ) => {
    try {
      if (pickerResult.cancelled) {
        alert("Upload cancelled");
        return;
      } else {
        setPreviewImages([...previewImages, pickerResult.uri as any]);
        setImages([...images, pickerResult as any]);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    });
    handleImagePicked(result);
  };

  async function eventoCriarPost() {
    if (titulo == "") {
      alert("Preencha o título.");
      return;
    }

    if (images.length !== 1) {
      alert("Adicione pelo menos uma imagem");
      return;
    }

    try {
      const id_post = await criarPost(
        titulo,
        corpo,
        autor,
        data,
        selectAssunto
      );

      console.log(id_post, "possst");
      console.log(images, "imagenss");
      await criarImgPost(images, String(id_post));
      alert("Notícia cadastrada com sucesso.");
      navigation.navigate("Menu noticias");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar post.");
    }
  }

  function removerImagem(index: number) {
    const imagesTemp = [
      ...images.slice(0, index),
      ...images.slice(index + 1, images.length),
    ];
    const imagesPreviewTemp = [
      ...previewImages.slice(0, index),
      ...previewImages.slice(index + 1, previewImages.length),
    ];
    console.log("312312", imagesPreviewTemp);
    setImages([...imagesTemp]);
    setPreviewImages([...imagesPreviewTemp]);
  }

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15%",
          backgroundColor: "#f8f8f8",
        }}
      >
        {previewImages.map((imageUri, index) => (
          <View key={imageUri + index}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: 300, height: 200 }}
            />
            <Pressable
              onPress={() => removerImagem(index)}
              style={styles.botao}
            >
              <Text>Remover</Text>
            </Pressable>
          </View>
        ))}
        {!(images.length >= 1) ? <Button title="Selecionar Imagem" onPress={pickImage} /> : <></>}
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15%",
          marginBottom: "10%",
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            alignItems: "center",
            color: "#FFB800",
            fontSize: 25,
          }}
        >
          Cadastro de Notícia
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setTitulo(e)}
          placeholderTextColor="#575245"
          placeholder="Título"
        />

        <TextInput
          style={styles.input}
          onChangeText={(e) => setAutor(e)}
          placeholder="Autor"
          placeholderTextColor="#575245"
        />

        <View
          style={{
            flex: 2,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: 400,
          }}
        >
          {assuntos.map((assunto, index) => (
            <View
              key={index}
              style={{

              }}
            >
              <BouncyCheckbox
                size={20}
                style={{ margin: "2%" }}
                text={assunto.nome_ass}
                onPress={(isChecked: boolean) => {
                  setSelectAssunto((old) => [...old, assunto.id_assunto]);
                }}
              />
            </View>
          ))}
        </View>

        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholderTextColor="#575245"
          style={{
            height: 500,
            textAlignVertical: "top",
            width: 320,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            color: "black",
            borderRadius: 2,
            backgroundColor: "#f8f8f8",
          }}
          onChangeText={(e) => setCorpo(e)}
          placeholder="Corpo do texto"
        />

        <RectButton onPress={eventoCriarPost} style={styles.botao}>
          <Text>Cadastrar</Text>
        </RectButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 320,
    margin: 12,
    padding: 10,
    color: "black",
    borderRadius: 2,
    fontSize: 15,
    backgroundColor: "#f8f8f8",
  },

  button: {
    padding: 2,
  },

  cad: {
    color: "#890620",
    padding: 2,
  },

  botao: {
    height: 40,
    width: 180,
    margin: 12,
    padding: 10,
    backgroundColor: "#B7E394",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 55,
  },
});
