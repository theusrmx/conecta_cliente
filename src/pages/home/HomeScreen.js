import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/comum/CustomButton';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem vindo(a), o que vamos fazer hoje?</Text>

      <CustomButton style={styles.btn_home}
        title="Cadastrar Cliente"
        onPress={() => navigation.navigate('CadastroCliente')}
      />
      <CustomButton
        title="Listar Clientes"
        onPress={() => navigation.navigate('ListarClientes')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
