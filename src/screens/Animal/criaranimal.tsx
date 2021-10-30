import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Link, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import axios from "axios";
import { getAnimaisDesaparecidos } from "../../service/animal";
import { criarAnimal } from "../../service/animal";
import { criarImgAnimal } from "../../service/img_animal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontFamily } from "../../constants/theme";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import mime from 'mime'

interface Temp {
  id_temperamento: number;
  descricao: string;
}

interface Soci {
  id_sociavel: number;
  descricao: string;
}

interface Vive {
  id_vivencia: number;
  descricao: string;
}

interface Imagem {
  uri: string,
  height: number,
  type: string
}

function Animal() {
  const [nome_ani, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cor, setCor] = useState("");
  const [caracteristica_animal, setCaracteristica] = useState("");
  const [data_nasc, setData] = useState("");
  const [desaparecido, setDesaparecido] = useState("");
  const [id_porte, setPorte] = useState("");
  const [id_usuario, setUsuario] = useState("");
  const [id_especie, setEspecie] = useState("");
  const [id_sexo, setSexo] = useState("");
  const [id_status, setStatus] = useState("3");
  const [temperamentos, setTemperamentos] = useState(Array<Temp>());
  const [selectTemp, setSelectTemp] = useState(Array<Number>());
  const [sociaveis, setSociavel] = useState(Array<Soci>());
  const [selectSoci, setSelectSoci] = useState(Array<Number>());
  const [vivencias, setVivencia] = useState(Array<Vive>());
  const [selectVive, setSelectVive] = useState(Array<Number>());
  const [images, setImages] = useState<Imagem[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthRoutesParamList, "Cadastro de Animal">
    >();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleImagePicked = async (pickerResult: ImagePicker.ImagePickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert('Upload cancelled');
        return;
      } else {
        setPreviewImages([...previewImages, pickerResult.uri as any]);
        setImages([...images, pickerResult as any]);
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    handleImagePicked(result)
  }


  async function eventoCriarAnimal() {
    if (nome_ani == "") {
      alert("Preencha o nome do animal.");
      return;
    }

    if (id_sexo == "") {
      alert("Selecione o sexo.");
      return;
    }

    if (id_especie == "") {
      alert("Selecione a espécie.");
      return;
    }

    if (id_porte == "") {
      alert("Selecione o porte.");
      return;
    }

    if (desaparecido == "") {
      alert("Informe se o animal está desaparecido.");
      return;
    }
    try {
      const id_animal = await criarAnimal(
        nome_ani,
        idade,
        cor,
        caracteristica_animal,
        data_nasc,
        desaparecido,
        parseInt(id_usuario),
        parseInt(id_porte),
        parseInt(id_especie),
        parseInt(id_sexo),
        parseInt(id_status),
        selectTemp,
        selectSoci,
        selectVive
      );
      await criarImgAnimal(
        images,
        String(id_animal)
      );

      alert("Animal cadastrado com sucesso e aguardando análise.");
      // navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar animal.");
    }
  }

  function removerImagem(index: number) {
    const imagesTemp = [...images.slice(0, index), ...images.slice(index + 1, images.length)]
    const imagesPreviewTemp = [...previewImages.slice(0, index), ...previewImages.slice(index + 1, previewImages.length)]
    console.log('312312', imagesPreviewTemp);
    setImages([...imagesTemp]);
    setPreviewImages([...imagesPreviewTemp]);

  }

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15%",
          backgroundColor: "#f8f8f8",
        }}>
        {
          previewImages.map((imageUri, index) => <View key={imageUri + index}>
            <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
            <Pressable onPress={() => removerImagem(index)} style={styles.botao}>
              <Text>Remover</Text>
            </Pressable>
          </View>)
        }
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15%",
          marginBottom: "10%",
          backgroundColor: 'white',

        }}
      >
        <Text
          style={{
            alignItems: "center",
            color: "#FFB800",
            fontSize: 25,
          }}
        >
          Cadastro de Animal
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setNome(e)}
          placeholderTextColor="#575245"
          placeholder="Nome"
        />

        <TextInput
          style={styles.input}
          onChangeText={(e) => setIdade(e)}
          placeholder="Idade"
          placeholderTextColor="#575245"
        />

        <View>
          <Picker
            style={styles.input}
            selectedValue={id_sexo}
            onValueChange={(itemValue, itemIndex) => {
              setSexo(itemValue);
            }}
          >
            <Picker.Item label="Selecione o sexo" value={0} />
            <Picker.Item label="Fêmea" value="1" />
            <Picker.Item label="Macho" value="2" />
          </Picker>
        </View>

        <TextInput
        style={styles.input}
        onChangeText={(e) => setData(e)}
        placeholder="Data de Nascimento"
        placeholderTextColor="#575245"></TextInput>

        <Picker
          style={styles.input}
          selectedValue={id_especie}
          onValueChange={(itemValue, itemIndex) => {
            setEspecie(itemValue);
          }}
        >
          <Picker.Item label="Selecione a especie" value={0} />
          <Picker.Item label="Gato" value="1" />
          <Picker.Item label="Cachorro" value="2" />
        </Picker>

        <Picker
          style={styles.input}
          selectedValue={id_porte}
          onValueChange={(itemValue, itemIndex) => {
            setPorte(itemValue);
          }}
        >
          <Picker.Item label="Selecione o porte" value={0} />
          <Picker.Item label="Pequeno" value="1" />
          <Picker.Item label="Médio" value="2" />
          <Picker.Item label="Grande" value="3" />
        </Picker>

        <Picker
          style={styles.input}
          selectedValue={desaparecido}
          onValueChange={(itemValue, itemIndex) => {
            setDesaparecido(itemValue);
          }}
        >
          <Picker.Item label="Este animal está desaparecido?" value={0} />
          <Picker.Item label="Não" value="N" />
          <Picker.Item label="Sim" value="S" />
        </Picker>

        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholderTextColor="#575245"
          style={{
            height: 200,
            textAlignVertical: "top",
            width: 320,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            color: "black",
            borderRadius: 2,
            backgroundColor: "#f8f8f8",
          }}
          onChangeText={(e) => setCaracteristica(e)}
          placeholder="Características adicionais"
        />
        

        <Pressable onPress={eventoCriarAnimal} style={styles.botao}>
          <Text>Cadastrar</Text>
        </Pressable>

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
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#B7E394",
    alignItems: "center",
    borderRadius: 5,
  },
});
export default Animal;
