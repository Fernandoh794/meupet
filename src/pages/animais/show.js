import { React, useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AdotarAnimal() {
  const route = useRoute();
  const { id } = route.params;
  const URL = "https://api-meupet-production.up.railway.app/api/animais-adocao/" + id;
  const [animal, setAnimal] = useState([]);
  
  useEffect(() => {
    carregarAnimal();
  }, []);


  const carregarAnimal = async () => {
    AsyncStorage.getItem('access_token')
        .then((token) => {
            axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    console.log('Animal carregado com sucesso:', response.data);
                    setAnimal(response.data);
                })
                .catch((error) => {
                    console.log('Erro ao carregar animal:', error);
                });
        })
        .catch((error) => {
            console.log('Erro ao recuperar o token:', error);
        });
};




  return (
    <View>
      <Text>{animal.id}</Text>
    </View>
  );
}
