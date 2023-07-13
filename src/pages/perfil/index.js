import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../apiConfig';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function AtualizarPerfil() {

    const [data, setData] = React.useState({
        nome: '',
        email: '',
        password: '',
        telefone: '',
    });
    const navigation = useNavigation();




  async function handleAtualizarPerfil() {
    const UserId = await AsyncStorage.getItem('user_id');
    const Token = await AsyncStorage.getItem('access_token');
    let url = API_URL + '/users/' + UserId;
    try {
        const response = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        });
        if (response.status == 200) {
            AsyncStorage.setItem('user_logado', data.nome);
            alert('Perfil Atualizado com Sucesso!');
            navigation.navigate('PreIndex');
        }
    } catch (error) {
        console.log(error);
        alert('Erro ao Atualizar Perfil!');
    }
}

  
  return (
    <View 
    style={styles.container
    }>
        <Animatable.View 
        delay={500}
        animation="fadeInLeft">
        <Text 
        style={styles.message}
        >Atualizar Perfil
        </Text>
        </Animatable.View>
        <Animatable.View 
        animation="fadeInUpBig"
        style={styles.containerForm}>
        <Text style={styles.label}>
             Nome
        </Text>
        <TextInput
        onChangeText={(text) => setData({...data, nome: text})}
         style={styles.input}
          placeholder="Digite o seu Nome.."/>
         <Text style={styles.label}>
             Email
        </Text>
        <TextInput
        onChangeText={(text) => setData({...data, email: text})} 
        style={styles.input} 
        placeholder="Digite o Email.."/>
        <Text style={styles.label}>
             Senha
        </Text>
        <TextInput
        onChangeText={(text) => setData({...data, password: text})}
        secureTextEntry={true}
        style={styles.input} placeholder="Digite a Senha.."/>
        <Text style={styles.label}>
  Telefone
</Text>
<TextInputMask
  onChangeText={(value, teste, tst) => {
    setData((prevData) => ({ ...prevData, telefone: value }));
  }}
  value={data.telefone}
  style={styles.input}
  placeholder="Digite o Telefone.."
  type={'cel-phone'}
  options={{
    maskType: 'BRL',
  }}
/>
        <TouchableOpacity onPress={handleAtualizarPerfil}
         style={styles.button}>
            <Text style={styles.textButton}>Atualizar!</Text>
        </TouchableOpacity>
        </Animatable.View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38a69d'
    },
    message: {
        marginTop: '10%',
        marginBottom: '8%',
        marginLeft: '8%',
        paddingStart: '5%',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 18,
    },
    button : {
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: '15%',
        alignItems: 'center',
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    buttonRegister : { 
        marginTop: '15%',
        alignItems: 'center',
    },

    RegistertextButton: {
        color: '#a1a1a1',
                fontSize: 15,
        fontWeight: 'bold',
    }


});

