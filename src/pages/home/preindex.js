import React, { useEffect, useState } from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function PreIndex() {
const [usuario, setUsuario] = useState('');
const navigation = useNavigation();

useEffect(() => {
loadUsuario();
}, []);

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

const handleLogout = () => {
AsyncStorage.removeItem('access_token');
navigation.navigate('Login');
};


const handleMenuOptionSelect = (option) => {
switch (option) { 
case 'consultar':
navigation.navigate('Filter');
break;
case 'cadastrar':
navigation.navigate('CadatrarAnimais');
break;
case 'atualizar-perfil':
navigation.navigate('Atualizar');
default:
break;
}}


return (
<View style={styles.container}>
<View style={styles.header}>
<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
<Icon name="log-out" size={24} color="white" />
</TouchableOpacity>
</View>
<View style={styles.body}>
<Text style={styles.bodyText}>Bem vindo, {usuario}!</Text>
<TouchableOpacity onPress={() => handleMenuOptionSelect('consultar')}>
<View style={styles.bodyOptionBox}>
<Text style={styles.bodyOption}>Consultar</Text>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={() => handleMenuOptionSelect('cadastrar')}>
<View style={styles.bodyOptionBox}>
<Text style={styles.bodyOption}>Cadastrar</Text>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={() => handleMenuOptionSelect('atualizar-perfil')}>
<View style={styles.bodyOptionBox}>
<Text style={styles.bodyOption}>Atualizar Perfil</Text>
</View>
</TouchableOpacity>
</View>
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
body: {
flex: 1,
justifyContent: 'flex-start',
alignItems: 'center',
},
bodyText: {
fontSize: 18,
fontWeight: 'bold',
color: 'white',
marginBottom: 20,
},
bodyOptionBox: {
width: 200,
height: 50,
backgroundColor: '#ffffff',
borderRadius: 10,
justifyContent: 'center',
alignItems: 'center',
marginBottom: 10,
},
bodyOption: {
fontSize: 16,
color: 'black',
},
});
