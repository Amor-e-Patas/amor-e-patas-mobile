import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from "../screens/Home/home";
import Animal from "../screens/Animal/criaranimal"
export type AuthRoutesParamList = {
  'Cadastre-se': undefined
  'Login': undefined
  'Home': undefined
  'Cadastro de Animal': undefined
}




const Drawer = createDrawerNavigator<AuthRoutesParamList>();

const AuthStack = createNativeStackNavigator<AuthRoutesParamList>();



function AuthRoutes() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Cadastre-se" component={SignUp} />
      <AuthStack.Screen name="Cadastro de Animal" component={Animal} />
    </AuthStack.Navigator>
  );
}

export function MyDrawer() {
  return (
    
      <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home}  />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Cadastre-se" component={SignUp}/>
      <AuthStack.Screen name="Cadastro de Animal" component={Animal} />
    </Drawer.Navigator>
  
  );
}

export default AuthRoutes;