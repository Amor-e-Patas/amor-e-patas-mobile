import React, { useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from "../screens/Home/home";
import LogOut from "../screens/Login/logout";
import AlterarUser from "../screens/User/alterarUser";
import AlterarLogin from "../screens/User/alterarLogin";
import AlterarEndereco from "../screens/User/alterarEndereco";
import AlterarTelefone from "../screens/User/alterarTelefone";
import { AuthContext } from "../contexts/auth";
import Animal from "../screens/Animal/criaranimal"
import Post from "../screens/Noticia/criarnoticia";

export type AuthRoutesParamList = {
  'Cadastre-se': undefined
  'Login': undefined
  'Home': undefined
  'Cadastro de Animal': undefined
  'Log out': undefined
  'Alterar usuário': undefined
  'Alterar login': undefined
  'Alterar endereço': undefined
  'Alterar telefone': undefined
  'Cadastrar Notícia': undefined
}


const Drawer = createDrawerNavigator<AuthRoutesParamList>();

const AuthStack = createNativeStackNavigator<AuthRoutesParamList>();


function AuthRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Cadastre-se" component={SignUp} />
      <AuthStack.Screen name="Cadastrar Notícia" component={Post} />
      *<AuthStack.Screen name="Cadastro de Animal" component={Animal} />
      <AuthStack.Screen name="Alterar usuário" component={AlterarUser} />
      <AuthStack.Screen name="Alterar login" component={AlterarLogin} />
      <AuthStack.Screen name="Alterar endereço" component={AlterarEndereco} />
      <AuthStack.Screen name="Alterar telefone" component={AlterarTelefone} />
      <AuthStack.Screen name="Log out" component={LogOut} />
    </AuthStack.Navigator>
  );
}

export function MyDrawer() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    
      <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home}  />  
        {!isAuthenticated ? <>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Cadastre-se" component={SignUp}/>
      </> : <>
      <Drawer.Screen name="Cadastro de Animal" component={Animal} />
      <Drawer.Screen name="Cadastrar Notícia" component={Post} />
      <Drawer.Screen name="Alterar usuário" component={AlterarUser} />
      <Drawer.Screen name="Alterar login" component={AlterarLogin} />
      <Drawer.Screen name="Alterar endereço" component={AlterarEndereco} />
      <Drawer.Screen name="Alterar telefone" component={AlterarTelefone} />
      <Drawer.Screen name="Log out" component={LogOut} />
      </>  }
    </Drawer.Navigator>
  
  );
}

export default AuthRoutes;