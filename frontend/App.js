import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import FormProdutos from "./src/screens/FormProdutos";
import PainelAdmin from "./src/screens/PainelAdmin";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: "Produtos" }} />
        <Stack.Screen name="FormProdutos" component={FormProdutos} options={{ title: "Produto" }} />
        <Stack.Screen name="PainelAdmin" component={PainelAdmin} options={{ title: "Painel Admin" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

registerRootComponent(App);