import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import * as Animatable from 'react-native-animatable';

export default function Register() {
        const [data, setData] = React.useState({
        nome: '',
        email: '',
        password: '',
        confirm_password: '',
    });
        console.log(data);

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
        <Text style={styles.label}>
             Confirmação de senha
        </Text>
        <TextInput
        onChangeText={(text) => setData({...data, confirm_password: text})}
        secureTextEntry={true}
        style={styles.input} placeholder="Digite a Senha.."/>

        <TouchableOpacity
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