// Importações necessárias
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente da Main Screen
const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à Main Screen!</Text>
      {/* Adicione outros componentes, como botões, listas, etc., conforme necessário */}
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
  text: {
    fontSize: 24, // Tamanho da fonte
    fontWeight: 'bold', // Peso da fonte
  },
});

export default MainScreen;
