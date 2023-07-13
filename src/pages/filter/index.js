import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function Filter() {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedCidade, setSelectedCidade] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [usuario, setUsuario] = useState('');
  const navigation = useNavigation();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuWidth = Dimensions.get('window').width * 0.8;
  const menuAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    carregarEstados();
    loadUsuario();
  }, []);

  // Implemente a lógica para carregar os estados da API do IBGE
  const carregarEstados = async () => {
    try {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      );
      setEstados(response.data);
    } catch (error) {
      console.log('Erro ao carregar estados:', error);
    }
  };

  // Implemente a lógica para carregar as cidades de acordo com o estado selecionado
  const carregarCidades = async (estadoId) => {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`
      );
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
    navigation.navigate('Home', {
      estado_cod: selectedEstado,
      cidade_cod: selectedCidade,
    });
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

  const handleLogout = () => {
    // Lógica para realizar o logout do usuário
    // ...
  };

  const toggleMenu = () => {
    if (menuOpen) {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuOpen(false));
    } else {
      setMenuOpen(true);
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuOpen(false));
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-menuWidth, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <Animatable.Text animation="fadeInDown" style={styles.label}>
          Selecione o estado:
        </Animatable.Text>
        <Picker
          selectedValue={selectedEstado}
          onValueChange={handleEstadoChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Selecione" value="" />
          {estados.map((estado) => (
            <Picker.Item key={estado.id} label={estado.nome} value={estado.id} />
          ))}
        </Picker>

        <Animatable.Text animation="fadeInDown" style={styles.label}>
          Selecione a cidade:
        </Animatable.Text>
        <Picker
          selectedValue={selectedCidade}
          onValueChange={handleCidadeChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
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

      {menuOpen && (
        <Animated.View
          style={[
            styles.menu,
            { width: menuWidth, transform: [{ translateX: menuTranslateX }] },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Icon name="x" size={24} color="black" />
          </TouchableOpacity>

          <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('cadastrar')}>
            <View style={styles.dropdownMenuItem}>
              <Text style={styles.dropdownMenuItemText}>Cadastrar</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('filtrar')}>
            <View style={styles.dropdownMenuItem}>
              <Text style={styles.dropdownMenuItemText}>Filtrar</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('atualizar-perfil')}>
            <View style={styles.dropdownMenuItem}>
              <Text style={styles.dropdownMenuItemText}>Atualizar Perfil</Text>
            </View>
          </TouchableWithoutFeedback>
          {/* Espaço para a versão do aplicativo */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Versão: 1.0.0</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: windowHeight / 10,
  },
  menuButton: {
    marginLeft: -5,
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    height: 40,
    color: '#000',
  },
  pickerItem: {
    fontSize: 16,
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
    backgroundColor: '#ccc',
  },
  logoutButton: {
    marginLeft: 10,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: windowHeight,
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  dropdownMenuItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  dropdownMenuItemText: {
    fontSize: 16,
    color: 'black',
  },
  versionContainer: {
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: 'gray',
  },
});
