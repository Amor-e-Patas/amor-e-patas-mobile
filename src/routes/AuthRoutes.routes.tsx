import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from "../screens/Home/home";

export type AuthRoutesParamList = {
  'SignUp': undefined
  'Login': undefined
  'Home': undefined
}

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
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;