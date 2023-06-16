import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function Home() {
  const [animais, setAnimais] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();
  const { estado_cod, cidade_cod } = route.params;
  const url = "https://api-meupet-production.up.railway.app/api/animais-adocao" + (estado_cod ? `?estado_cod=${estado_cod}` : '') + (cidade_cod ? `&cidade_cod=${cidade_cod}` : '');

  // funcao que é executada quando a tela é carregada
  useEffect(() => {
    carregarAnimais();
  }, []);



  // funcao que carrega os animais da API passando o token de autenticacao
  const carregarAnimais = async () => {
    AsyncStorage.getItem('access_token')
      .then((token) => { 
        axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            console.log('Animais carregados com sucesso:', response.data);
            setAnimais(response.data);
          })
          .catch((error) => {
            console.log('Erro ao carregar animais:', error);
          });
      })
      .catch((error) => {
        console.log('Erro ao recuperar o token:', error);
      });
  };

  // funcao que navega para a tela de detalhes do animal
  const handleCadastrarAnimal = () => {
    navigation.navigate("CadastrarAnimais");
  };

  const handlePesquisar = () => {
    // Implemente a lógica para pesquisar e filtrar os animais
  };

  const handleLogout = () => {
    // Implemente a lógica para realizar o logout do usuário
  };

  
  // funcao que é executada quando o botao de menu é clicado
  const handleDropdownToggle = () => {
    setMenuOpen((prevState) => !prevState);
    Animated.timing(dropdownAnim, {
      toValue: menuOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };


  // funcao responsavel por tratar a opcao selecionada no menu
  const handleMenuOptionSelect = (option) => {
    console.log(option);
    if (option === 'cadastrar') {
      handleCadastrarAnimal();
    } else if (option === 'meus-anuncios') {
      handleMeusAnuncios();
    } else if (option === 'atualizar-perfil') {
      handleAtualizarPerfil();
    } else if (option === 'minhas-adocoes') {
      handleMinhasAdocoes();
    }
    setMenuOpen(false);
  };


  const handleMeusAnuncios = () => {
    // Implemente a lógica para navegar para a tela de "Meus Anúncios"
  };

  const handleAtualizarPerfil = () => {
    // Implemente a lógica para navegar para a tela de "Atualizar Perfil"
  };

  const handleMinhasAdocoes = () => {
    // Implemente a lógica para navegar para a tela de "Minhas Adoções"
  };

  const handleAdotar = (id) => {
      navigation.navigate("AdotarAnimal", { id });
  };

  const dropdownOpacity = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const dropdownTranslateY = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleDropdownToggle}>
          <View style={styles.dropdownButton}>
            <Icon name="menu" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name="log-out" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {menuOpen && (
        <Animated.View style={[styles.dropdownMenu, { opacity: dropdownOpacity, transform: [{ translateY: dropdownTranslateY }] }]}>
          <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('cadastrar')}>
            <View style={styles.dropdownMenuItem}>
              <Text style={styles.dropdownMenuItemText}>Cadastrar</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('meus-anuncios')}>
            <View style={styles.dropdownMenuItem}>
              <Text style={styles.dropdownMenuItemText}>Meus Anúncios</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('atualizar-perfil')}>
            <View style={styles.dropdownMenuItem}>
              <Text style={styles.dropdownMenuItemText}>Atualizar Perfil</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('minhas-adocoes')}>
            <View style={styles.dropdownMenuItem}>
              <Text style={styles.dropdownMenuItemText}>Minhas Adoções</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {animais.map((animal) => (
          <View style={styles.card} key={animal.id}>
            <Image source={{ uri: animal.imagem }} style={styles.imagem} />
            <View  style={styles.cardContent}>
              <Text style={styles.nome}>{animal.nome}</Text>
              <Text style={styles.descricao}>{animal.descricao}</Text>
              <Text style={styles.info}>Raça: {animal.raca}</Text>
              <Text style={styles.info}>Sexo: {animal.sexo}</Text>
              <Text style={styles.info}>Idade: {animal.idade} anos</Text>
              <TouchableOpacity onPress={() => handleAdotar(animal.id)}>
              <View style={styles.adotarButton}>
                <Text style={styles.adotarButtonText}>Adotar</Text>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  dropdownButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38a69d',
    borderRadius: 20,
    marginLeft: 8,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    left: 16,
    minWidth: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    zIndex: 2,
  },
  dropdownMenuItem: {
    padding: 8,
  },
  dropdownMenuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  imagem: {
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 16,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descricao: {
    marginBottom: 8,
  },
  info: {
    marginBottom: 4,
  },
  adotarButton: {
    backgroundColor: 'black',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  adotarButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
