import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClienteCard = ({ cliente }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{cliente.razao_social}</Text>
      <Text style={styles.text}>CNPJ: {cliente.cnpj}</Text>
      <Text style={styles.text}>Telefone: {cliente.telefone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default ClienteCard;
