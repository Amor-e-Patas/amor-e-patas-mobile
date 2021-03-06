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
import { Picker } from "@react-native-picker/picker";
import { RectButton } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { alterarPost, getAssuntos, criarImgPost, Imagem, getPost } from "../../service/post";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

interface Assunto {
    id_assunto: number;
    nome_ass: string;
}

interface NoticiaParams {
    noticiaId: number
}
export default function AlterarNoticia() {
    const [titulo, setTitulo] = useState("");
    const [corpo, setCorpo] = useState("");
    const [autor, setAutor] = useState("");
    const [data, setData] = useState("");
    const [assuntos, setAssuntos] = useState<Assunto[]>([]);
    const [selectAssuntos, setSelectAssuntos] = useState<number[]>([]);
    const [images, setImages] = useState<Imagem[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [oldPreviewImages, setOldPreviewImages] = useState<string[]>([]);
    const [removeOldImage, setRemoveOldImage] = useState(false);
    const [checkBoxes, setCheckBoxes] = useState<Array<boolean>>([]);
    const navigation =
        useNavigation<
            NativeStackNavigationProp<AuthRoutesParamList, "Cadastrar Notícia">
        >();

    const route = useRoute();
    const routeParams = route.params as NoticiaParams;
    const isFocused = useIsFocused();

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

    useEffect(() => {
        async function fetchAPI() {
            try {
                const post = await getPost(routeParams.noticiaId);
                setAutor(post.autor);
                setCorpo(post.corpo);
                setTitulo(post.titulo);
                setData(post.data);
                console.log(post, 'POST');
                const selectAssuntos = [...post.assuntos.map(assunto => assunto.id_assunto)];
                setSelectAssuntos(selectAssuntos);
                const selectedImagesPreview = [];
                for (const image of post.images) {
                    selectedImagesPreview.push(`http://192.168.1.69:3333/${image.filepath}`);
                }
                setOldPreviewImages(selectedImagesPreview);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAPI();
    }, [route, isFocused]);

    useEffect(() => {
        for (const selectedAssunto of selectAssuntos) {
            checkBoxes[selectedAssunto] = true;
        }
    }, [selectAssuntos]);

    const handleImagePicked = async (
        pickerResult: ImagePicker.ImagePickerResult
    ) => {
        try {
            if (pickerResult.cancelled) {
                alert("Upload cancelled");
                return;
            } else {
                setPreviewImages([...oldPreviewImages, pickerResult.uri as any]);
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

    async function eventoAlterarPost() {
        if (titulo == "") {
            alert("Preencha o título.");
            return;
        }

        if (removeOldImage){
            if(images.length !== 1){
                alert("Adicione pelo menos uma imagem");
                return;
            }
        }
        
        try {

            await alterarPost(routeParams.noticiaId,
                titulo,
                corpo,
                autor,
                data,
                selectAssuntos,
                removeOldImage
            );

            await criarImgPost(images, String(routeParams.noticiaId));
            alert("Noticia atualizada");
            navigation.navigate("Noticias cadastradas");
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
            ...oldPreviewImages.slice(0, index),
            ...oldPreviewImages.slice(index + 1, oldPreviewImages.length),
        ];
        console.log("312312", imagesPreviewTemp);
        setImages([...imagesTemp]);
        setPreviewImages([...imagesPreviewTemp]);
    }

    function removerOldImagem() {
        setOldPreviewImages([]);
        setRemoveOldImage(true);
    }

    function toggleCheckBox(id: number){
        if (!checkBoxes[id]) {
            const aux = [...selectAssuntos];
            aux.push(id);
            setSelectAssuntos(aux);
            console.log(aux, '1');
        } else {
            const aux = [...selectAssuntos.filter(item => item != id)];
            console.log(aux, '2');
            setSelectAssuntos(aux);
        }
        const tempCheckboxes = [...checkBoxes];
        tempCheckboxes[id] = !checkBoxes[id];
        setCheckBoxes(tempCheckboxes);
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
                {oldPreviewImages.map((imageUri, index) => (
                    <View key={imageUri + index}>
                        <Image
                            source={{ uri: imageUri }}
                            style={{ width: 300, height: 200 }}
                        />
                        <Pressable
                            onPress={removerOldImagem}
                            style={styles.botao}
                        >
                            <Text>Remover</Text>
                        </Pressable>
                    </View>
                ))}
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

                {!((images.length + oldPreviewImages.length) > 0) ? <Button title="Selecionar imagem" onPress={pickImage} /> : <></>}
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
                    Alterar Notícia
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setTitulo(e)}
                    placeholderTextColor="#575245"
                    value={titulo}
                    placeholder="Título"
                />

                <TextInput
                    style={styles.input}
                    value={autor}
                    onChangeText={(e) => setAutor(e)}
                    placeholder="Autor"
                    placeholderTextColor="#575245"
                />

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        flexWrap: 'wrap',
                        justifyContent: "flex-start",
                        //alignItems: 'flex-start',
                        width: "80%"

                    }}
                >

                    {assuntos.map((assunto, index) => (
                        <View key={index}
                            style={{
                                alignContent: 'flex-end'
                            }}
                        >
                            <BouncyCheckbox size={20}
                                style={{ margin: "2%" }}
                                text={assunto.nome_ass}
                                disableBuiltInState
                                isChecked={checkBoxes[assunto.id_assunto]}
                                onPress={() => toggleCheckBox(assunto.id_assunto)}
                            />
                        </View>
                    ))}
                </View>

                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    placeholderTextColor="#575245"
                    value={corpo}
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
                    placeholder="Corpo da noticia"
                />

                <RectButton onPress={eventoAlterarPost} style={styles.botao}>
                    <Text>Salvar noticia</Text>
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
        marginLeft: 55
    },
});
