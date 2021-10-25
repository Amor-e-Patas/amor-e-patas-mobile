import React, { useEffect } from "react";
import Routes from "./src/routes";
import { useFonts, Raleway_600SemiBold } from "@expo-google-fonts/raleway";

export default function App() {
  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
  });
  if (!fontsLoaded) {
    return <></>;
  }
  return <Routes />;
}
