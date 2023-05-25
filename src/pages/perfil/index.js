import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, updateProfile } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import * as Animatable from 'react-native-animatable';

export default function AtualizarPerfil() {

    const [data, setData] = React.useState({
        nome: '',
        email: '',
        password: '',
    });

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  const navigation = useNavigation();
  const nomeUsuario = auth.currentUser.displayName;

  function handleAtualizarPerfil() {
    console.log(data)
        updateProfile(auth.currentUser, {
            displayName: data.nome,
            email: data.email,
            password: data.password
        }).then(() => {
            alert('Perfil Atualizado com Sucesso!')
            navigation.navigate('Home')
        }).catch((error) => {
            console.log(error);
        });

        navigation.navigate('Home')
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

