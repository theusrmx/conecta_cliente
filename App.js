// Importações necessárias
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Componente da Splash Screen
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simula um tempo de espera de 2 segundos (2000 milissegundos)
    setTimeout(() => {
      // Navegue para a próxima tela após o tempo de espera
      navigation.replace('MainScreen');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/teste.png')}
        style={styles.logo}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Cor de fundo da tela
  },
  logo: {
    width: 200, // Largura da imagem
    height: 200, // Altura da imagem
    resizeMode: 'contain', // Ajuste da imagem
  },
});

export default SplashScreen;
