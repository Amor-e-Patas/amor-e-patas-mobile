import React, { useEffect, useState } from "react";
import {View, Text, Button, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { getAnimaisDesaparecidos } from "../../service/animal";
import { login } from "../../service/login";
import AsyncStorage from '@react-native-async-storage/async-storage';

  interface Login{
    accessToken: string;
  }

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList, 'Login'>>();

  async function handleLogin() {
    if (email == "" || password == "") {
        alert("Preencha todos os campos.");
        return;
    }
    try {
        const {accessToken} = await login(email, password) as Login;
        await AsyncStorage.setItem("@amor-e-patas:user-token", accessToken);
        console.log(accessToken);
    } catch (err) {
        alert("Usuário ou senha incorretos.")
    }
}

 /* useEffect(() => {
    async function getAnimaisApro() {
      try {
          const response = await getAnimaisDesaparecidos();
          console.log(response);
      } catch (err) {
        console.log(err);
          throw err;
      }
  }

  getAnimaisApro();
  }, []);*/


  return(
    <View style={{
      alignItems:'center', 
      justifyContent: 'center', 
      height: '100%'
    }}>
      <Text>Login</Text>

      <TextInput onChangeText={(e) => setEmail(e)} />
      <TextInput onChangeText={(e) => setPassword(e)}/>

      <Button
        title="Sign Up"
        onPress={handleLogin}
      >
        <Text>Test</Text>
      </Button>
    </View>
  );
}

export default Login;