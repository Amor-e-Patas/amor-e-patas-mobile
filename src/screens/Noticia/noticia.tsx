import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimais, Animal } from "../../service/animal";
import { getPosts, getPost, Noticia } from "../../service/post";
import { useNavigation, useRoute } from "@react-navigation/native";
import Hr from "../../components/Hr";
import { TextInput } from "react-native-gesture-handler";
import { BackgroundImage } from "react-native-elements/dist/config";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

interface NoticiaParams {
    noticiaId: number
}

export default function Post() {
    const [noticia, setNoticia] = useState<Noticia>();
    const route = useRoute();
    const routeParams = route.params as NoticiaParams;
    const navigation =
        useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Home">>();
    const { width } = useWindowDimensions();


    useEffect(() => {
        async function fetchAPI() {
            try {
                const noticia = await getPost(routeParams.noticiaId);
                console.log(noticia, 'notizia');
                setNoticia(noticia);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAPI();
    }, [routeParams]);
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
                <View>
                    <Image
                        style={styles.stretch}
                        source={{
                            uri: `http://192.168.1.69:3333/${noticia?.images[0].filepath}`,
                        }}></Image>
                </View>

                <Text>{noticia?.titulo}</Text>
                <Text>{noticia?.autor}</Text>
                <Text>{noticia?.data}</Text>
                <RenderHtml
                    contentWidth={width}
                    source={{ html: noticia?.corpo || '' }}
                />

            </View>
        </ScrollView>
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

