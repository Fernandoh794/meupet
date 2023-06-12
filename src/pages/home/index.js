import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

export default function Home() {
  const url = "https://api-meupet-production.up.railway.app/api/animais-adocao";
  const [animais, setAnimais] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const response = await axios.get(url);
        const animaisData = response.data;

        const animaisComImagem = await Promise.all(animaisData.map(async (animal) => {
          const imagem = await gerarImagemAleatoria();
          return {
            ...animal,
            imagem: imagem
          };
        }));

        setAnimais(animaisComImagem);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAnimais();
  }, []);

  const gerarImagemAleatoria = async () => {
    try {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      return response.data.message;
    } catch (error) {
      console.log(error);
    }
  };

  const calcularIdade = (dataNascimento) => {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    const diff = Math.abs(hoje - nascimento);
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const handleCadastrarAnimal = () => {
    // Implemente a lógica para cadastrar um novo animal
  };

  const handlePesquisar = () => {
    // Implemente a lógica para pesquisar e filtrar os animais
  };

  const handleLogout = () => {
    // Implemente a lógica para realizar o logout do usuário
  };

  const handleDropdownToggle = () => {
    setMenuOpen((prevState) => !prevState);
    Animated.timing(dropdownAnim, {
      toValue: menuOpen ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

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
            <View style={styles.cardContent}>
              <Text style={styles.nome}>{animal.nome}</Text>
              <Text style={styles.descricao}>{animal.descricao}</Text>
              <Text style={styles.info}>Raça: {animal.raca}</Text>
              <Text style={styles.info}>Sexo: {animal.sexo}</Text>
              <Text style={styles.info}>Idade: {calcularIdade(animal.data_nascimento)} anos</Text>
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
});
