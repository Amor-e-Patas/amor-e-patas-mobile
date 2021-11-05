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
import MeusAnimais from '../screens/Animal/meusanimais';
import CriarAnimal from "../screens/Animal/criaranimal";
import Animal from "../screens/Animal/animal";
import AlterarAnimal from "../screens/Animal/alteraranimal";
import Post from "../screens/Noticia/criarnoticia";

import Noticias from '../screens/Noticia/noticias';
import Noticia from "../screens/Noticia/noticia";
import AlterarNoticia from "../screens/Noticia/alterarnoticia";
import NoticiasAdm from "../screens/Noticia/noticiasadm";

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
  'Meus animais': undefined
  'Animal': {
    animalId: number
  },
  'Alterar animal': {
    animalId: number
  },
  'Blog': undefined
  'Noticia': {
    noticiaId: number
  },
  'Noticias cadastradas': {
    noticiaId: number
  },
  'Alterar noticia': {
    noticiaId: number
  }
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
      <AuthStack.Screen name="Cadastrar Notícia" component={Post} />
      *<AuthStack.Screen name="Cadastro de Animal" component={CriarAnimal} />
      <AuthStack.Screen name="Alterar usuário" component={AlterarUser} />
      <AuthStack.Screen name="Alterar login" component={AlterarLogin} />
      <AuthStack.Screen name="Alterar endereço" component={AlterarEndereco} />
      <AuthStack.Screen name="Alterar telefone" component={AlterarTelefone} />
      <AuthStack.Screen name="Log out" component={LogOut} />
    </AuthStack.Navigator>
  );
}

export function MyDrawer() {
  const { isAuthenticated, isAdm } = useContext(AuthContext);
  return (

    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      {!isAuthenticated ? <>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Cadastre-se" component={SignUp} />
      </> : <>
        <Drawer.Screen name="Cadastro de Animal" component={CriarAnimal} />
        {
          isAdm ? <>
            <Drawer.Screen name="Cadastrar Notícia" component={Post} />
            <Drawer.Screen name="Noticias cadastradas" component={NoticiasAdm} />
          </> : <></>
        }
        <Drawer.Screen name="Alterar usuário" component={AlterarUser} />
        <Drawer.Screen name="Alterar login" component={AlterarLogin} />
        <Drawer.Screen name="Alterar endereço" component={AlterarEndereco} />
        <Drawer.Screen name="Alterar telefone" component={AlterarTelefone} />
        <Drawer.Screen name="Meus animais" component={MeusAnimais} />
        <Drawer.Screen name="Alterar animal" component={AlterarAnimal} />
        <Drawer.Screen name="Animal" component={Animal} />
        <Drawer.Screen name="Blog" component={Noticias} />
        <Drawer.Screen name="Noticia" component={Noticia} />
        <Drawer.Screen name="Alterar noticia" component={AlterarNoticia} />
        <Drawer.Screen name="Log out" component={LogOut} />
      </>}

    </Drawer.Navigator>

  );
}

export default AuthRoutes;