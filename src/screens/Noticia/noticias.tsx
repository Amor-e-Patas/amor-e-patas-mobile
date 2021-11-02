import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimais, Animal } from "../../service/animal";
import { getPosts, Noticia } from "../../service/post";
import { useNavigation } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import { RectButton } from 'react-native-gesture-handler';

export default function Noticias() {
    const [noticias, setNoticias] = useState(Array<Noticia>());
    const [nome, setNome] = useState("");

    const navigation =
        useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();

    useEffect(() => {
        async function fetchAPI() {
            try {
                const noticias = await getPosts();
                console.log(noticias, 'teste');
                setNoticias(noticias);
            } catch (err) {
                console.log(err);
            }
        }

        fetchAPI();
    }, []);

    const abrirNoticia = (noticiaId: number) => {
        navigation.navigate('Noticia', {
            noticiaId,
        });
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
                <Text>HEHE</Text>
                {
                    noticias.map((noticia, index) => <RectButton key={index} onPress={() => abrirNoticia(noticia.id_post)}>
                        <View>
                            <View>
                                <Image
                                    style={styles.stretch}
                                    source={{
                                        uri: `http://192.168.1.69:3333/${noticia.filepath}`,
                                    }}></Image>
                            </View>
                            <View>
                                <Text>{noticia.titulo}</Text>
                                <Text>{noticia.autor}</Text>
                                <Text>{noticia.data}</Text>
                            </View>
                        </View>
                    </RectButton>)
                }
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    titulo: {
        fontFamily: "Raleway_600SemiBold",
        fontSize: 20,
        margin: "2%",
    },
    stretch: {
        width: 400,
        height: 400,
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
