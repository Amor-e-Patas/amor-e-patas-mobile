import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable
} from "react-native";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { alterarAddres, getAddres } from "../../service/endereco";

interface Endereco {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function SignUp() {

  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [referencia, setReferencia] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Alterar endereço">>();

  useEffect(() => {
    async function fetchAPI() {
      try {
        const getEndereco = await getAddres();

        setEndereco(getEndereco.endereco);
        setNumero(getEndereco.numero);
        setBairro(getEndereco.bairro);
        setCep(getEndereco.cep);
        setCidade(getEndereco.cidade);
        setEstado(getEndereco.estado);
        setReferencia(getEndereco.referencia);

      } catch (err) {
        console.log(err);
      }
    }

    fetchAPI();
  }, []);

  useEffect(() => {
    async function buscarEndereco() {
      if (cep.length > 7) {
        const API = axios.create();
        const res = await API.get<Endereco>(
          `https://viacep.com.br/ws/${cep}/json/?callback=`
        );
        setEndereco(res.data.logradouro);
        setBairro(res.data.bairro);
        setCidade(res.data.localidade);
        setEstado(res.data.uf);
        console.log(endereco);
      }
    }
    buscarEndereco();
  }, [cep]);

  function formata_CEP(campo: string, campoAtual: string) {
    let valoresPermitidos = "0123456789";
    let campoFormatado = campo;
    let ultimoDigito = campoFormatado.charAt(campoFormatado.length - 1);
    if (!valoresPermitidos.includes(ultimoDigito)) {
      campoFormatado = campoFormatado.substr(0, campoFormatado.length - 1);
      console.log(campoFormatado, "cep valida");
    }
    return campoFormatado;
  }

  async function eventoCriarUsuario() {
    if (bairro == "") {
      alert("Por favor, insira o bairro.");
      return;
    }

    if (cep == "") {
      alert("Por favor, insira o CEP.");
      return;
    }

    if (endereco == "") {
      alert("Por favor, insira o endereço.");
      return;
    }

    if (numero == "") {
      alert("Por favor, insira número do endereço.");
      return;
    }

    if (cidade == "") {
      alert("Por favor, insira a cidade.");
      return;
    }

    if (estado == "") {
      alert("Por favor, insira o estado.");
      return;
    }

    try {
      const token = await alterarAddres(cep, bairro, endereco, numero, referencia, estado, cidade);
      alert("Endereço atualizado");
      navigation.navigate("Meu perfil");
    } catch (error) {
      alert("Erro ao criar conta.");
    }
  }

  return (
    <ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5%"

        }}
      >
        <Text
          style={{
            alignItems: "center",
            color: "#FFB800",
            fontSize: 20,
            margin: "1%",
          }}
        >
          Endereço
        </Text>

        <TextInput
          style={styles.input}
          placeholder="CEP"
          placeholderTextColor="#575245"
          keyboardType="decimal-pad"
          value={cep}
          maxLength={8}
          onChangeText={(text) => setCep(formata_CEP(text, text))}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholder="Endereco"
          placeholderTextColor="#575245"
          value={endereco}
          onChangeText={(text) => setEndereco(text)}
          editable={false}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholder="Bairro"
          placeholderTextColor="#575245"
          value={bairro}
          onChangeText={(text) => setBairro(text)}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Número"
          value={numero}
          placeholderTextColor="#575245"
          onChangeText={(text) => setNumero(text)}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholder="Cidade"
          placeholderTextColor="#575245"
          value={cidade}
          onChangeText={(text) => setCidade(text)}
          editable={false}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholder="Estado"
          placeholderTextColor="#575245"
          value={estado}
          onChangeText={(text) => setEstado(text)}
          editable={false}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholder="Referência"
          placeholderTextColor="#575245"
          value={referencia}
          onChangeText={(text) => setReferencia(text)}
        />

        <Pressable onPress={eventoCriarUsuario} style={styles.botao}>
          <Text>Atualizar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    backgroundColor: "#f8f8f8",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1,
    height: 40,
    borderRadius: 6,
    padding: 10,
    width: "90%",
    marginLeft: "5%",
    marginTop: "2%",
  },
  botao: {
    height: 40,
    width: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#B7E394",
    alignItems: "center",
    borderRadius: 4,
  },
});
