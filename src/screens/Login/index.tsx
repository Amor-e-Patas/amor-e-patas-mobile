import React, { useEffect } from "react";
import {View, Text, Button, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {authenticatedAPI } from "../../service/api";
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";

function Login(){
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList, 'Login'>>()

  useEffect(() => {
    async function getAnimaisApro() {
      try {
          const response = await authenticatedAPI.get(`/assunto/1`);
          console.log(response.data);
      } catch (err) {
        console.log(err);
          throw err;
      }
  }

  getAnimaisApro();
  }, []);


  return(
    <View style={{
      alignItems:'center', 
      justifyContent: 'center', 
      height: '100%'
    }}>
      <Text>Login</Text>

      <TextInput/>
      <TextInput/>

      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text>Test</Text>
      </Button>
    </View>
  );
}

export default Login;