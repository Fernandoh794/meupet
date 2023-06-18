import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [Email, setEmail] = React.useState('');
  const [Senha, setSenha] = React.useState('');
  const [isLoading, setLoading] = React.useState(false); // Estado para controlar o loading
  let url = "https://api-meupet-production.up.railway.app/api/login";

  function handleLogin() {
    setLoading(true); // Ativar o loading ao iniciar a requisição
    axios.post(url, {
      email: Email,
      password: Senha
    })
    .then(function (response) {
      if(response.status == 200){
        const token = response.data.access_token.split("|")[1];
        alert("Login realizado com sucesso!");
        // Salvar o token no AsyncStorage
        AsyncStorage.setItem('access_token', token)
        AsyncStorage.setItem('user_logado', response.data.user.name)
          .then(() => {
            navigation.navigate("Filter");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setLoading(false); // Desativar o loading após receber a resposta da API
    })
    .catch(function (error) {
      setLoading(false); // Desativar o loading em caso de erro
      alert("Erro ao realizar login!" + error);
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      <Animatable.View delay={500} animation="fadeInLeft">
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.containerForm}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          placeholder="Digite o Email.."
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
          style={styles.input}
          placeholder="Digite a Senha.."
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator color="#fff" /> // Exibir o loading se isLoading for verdadeiro
          ) : (
            <Text style={styles.textButton}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Registro')}
          style={styles.buttonRegister}
        >
          <Text style={styles.RegistertextButton}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d'
  },
  message: {
    marginTop: '10%',
    marginBottom: '8%',
    marginLeft: '8%',
    paddingStart: '5%',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  },
  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#38a69d',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: '15%',
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  buttonRegister: {
    marginTop: '15%',
    alignItems: 'center',
  },

  RegistertextButton: {
    color: '#a1a1a1',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
