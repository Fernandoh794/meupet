import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { API_URL } from "../../../apiConfig";
import { Linking, Alert  } from 'react-native';


export default function Home() {
  const [animais, setAnimais] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { estado_cod, cidade_cod } = route.params;
  const url = API_URL +  "/animais-adocao" + (estado_cod ? `?estado_cod=${estado_cod}` : '') + (cidade_cod ? `&cidade_cod=${cidade_cod}` : '');
  const [userLogado, setUserLogado] = useState(null);

  useEffect(() => {
    carregarAnimais();
    getUserLogado();
  }, []);

  const getUserLogado = async () => {
    const userLogado = await AsyncStorage.getItem('user_id');
    setUserLogado(userLogado);
  };
  // funcao que carrega os animais da API passando o token de autenticacao
  const carregarAnimais = async () => {
    console.log(userLogado);
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

const handleDelete = (id) => {
    Alert.alert(
      'Excluir Anúncio',
      'Tem certeza que deseja excluir este anúncio?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            AsyncStorage.getItem('access_token')
              .then((token) => {
                axios.delete(`${API_URL}/animais-adocao/${id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((response) => {
                    console.log('Animal excluído com sucesso:', response.data);
                    carregarAnimais();
                  })
                  .catch((error) => {
                    console.log('Erro ao excluir animal:', error);
                  });
              })
              .catch((error) => {
                console.log('Erro ao recuperar o token:', error);
              });
          },
        },
      ],
      { cancelable: false },
    );
  };





  const handleLogout = () => {
    AsyncStorage.removeItem('access_token');
    navigation.navigate('Login');  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name="log-out" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
{animais.length === 0 ? (
  <Text style={styles.noRecordsText}>Não há registros disponíveis</Text>
) : (
  animais.map((animal) => (
    <View style={styles.card} key={animal.id}>
      <Image source={{ uri: animal.imagem }} style={styles.imagem} />
      <View style={styles.cardContent}>
        <Text style={styles.nome}>{animal.nome}</Text>
        <Text style={styles.descricao}>{animal.descricao}</Text>
        <Text style={styles.info}>Raça: {animal.raca}</Text>
        <Text style={styles.info}>Sexo: {animal.sexo}</Text>
        <Text style={styles.info}>Idade: {animal.idade} anos</Text>
        <Text style={styles.info}>Usuario: {animal.usuario}</Text>
        {userLogado == animal.user_id ? (
          <TouchableOpacity onPress={() => handleDelete(animal.id)}>
            <View style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Excluir Anúncio</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => openWhatsApp(animal.contato)}>
            <View style={styles.whatsappButton}>
              <Text style={styles.whatsappButtonText}>Iniciar Conversa</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  ))
)}

</ScrollView>

    </View>
  );
}

const openWhatsApp = (numero) => {
  const whatsappUrl = `whatsapp://send?phone=${numero}`;
  const phoneNumber = `tel:${numero}`;

  Linking.canOpenURL(whatsappUrl)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(
          'Não foi possível abrir o WhatsApp',
          'Deseja fazer uma ligação?',
          [
            {
              text: 'Sim',
              onPress: () => Linking.openURL(phoneNumber),
            },
            {
              text: 'Não',
              style: 'cancel',
            },
          ]
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

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
  noRecordsText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 200, // ajuste esse valor para posicionar o texto no centro vertical da tela
  },
  whatsappButton: {
    backgroundColor: '#25D366', // Cor de fundo do WhatsApp
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  whatsappButtonText: {
    color: '#FFFFFF', // Cor do texto do WhatsApp
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
