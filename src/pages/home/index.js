import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Home() {
  const url = "https://api-meupet-production.up.railway.app/api/animais-adocao";
  const [animais, setAnimais] = useState([]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
