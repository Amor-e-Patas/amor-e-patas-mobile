import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { formata_CPF, formata_telefone, valida_CPF, valida_email } from "../../utils/format_cpf_email";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { criarUsuario } from "../../service/user";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import DatePicker from 'react-native-date-picker';
import BouncyCheckbox from "react-native-bouncy-checkbox";





interface Endereco {
  logradouro: string,
  bairro: string,
  localidade: string,
  uf: string
}

export default function SignUp() {

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [datanasc, setDatanasc] = useState("22-10-2021");
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
  const [open, setOpen] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [termos, setTermos] = useState(false);
  const [date, setDate] = useState(new Date())

  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList, 'SignUp'>>();

  useEffect(() => {
    async function buscarEndereco() {
      if (cep.length > 7) {
        const API = axios.create();
        const res = await API.get<Endereco>(`https://viacep.com.br/ws/${cep}/json/?callback=`);
        setEndereco(res.data.logradouro);
        setBairro(res.data.bairro);
        setCidade(res.data.localidade);
        setEstado(res.data.uf);
        console.log(endereco);
      }
    }
    buscarEndereco();
  }, [cep]);


  function teste() {
    console.log(nome);
    console.log(cpf);
    console.log(genero);
    //console.log(datanasc);
    console.log(celular);
    console.log(email);
    console.log(senha);
    console.log(cep);
  }

  function formata_CEP(campo: string, campoAtual: string) {
    let valoresPermitidos = "0123456789";
    let campoFormatado = campo;
    let ultimoDigito = campoFormatado.charAt(campoFormatado.length - 1);
    if (!valoresPermitidos.includes(ultimoDigito)) {
      campoFormatado = campoFormatado.substr(0, campoFormatado.length - 1);
      console.log(campoFormatado, 'cep valida')
    }
    return campoFormatado
  }

  async function eventoCriarUsuario() {

    /*if (!valida_CPF(cpf)) {
      alert("CPF inválido! Por favor, insira um CPF válido.");
      return;
    }*/
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


    /*/let confirsenha = (document.getElementById("confirsenha") as HTMLInputElement).value;

    if (senha != confirsenha) {
      alert("Senhas não correspondentes, favor digite novamente.");
      return;
    }

    let termos = (document.getElementById("termos") as HTMLInputElement).checked;

    if (termos == false) {
      alert("É preciso aceitar os termos.");
      return;
    }

    let vendas = (document.getElementById("vendas") as HTMLInputElement).checked;

    if (vendas == false) {
      alert("É preciso concordar com a política de não venda de animais.");
      return;
    }*/

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
      await
        criarUsuario(nome,
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
          referencia)
      alert("Usuário criado com sucesso!");
      navigation.navigate("Home");
    } catch (error) {
      alert("Erro ao criar conta.")
    }

  }

  return (
    <ScrollView>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}>
        <Text>SignUp</Text>

        <Text>Nome</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          autoCapitalize="words"
          placeholder="Nome completo"
          onChangeText={text => setNome(text)} />
        <Text>CPF</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          placeholder="CPF"
          keyboardType="decimal-pad"
          value={cpf}
          onChangeText={text => setCpf(formata_CPF(text, text))} />

        <Text>Gênero</Text>

        <Picker
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%'
          }}
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

        <Text>Telefone</Text>

        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          placeholder="Celular"
          keyboardType="decimal-pad"
          value={celular}
          onChangeText={text => setCelular(formata_telefone(text, text))} />

        <Text>E-mail</Text>

        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Text style={{ marginTop: 10 }}>Senha</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          value={senha}
          onChangeText={text => setSenha(text)}
        />

        <Text style={{ marginTop: 10 }}>Confirme sua senha</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          textContentType="password"
          secureTextEntry={true}
          autoCapitalize="none"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(text)}
        />

        <Text>Endereço cep</Text>

        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          placeholder="CEP"
          keyboardType="decimal-pad"
          value={cep}
          maxLength={8}
          onChangeText={text => setCep(formata_CEP(text, text))} />

        <Text>Endereco</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          autoCapitalize="words"
          placeholder="Endereco"
          value={endereco}
          onChangeText={text => setEndereco(text)}
          editable={false} />

        <Text>Bairro</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          autoCapitalize="words"
          placeholder="Bairro"
          value={bairro}
          onChangeText={text => setBairro(text)}
          editable={false} />

        <Text>Número</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          placeholder="Número"
          onChangeText={text => setNumero(text)} />

        <Text>Cidade</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          autoCapitalize="words"
          placeholder="Cidade"
          value={cidade}
          onChangeText={text => setCidade(text)}
          editable={false} />

        <Text>Estado</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          autoCapitalize="words"
          placeholder="Estado"
          value={estado}
          onChangeText={text => setEstado(text)}
          editable={false} />

        <Text>Referência</Text>
        <TextInput
          style={{
            backgroundColor: '#bfbfca',
            height: 40,
            borderRadius: 6,
            padding: 10,
            width: '100%',
          }}
          autoCapitalize="words"
          placeholder="Referência"
          value={referencia}
          onChangeText={text => setReferencia(text)} />

        <BouncyCheckbox
          size={25}
          text="Custom Checkbox"
          onPress={(isChecked: boolean) => { }}
        />

        <Button
          title="Cadastrar"
          onPress={eventoCriarUsuario}
        >
        </Button>
      </View>
    </ScrollView>
  );
}
