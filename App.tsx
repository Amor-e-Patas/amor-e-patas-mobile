import React, { useEffect } from "react";
import Routes from "./src/routes";
import { useFonts, Raleway_600SemiBold } from "@expo-google-fonts/raleway";
import { AuthProvider } from "./src/contexts/auth";

export default function App() {
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
  });
  if (!fontsLoaded) {
    return <></>;
  }
  return(
  <AuthProvider>
    <Routes/>
  </AuthProvider>);
}
