import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../apiConfig';
import { useNavigation } from '@react-navigation/native';


export default function CadastrarAnimais() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [imagem, setImagem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [urlImagem, setUrlImagem] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    carregarEstados();
    verificarSeExisteTelefone();
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

  // verifica se o usuario tem telefone cadastrado antes de cadastrar um animal
  const verificarSeExisteTelefone = async () => {
    const user = await AsyncStorage.getItem('user_id');  
    const token = await AsyncStorage.getItem('access_token');  
    try {
        let url = `${API_URL}/users/${user}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       if(response.data.telefone == null){
        alert('Você precisa cadastrar um telefone para cadastrar um animal, vá para edição de perfil e cadastre um telefone');
        navigation.navigate('PreIndex')
       }
    } catch (error) {
      console.log('Erro ao verificar telefone:', error);
    }
  };
    
        
        
      
 

  // Implemente a lógica para fazer upload da imagem no Cloudinary
  const uploadImageClodinary = async () => {
    const data = new FormData();
    const randomName = `${uuid.v4()}.jpg`;

    data.append('file', {
      uri: imagem,
      type: 'image/jpeg',
      name: randomName,
    });
    data.append('upload_preset', 'vjj0zt6u');
    data.append('cloud_name', 'dfimkeeif');
    
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dfimkeeif/image/upload', {
        method: 'POST',
        body: data
      });
      if (!response.ok) {
        throw new Error('Não foi possível fazer upload da imagem');
      }
      const jsonData = await response.json();
      setUrlImagem(jsonData.url);
      console.log(urlImagem);
      handleCadastrarAnimal();
    } catch (err) {
      alert('Erro ao fazer upload da imagem' + err);
    }

 

  };


  /**
   * {
    "nome": "Fido",
    "raca": "Labrador Retriever",
    "data_nascimento": "2018-01-01 12:00:00",
    "sexo": "Macho",
    "estado_cod": "2",
    "cidade_cod": "25",
    "imagem": "https://example.com/imagem.jpg",
    "descricao": "Um cãozinho muito amigável e brincalhão."
    }
   */
  // Implemente a lógica para cadastrar um novo animal
  const handleCadastrarAnimal = () => {
    const urlPost = API_URL + "/animais-adocao";
  
    // Recuperar o token do AsyncStorage
    AsyncStorage.getItem('access_token')
      .then((token) => {
        if (token) {
          const data = {
            nome: nome,
            raca: raca,
            sexo: sexo,
            idade: idade,
            estado_cod: estado,
            cidade_cod: cidade,
            imagem: urlImagem,
            descricao: descricao
          };

          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          };
 
          axios.post(urlPost, data, { headers: headers })
            .then((response) => {
              console.log(response);
              Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
              navigation.navigate('PreIndex')

            })
            .catch((error) => {
              console.log(error);
              Alert.alert('Erro', 'Erro ao cadastrar animal!');
            });
        } else {
          Alert.alert('Erro', 'Token de acesso não encontrado!');
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Erro', 'Erro ao recuperar o token de acesso!');
      });
  };
  

  // Implemente a lógica para selecionar uma imagem da galeria
  const handlePickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });

      if (!result.cancelled) {
        setImagem(result.uri);
      }
    } catch (error) {
      console.log('Erro ao selecionar imagem:', error);
    }
  };

  // Implemente a lógica para cadastrar um novo animal
  const handleEstadoChange = (value) => {
    setEstado(value);
    if (value) {
      carregarCidades(value);
    } else {
      setCidades([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-left" size={24} color="white" />
        <Icon name="log-out" size={24} color="white" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Cadastrar Animais</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Raça"
          value={raca}
          onChangeText={setRaca}
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={idade}
          onChangeText={setIdade}
        />
        <Picker
          style={styles.input}
          selectedValue={sexo}
          onValueChange={(value) => setSexo(value)}
        >
          <Picker.Item label="Selecione o sexo" value="" />
          <Picker.Item label="Macho" value="1" />
          <Picker.Item label="Fêmea" value="2" />
        </Picker>
        <Picker
          style={styles.input}
          selectedValue={estado}
          onValueChange={handleEstadoChange}
        >
          <Picker.Item label="Selecione o estado" value="" />
          {estados.map((estado) => (
            <Picker.Item key={estado.id} label={estado.nome} value={estado.id.toString()} />
          ))}
        </Picker>
        <Picker
          style={styles.input}
          selectedValue={cidade}
          onValueChange={(value) => setCidade(value)}
        >
          <Picker.Item label="Selecione a cidade" value="" />
          {cidades.map((cidade) => (
            <Picker.Item key={cidade.id} label={cidade.nome} value={cidade.id.toString()} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />
        <Button
          title="Selecionar Imagem"
          onPress={handlePickImage}
          color="#808080"
        />
        {imagem ? <Text style={styles.selectedImage}>Imagem selecionada: {imagem}</Text> : null}
        <View style={styles.buttonContainer}>
          <Button
            title="Cadastrar"
            onPress={uploadImageClodinary}
            color="black"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38a69d',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  selectedImage: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
