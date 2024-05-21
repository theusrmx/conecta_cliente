import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const ListarClientesScreen = () => {
  const [clientes, setClientes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Função para carregar os clientes da API
    const carregarClientes = async () => {
      try {
        const response = await fetch('http://192.168.15.65:5000/listar_clientes_resumido');
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    // Chamada da função para carregar os clientes ao montar a tela
    carregarClientes();
  }, []);

  const verDetalhesCliente = (cliente) => {
    navigation.navigate('DetalhesCliente', { cliente });
  };

  // Função para renderizar cada item da lista de clientes como um card
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => verDetalhesCliente(item)}>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          <Text style={styles.cardTextLabel}>Empresa: </Text>
          <Text style={styles.cardTextContent}>{item.razao_social}</Text>
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardTextLabel}>CNPJ: </Text>
          <Text style={styles.cardTextContent}>{item.cnpj}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clientes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_cliente.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardTextLabel: {
    fontWeight: 'bold',
  },
  cardTextContent: {
    marginLeft: 5,
  },
});

export default ListarClientesScreen;
