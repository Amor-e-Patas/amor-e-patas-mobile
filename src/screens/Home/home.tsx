import React from "react";
import {View, Text, Button} from 'react-native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import { AuthRoutesParamList } from "../../routes/AuthRoutes.routes";
import { useNavigation } from "@react-navigation/native";

function Home(){
 const navigation = useNavigation<NativeStackNavigationProp<AuthRoutesParamList, 'Home'>>();
  return(
    <View style={{
        alignItems:'center', 
        justifyContent: 'center',
        height: '100%'
      }}>
    <Button
        title="Entrar"
        onPress={() => navigation.navigate("Login")}
      >
        <Text>Test</Text>
      </Button>

      <Button
        title="Cadastre-se"
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text>Test</Text>
      </Button>
      <Text>Home</Text>
    </View>
  );
}

export default Home;