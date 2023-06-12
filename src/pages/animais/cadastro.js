import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

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

  useEffect(() => {
    carregarEstados();
  }, []);

  const carregarEstados = async () => {
    try {
      const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      setEstados(response.data);
    } catch (error) {
      console.log('Erro ao carregar estados:', error);
    }
  };

  const carregarCidades = async (estadoId) => {
    try {
      const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
      setCidades(response.data);
    } catch (error) {
      console.log('Erro ao carregar cidades:', error);
    }
  };

  const handleCadastrarAnimal = () => {
    // Implemente a lógica para cadastrar um novo animal
  };

  const handlePickImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });

    if (!result.cancelled) {
      setImagem(result.uri);
    }
  };

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
            onPress={handleCadastrarAnimal}
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
