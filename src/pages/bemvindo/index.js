import React from "react";
import {
View,
Text,
StyleSheet,
Image,
TouchableOpacity
 } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";


export default function BemVindo() {
const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image  
                animation="flipInY"
                style={styles.logo} 
                source={require('../../../assets/pets.png')
                }/>
            </View>
                <Animatable.View 
                delay={600}
                    animation="fadeInUpBig"
                style={styles.containerForm}>
                    <Text style={styles.title}>
                       Que tal adotar um novo amigo?
                    </Text>
                    <Text style={styles.text}>
                        Vamos começar? Faça seu login
                    </Text>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}>
                        <Text style={styles.textButton}>
                            Acessar
                        </Text>
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
    logo: {
      width: 300,
      height: 300,
      marginTop: 20,
      marginLeft: 50,
      marginRight: 50,
      marginBottom: 50,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#38a69d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
       flex: 1, 
         backgroundColor: '#fff',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingStart: '5%',
            paddingEnd: '5%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12
    },
    text: {
        color: '#a1a1a1',
    
    },
    button: {
        position: 'absolute',
        backgroundColor: '#38a69d',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    }
  });
  
  