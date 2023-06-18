import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BemVindo from './src/pages/bemvindo';
import Login from './src/pages/login';
import Register from './src/pages/register';
import Home from './src/pages/home';
import AtualizarPerfil from './src/pages/perfil';
import CadastrarAnimais from './src/pages/animais/cadastro';
import AdotarAnimal from './src/pages/animais/show';
import Filter from './src/pages/filter';
import PreIndex from './src/pages/home/preindex';

const Stack = createNativeStackNavigator();

// Rotas da aplicação
 function Routes() {
  return (
    <Stack.Navigator>


<Stack.Screen  options={{headerShown: false
      }} name="PreIndex" component={PreIndex} /> 
<Stack.Screen  options={{headerShown: false
      }} name="Login" component={Login} /> 
   <Stack.Screen options={{headerShown: false
      }} name="Bem Vindo!" component={BemVindo} /> 
       <Stack.Screen options={{headerShown: false
      }} name="Registro" component={Register} />
<Stack.Screen options={{headerShown: false
      }} name="Atualizar" component={AtualizarPerfil} /> 
<Stack.Screen options={{headerShown: false
      }} name="CadatrarAnimais" component={CadastrarAnimais} />
 <Stack.Screen options={{headerShown: false
      }} name="Filter" component={Filter} />

        <Stack.Screen options={{headerShown: false
      }} name="Home" component={Home} />

      <Stack.Screen options={{headerShown: false}
      } name="AdotarAnimal" component={AdotarAnimal} />


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
