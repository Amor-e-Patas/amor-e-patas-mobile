import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Pressable,
  ImageBackground,
  Platform
} from "react-native";
import {
  formata_CPF,
  formata_telefone,
  valida_CPF,
  valida_email,
} from "../../utils/format_cpf_email";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { criarUsuario } from "../../service/user";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DatePicker from '../../components/DatePicker';

interface Endereco {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function SignUp() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [datanasc, setDatanasc] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [referencia, setReferencia] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [termos, setTermos] = useState(false);
  const [termosVenda, setTermosVenda] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthRoutesParamList, "Cadastre-se">>();

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
    if (!valida_CPF(cpf)) {
      alert("CPF inválido! Por favor, insira um CPF válido.");
      return;
    }

    if (!valida_email(email)) {
      alert("E-mail inválido! Por favor, insira um e-mail válido.");
      return;
    }

    if (nome == "") {
      alert("Por favor, insira seu nome.");
      return;
    }

    if (cpf == "") {
      alert("Por favor, insira o CPF.");
      return;
    }

    if (datanasc == "") {
      alert("Por favor, insira a data de nascimento.");
      return;
    }

    if (email == "") {
      alert("Por favor, insira seu e-mail");
      return;
    }

    if (senha == "") {
      alert("Por favor, insira a senha.");
      return;
    }

    if (senha.length < 6 || senha.length > 10) {
      alert("Senha não atende os requisitos mínimos.");
      return;
    }

    if (senha != passwordConfirm) {
      alert("Senhas não correspondentes, favor digite novamente.");
      return;
    }

    if (!termos) {
      alert("É preciso aceitar os termos.");
      return;
    }
    if (!termosVenda) {
      alert("É preciso concordar com a política de não venda de animais.");
      return;
    }

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
      await criarUsuario(
        nome,
        cpf,
        genero,
        datanasc,
        celular,
        email,
        senha,
        endereco,
        numero,
        bairro,
        cep,
        cidade,
        estado,
        referencia
      );
      alert("Usuário criado com sucesso!");
      navigation.navigate("Login");
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
          Cadastro de Usuário
        </Text>

        <TextInput
          style={styles.input}
          autoCapitalize="words"
          placeholder="Nome Completo"
          placeholderTextColor="#575245"
          onChangeText={(text) => setNome(text)}
        />

        <DatePicker onChange={setDatanasc} label="Data de nascimento" buttonText="Selecione a data de nascimento" />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#575245"
          keyboardType="decimal-pad"
          value={cpf}
          maxLength={14}
          onChangeText={(text) => setCpf(formata_CPF(text, text))}
        />

        <Picker
          style={styles.input}
          selectedValue={genero}
          onValueChange={(itemValue, itemIndex) => {
            setGenero(itemValue);
          }}
        >
          <Picker.Item label="Selecione o gênero..." value={0} />
          <Picker.Item label="Feminino" value="Feminino" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Não declarar" value="Não declarar" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Celular"
          placeholderTextColor="#575245"
          keyboardType="decimal-pad"
          value={celular}
          onChangeText={(text) => setCelular(formata_telefone(text, text))}
        />

        <Text
          style={{
            alignItems: "center",
            color: "#FFB800",
            fontSize: 20,
            margin: "1%",
          }}
        >
          Login
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#575245"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#575245"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#575245"
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(text)}
        />

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

        <BouncyCheckbox
          size={20}
          style={{ margin: "2%" }}
          text="Li e aceito os termos"
          onPress={(isChecked: boolean) => { setTermos(isChecked) }}
        />

        <BouncyCheckbox
          size={20}
          style={{ margin: "2%" }}
          text="Não permitimos a venda de animais através do site."
          onPress={(isChecked: boolean) => { setTermosVenda(isChecked) }}
        />


        <Pressable onPress={eventoCriarUsuario} style={styles.botao}>
          <Text>Cadastrar</Text>
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
