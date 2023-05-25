import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

export default function Home() {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  const navigation = useNavigation();
  const nomeUsuario = auth.currentUser.displayName;

  const handleCadastrarAdocoes = () => {
    // Navegar para a tela de cadastro de adoções
    navigation.navigate('CadastroAdocoes');
  };

  const handleProcurarAdocoes = () => {
    // Navegar para a tela de busca de adoções
    navigation.navigate('BuscaAdocoes');
  };

  const handleAtualizarPerfil = () => {
    // Navegar para a tela de atualização de perfil
    navigation.navigate('AtualizarPerfil');
  };

  const handleDoacoes = () => {
    // Navegar para a tela de doações
    navigation.navigate('Doacoes');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bem-vindo(a), {nomeUsuario}!</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/pets.png')} style={styles.image} />
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleCadastrarAdocoes}>
          <Text style={styles.buttonText}>Cadastrar Adoções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleProcurarAdocoes}>
          <Text style={styles.buttonText}>Procurar Adoções</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAtualizarPerfil}>
          <Text style={styles.buttonText}>Atualizar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleDoacoes}>
          <Text style={styles.buttonText}>Doações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
  },
  header: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: screenWidth * 0.6,
    height: '60%',
    resizeMode: 'contain',
  },
  content: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    width: screenWidth * 0.8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#38a69d',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
