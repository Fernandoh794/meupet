import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import { API_URL } from "../../../apiConfig";

export default function Register() {
    const navigation = useNavigation();
    const [data, setData] = React.useState({
    nome: '',
    email: '',
    password: '',

    });
    let url = API_URL + "/register";
    const handleCreateAcount = () => {
        axios.post(url, {
            name: data.nome,
            email: data.email,
            password: data.password
        })
        .then(function (response) {
            if(response.status == 201){
                alert("Conta criada com sucesso!");
                navigation.navigate("Login");
            } else if (response.status == 422){
                alert("Email invalido!, tente outro")
            }
        })
        .catch(function (error) {
            alert("Erro ao criar conta!" + error);
            console.log(error);
        });
        
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
        >Registre-se
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
        <TouchableOpacity
        onPress={handleCreateAcount}
         style={styles.button}>
            <Text style={styles.textButton}>Registrar</Text>
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
        backgroundColor: '#38a69d',
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