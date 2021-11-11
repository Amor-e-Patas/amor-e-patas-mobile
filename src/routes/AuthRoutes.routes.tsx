import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home/home";
import LogOut from "../screens/Login/logout";
import AlterarUser from "../screens/User/alterarUser";
import AlterarLogin from "../screens/User/alterarLogin";
import AlterarEndereco from "../screens/User/alterarEndereco";
import AlterarTelefone from "../screens/User/alterarTelefone";
import { AuthContext } from "../contexts/auth";
import MeusAnimais from "../screens/Animal/meusanimais";
import CriarAnimal from "../screens/Animal/criaranimal";
import MeuAnimal from "../screens/Animal/meuanimal";
import Animal from "../screens/Animal/animal";
import AlterarAnimal from "../screens/Animal/alteraranimal";
import Post from "../screens/Noticia/criarnoticia";
import AnaliseAnimalDesaparecidos from "../screens/Animal/analisedesaparecido";
import Noticias from "../screens/Noticia/noticias";
import Noticia from "../screens/Noticia/noticia";
import AlterarNoticia from "../screens/Noticia/alterarnoticia";
import NoticiasAdm from "../screens/Noticia/noticiasadm";
import Adotar from "../screens/Animal/adotar";
import Desaparecidos from "../screens/Animal/desaparecidos";
import Analise from "../screens/Animal/analise";
import MeuPerfil from "../screens/User/meuperfil";
import MeusAnimaisDesaparecidos from "../screens/Animal/meusanimaisdesaparecidos";
import MenuAnimais from "../screens/Animal/menu";
import MenuNoticias from "../screens/Noticia/menu";

export type AuthRoutesParamList = {
  "Cadastre-se": undefined;
  Login: undefined;
  Home: undefined;
  "Cadastro de Animal": undefined;
  "Log out": undefined;
  "Alterar usuário": undefined;
  "Alterar login": undefined;
  "Alterar endereço": undefined;
  "Alterar telefone": undefined;
  "Cadastrar Notícia": undefined;
  "Meus animais": undefined;
  "Meus animais desaparecidos": undefined;
  "Analise de animal desaparecido": undefined;
  Animal: {
    animalId: number;
  };
  "Meu animal": {
    animalId: number;
  };
  "Alterar animal": {
    animalId: number;
  };
  Blog: undefined;
  Noticia: {
    noticiaId: number;
  };
  "Noticias cadastradas": undefined;
  "Alterar noticia": {
    noticiaId: number;
  };
  Adotar: undefined;
  Desaparecidos: undefined;
  "Analise de animal": undefined;
  Navigator: undefined;
  "Meu perfil": undefined;
  "Menu animais": undefined;
  "Menu noticias": undefined;
};

const Drawer = createDrawerNavigator<AuthRoutesParamList>();

const AuthStack = createNativeStackNavigator<AuthRoutesParamList>();

function AuthRoutes() {
  const { isAuthenticated, isAdm } = useContext(AuthContext);
  console.log(isAuthenticated, isAdm, "autenticação");
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Navigator"
        options={{ headerShown: false }}
        component={MyDrawer}
      />
      {isAuthenticated ? (
        <>
          <AuthStack.Screen name="Animal" component={Animal} />
          <AuthStack.Screen name="Meu animal" component={MeuAnimal} />
          <AuthStack.Screen name="Noticias cadastradas"component={NoticiasAdm}/>
          <AuthStack.Screen name="Cadastrar Notícia" component={Post} />
          <AuthStack.Screen name="Alterar animal" component={AlterarAnimal} />
          <AuthStack.Screen name="Noticia" component={Noticia} />
          <AuthStack.Screen name="Meus animais" component={MeusAnimais} />
          <AuthStack.Screen name="Meus animais desaparecidos" component={MeusAnimaisDesaparecidos}/>
          <AuthStack.Screen name="Alterar usuário" component={AlterarUser} />
          <AuthStack.Screen name="Alterar login" component={AlterarLogin} />
          <AuthStack.Screen name="Alterar endereço" component={AlterarEndereco}/>
          <AuthStack.Screen name="Alterar telefone" component={AlterarTelefone}/>
          <AuthStack.Screen name="Cadastro de Animal" component={CriarAnimal} />
          {isAdm ? (
            <>
              <AuthStack.Screen
                name="Alterar noticia"
                component={AlterarNoticia}
              />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </AuthStack.Navigator>
  );
}

export function MyDrawer() {
  const { isAuthenticated, isAdm } = useContext(AuthContext);
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />

      {!isAuthenticated ? (
        <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Cadastre-se" component={SignUp} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Adotar" component={Adotar} />
          <Drawer.Screen name="Blog" component={Noticias} />
          <Drawer.Screen name="Desaparecidos" component={Desaparecidos} />
          <Drawer.Screen name="Meu perfil" component={MeuPerfil} />
          <Drawer.Screen name="Menu animais" component={MenuAnimais} />
          {isAdm ? (
            <>
              <Drawer.Screen name="Menu noticias" component={MenuNoticias} />
              <Drawer.Screen name="Analise de animal" component={Analise} />
              <Drawer.Screen name="Analise de animal desaparecido"component={AnaliseAnimalDesaparecidos}/>
            </>
          ) : (
            <></>
          )}
          <Drawer.Screen name="Log out" component={LogOut} />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default AuthRoutes;
