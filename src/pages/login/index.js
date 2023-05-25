import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import { firebaseConfig } from "../../../firebase-config"

import * as Animatable from 'react-native-animatable';

import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const navigation = useNavigation();

    const [Email, setEmail] = React.useState('');
    const [Senha, setSenha] = React.useState('');

    const app = initializeApp(firebaseConfig);  
    const auth = getAuth(app);

    function handleLogin() {
        signInWithEmailAndPassword(auth, Email, Senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user, "Logado com sucesso!");
            // ...
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })};


    return (
    <View 
    style={styles.container
    }>
        <Animatable.View 
        delay={500}
        animation="fadeInLeft">
        <Text 
        style={styles.message}
        >Bem-vindo(a)
        </Text>
        </Animatable.View>
        <Animatable.View 
        animation="fadeInUpBig"
        style={styles.containerForm}>
         <Text style={styles.label}>
             Email
        </Text>
        <TextInput 
        onChangeText={(text) => setEmail(text)}
        style={styles.input} placeholder="Digite o Email.."/>
        <Text style={styles.label}>
             Senha
        </Text>
        <TextInput
        secureTextEntry={true}
        onChangeText={(text) => setSenha(text)}
        style={styles.input} placeholder="Digite a Senha.."/>

        <TouchableOpacity onPress={handleLogin
        } style={styles.button}>
            <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>


        <TouchableOpacity 
        onPress={() => navigation.navigate('Registro')}
        style={styles.buttonRegister}>
            <Text style={styles.RegistertextButton}>Não possui uma conta? Cadastre-se</Text>
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