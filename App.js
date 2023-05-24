import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BemVindo from './src/pages/bemvindo';
import Login from './src/pages/login';
import Register from './src/pages/register';

const Stack = createNativeStackNavigator();

// Rotas da aplicação
 function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false
      }} name="Bem Vindo!" component={BemVindo} />
      <Stack.Screen  options={{headerShown: false
      }} name="Login" component={Login} />
       <Stack.Screen options={{headerShown: false
      }} name="Registro" component={Register} />
    </Stack.Navigator>
  );
}

// Componente principal
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Routes />
    </NavigationContainer>
  );
}