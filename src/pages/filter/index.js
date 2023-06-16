import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


export default function Filter() {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedCidade, setSelectedCidade] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [usuario, setUsuario] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    carregarEstados();
    loadUsuario();
  }, []);

  // Implemente a lógica para carregar os estados da API do IBGE
  const carregarEstados = async () => {
    try {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      setEstados(response.data);
    } catch (error) {
      console.log('Erro ao carregar estados:', error);
    }
  };

  // Implemente a lógica para carregar as cidades de acordo com o estado selecionado
  const carregarCidades = async (estadoId) => {
    try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
      setCidades(response.data);
    } catch (error) {
      console.log('Erro ao carregar cidades:', error);
    }
  };

  const loadUsuario = async () => {
    try {
      const user = await AsyncStorage.getItem('user_logado');
      if (user) {
        setUsuario(user);
      }
    } catch (error) {
      console.log('Erro ao carregar usuário:', error);
    }
  };

  const handleFilter = () => {
    // Lógica para filtrar com base no estado e cidade selecionados
    console.log('Filtrar:', selectedEstado, selectedCidade);
    navigation.navigate("Home", { estado_cod: selectedEstado, cidade_cod: selectedCidade });
  };

  const handleEstadoChange = (itemValue) => {
    setSelectedEstado(itemValue);
    carregarCidades(itemValue);
    setIsButtonEnabled(false); // Desabilitar o botão quando o estado é alterado
  };

  const handleCidadeChange = (itemValue) => {
    setSelectedCidade(itemValue);
    setIsButtonEnabled(itemValue !== ''); // Habilitar o botão somente se cidade for selecionada
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Olá, {usuario}.</Text>
      </View>

      <View style={styles.filtersContainer}>
        <Animatable.Text animation="fadeInDown" style={styles.title}>
          Selecione o estado:
        </Animatable.Text>
        <Picker
          selectedValue={selectedEstado}
          onValueChange={handleEstadoChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecione" value="" />
          {estados.map((estado) => (
            <Picker.Item key={estado.id} label={estado.nome} value={estado.id} />
          ))}
        </Picker>

        <Animatable.Text animation="fadeInDown" style={styles.title}>
          Selecione a cidade:
        </Animatable.Text>
        <Picker
          selectedValue={selectedCidade}
          onValueChange={handleCidadeChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecione" value="" />
          {cidades.map((cidade) => (
            <Picker.Item key={cidade.id} label={cidade.nome} value={cidade.id} />
          ))}
        </Picker>

        <TouchableOpacity
          style={[styles.button, isButtonEnabled ? {} : styles.disabledButton]}
          onPress={handleFilter}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.buttonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
    padding: 20,
  },
  header: {
    height: windowHeight / 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  filtersContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#ccc6',
  },
});
