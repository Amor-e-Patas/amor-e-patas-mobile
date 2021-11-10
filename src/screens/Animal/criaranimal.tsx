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
  Platform,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import mime from "mime";
import { getTemperamento, Temperamento } from "../../service/temperamento";
import { getSociavel, Sociavel } from "../../service/sociavel";
import { getVivencia, Vivencia } from "../../service/vivencia";
import DatePicker from '../../components/DatePicker';
import { Imagem } from "../../service/img_animal";

function Animal() {
  const [nome_ani, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cor, setCor] = useState("");
  const [caracteristica_animal, setCaracteristica] = useState("");
  const [data, setData] = useState("");
  const [desaparecido, setDesaparecido] = useState("");
  const [id_porte, setPorte] = useState("");
  const [id_usuario, setUsuario] = useState("");
  const [id_especie, setEspecie] = useState("");
  const [id_sexo, setSexo] = useState("");
  const [id_status, setStatus] = useState("3");
  const [temperamentos, setTemperamentos] = useState(Array<Temperamento>());
  const [selectTemp, setSelectTemp] = useState(Array<Number>());
  const [sociaveis, setSociavel] = useState(Array<Sociavel>());
  const [selectSoci, setSelectSoci] = useState(Array<Number>());
  const [vivencias, setVivencia] = useState(Array<Vivencia>());
  const [selectVive, setSelectVive] = useState(Array<Number>());
  const [images, setImages] = useState<Imagem[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<AuthRoutesParamList, "Cadastro de Animal">
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
      const temperamento = await getTemperamento();
      const sociavel = await getSociavel();
      const vivencia = await getVivencia();
      setTemperamentos(temperamento);
      setSociavel(sociavel);
      setVivencia(vivencia);
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
      aspect: [1, 1],
      quality: 1,
    });
    handleImagePicked(result);
  };

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
    if (images.length < 1 || images.length >= 5) {
      alert("Adicione pelo menos uma imagem");
      return;
    }
    try {
      const id_animal = await criarAnimal(
        nome_ani,
        idade,
        cor,
        caracteristica_animal,
        data,
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

      await criarImgAnimal(images, String(id_animal));

      alert("Animal cadastrado com sucesso e aguardando análise.");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      alert("Erro ao criar animal.");
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
          backgroundColor: "white",
        }}
      >
        {previewImages.map((imageUri, index) => (
          <View key={imageUri + index}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200 }}
            />
            <Pressable
              onPress={() => removerImagem(index)}
              style={styles.botao}
            >
              <Text>Remover</Text>
            </Pressable>
          </View>
        ))}
        {!(images.length >= 5) ? (
          <Button title="Selecionar imagem" onPress={pickImage} />
        ) : (
          <></>
        )}
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

        <TextInput
          style={styles.input}
          onChangeText={(e) => setCor(e)}
          placeholder="Cor"
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

        <View
          style={{
            height: 60,
            width: 320,
            margin: 12,
            padding: 10,
            borderRadius: 2,
            backgroundColor: "#f8f8f8",
            marginBottom: 30,
          }}
        >
          <DatePicker
            onChange={setData}
            label="Data de nascimento"
            buttonText="Selecione a data de nascimento"
          />
        </View>

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
        <View
          style={{
            flex: 2,
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "flex-start",
            width: 300,
            marginTop: 10,
            
          }}
        >
          <Text style={styles.tem}>Temperamento</Text>
          {temperamentos.map((temperamento, index) => (
            <View
              key={index}
            >
              <BouncyCheckbox
                size={20}
                style={{ margin: "2%" }}
                text={temperamento.descricao}
                onPress={(isChecked: boolean) => {
                  if (isChecked) {
                    const aux = [...selectTemp];
                    aux.push(temperamento.id_temperamento);
                    console.log(aux);
                    setSelectTemp(aux);
                  } else {
                    const aux = [
                      ...selectTemp.filter(
                        (item) => item != temperamento.id_temperamento
                      ),
                    ];
                    console.log(aux);
                    setSelectTemp(aux);
                  }
                }}
              />
            </View>
          ))}
          <Text style={styles.tem}>Vivencia</Text>
          {vivencias.map((vivencia, index) => (
            <View
              key={index}
              
            >
              <BouncyCheckbox
                size={20}
                style={{ margin: "2%" }}
                text={vivencia.descricao}
                onPress={(isChecked: boolean) => {
                  if (isChecked) {
                    const aux = [...selectVive];
                    aux.push(vivencia.id_vivencia);
                    console.log(aux);
                    setSelectVive(aux);
                  } else {
                    const aux = [
                      ...selectVive.filter(
                        (item) => item != vivencia.id_vivencia
                      ),
                    ];
                    console.log(aux);
                    setSelectVive(aux);
                  }
                }}
              />
            </View>
          ))}
          <Text style={styles.tem}>Sociavel com</Text>
          {sociaveis.map((sociavel, index) => (
            <View
              key={index}
              
            >
              <BouncyCheckbox
                size={20}
                style={{ margin: "2%" }}
                text={sociavel.descricao}
                onPress={(isChecked: boolean) => {
                  if (isChecked) {
                    const aux = [...selectSoci];
                    aux.push(sociavel.id_sociavel);
                    console.log(aux);
                    setSelectSoci(aux);
                  } else {
                    const aux = [
                      ...selectSoci.filter(
                        (item) => item != sociavel.id_sociavel
                      ),
                    ];
                    console.log(aux);
                    setSelectSoci(aux);
                  }
                }}
              />
            </View>
          ))}
        </View>
        <RectButton onPress={eventoCriarAnimal} style={styles.botao}>
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

  tem:{
    color:"#575245",
    fontFamily: "Raleway_600SemiBold",
    fontSize:17,
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
