import React, { useEffect, useState } from 'react';
import {
View,
Text,
StyleSheet,
TouchableOpacity,
Dimensions,
Animated,
TouchableWithoutFeedback
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function PreIndex() {
const [usuario, setUsuario] = useState('');
const navigation = useNavigation();

const [menuOpen, setMenuOpen] = useState(false);
const menuWidth = Dimensions.get('window').width * 0.8;
const menuAnimation = useState(new Animated.Value(0))[0];

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
// Lógica para realizar o logout do usuário
// ...
};

const toggleMenu = () => {
if (menuOpen) {
Animated.timing(menuAnimation, {
toValue: 0,
duration: 300,
useNativeDriver: false,
}).start(() => setMenuOpen(false));
} else {
setMenuOpen(true);
Animated.timing(menuAnimation, {
toValue: 1,
duration: 300,
useNativeDriver: false,
}).start();
}
};

const closeMenu = () => {
Animated.timing(menuAnimation, {
toValue: 0,
duration: 300,
useNativeDriver: false,
}).start(() => setMenuOpen(false));
};

const handleMenuOptionSelect = (option) => {
// Lógica para lidar com a seleção de opção do menu
// ...
};

const menuTranslateX = menuAnimation.interpolate({
inputRange: [0, 1],
outputRange: [-menuWidth, 0],
});

return (
<View style={styles.container}>
<View style={styles.header}>
<TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
<Icon name="menu" size={24} color="white" />
</TouchableOpacity>
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
<TouchableOpacity onPress={() => handleMenuOptionSelect('meus-anuncios')}>
<View style={styles.bodyOptionBox}>
<Text style={styles.bodyOption}>Meus Anúncios</Text>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={() => handleMenuOptionSelect('minhas-adocoes')}>
<View style={styles.bodyOptionBox}>
<Text style={styles.bodyOption}>Minhas Adoções</Text>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={() => handleMenuOptionSelect('atualizar-perfil')}>
<View style={styles.bodyOptionBox}>
<Text style={styles.bodyOption}>Atualizar Perfil</Text>
</View>
</TouchableOpacity>
</View>
{menuOpen && (
    <Animated.View
      style={[
        styles.menu,
        { width: menuWidth, transform: [{ translateX: menuTranslateX }] },
      ]}
    >
      <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
        <Icon name="x" size={24} color="black" />
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('consultar')}>
        <View style={styles.dropdownMenuItem}>
          <Text style={styles.dropdownMenuItemText}>Consultar</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('meus-anuncios')}>
        <View style={styles.dropdownMenuItem}>
          <Text style={styles.dropdownMenuItemText}>Meus Anúncios</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('atualizar-perfil')}>
        <View style={styles.dropdownMenuItem}>
          <Text style={styles.dropdownMenuItemText}>Atualizar Perfil</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => handleMenuOptionSelect('minhas-adocoes')}>
        <View style={styles.dropdownMenuItem}>
          <Text style={styles.dropdownMenuItemText}>Minhas Adoções</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Espaço para a versão do aplicativo */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Versão: 1.0.0</Text>
        <Text style={styles.versionText}>Corprith</Text>
      </View>
    </Animated.View>
  )}
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
