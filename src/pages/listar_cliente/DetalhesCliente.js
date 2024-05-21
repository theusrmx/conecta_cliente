import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const DetalhesClienteScreen = ({ route }) => {
  const { cliente } = route.params;
  const [detalhesCliente, setDetalhesCliente] = useState(null);

  useEffect(() => {
    const carregarDetalhesCliente = async () => {
      try {
        const response = await fetch(`http://192.168.15.65:5000/listar_clientes_completo/${cliente.id_cliente}`);
        const data = await response.json();
        setDetalhesCliente(data);
      } catch (error) {
        console.error('Erro ao carregar detalhes do cliente:', error);
      }
    };

    carregarDetalhesCliente();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes do Cliente</Text>
      {detalhesCliente && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Gerais</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Razão Social:</Text>
              <Text style={styles.text}>{detalhesCliente.razao_social || 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>CNPJ:</Text>
              <Text style={styles.text}>{detalhesCliente.cnpj || 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Nome Fantasia:</Text>
              <Text style={styles.text}>{detalhesCliente.nome_fantasia || 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Tipo de Empresa:</Text>
              <Text style={styles.text}>{detalhesCliente.tipo_empresa || 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Data de Fundação:</Text>
              <Text style={styles.text}>{detalhesCliente.data_fundacao || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contato</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Endereço:</Text>
              <Text style={styles.text}>{detalhesCliente.contato ? detalhesCliente.contato.endereco : 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Telefone:</Text>
              <Text style={styles.text}>{detalhesCliente.contato ? detalhesCliente.contato.telefone : 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>E-mail Comercial:</Text>
              <Text style={styles.text}>{detalhesCliente.contato ? detalhesCliente.contato.email_comercial : 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>E-mail Financeiro:</Text>
              <Text style={styles.text}>{detalhesCliente.contato ? detalhesCliente.contato.email_financeiro : 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>E-mail NFE:</Text>
              <Text style={styles.text}>{detalhesCliente.contato ? detalhesCliente.contato.email_NFE : 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Bancárias</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Banco:</Text>
              <Text style={styles.text}>{detalhesCliente.info_bancaria ? detalhesCliente.info_bancaria.nome_banco : 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Conta:</Text>
              <Text style={styles.text}>{detalhesCliente.info_bancaria ? detalhesCliente.info_bancaria.numero_conta : 'N/A'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Agência:</Text>
              <Text style={styles.text}>{detalhesCliente.info_bancaria ? detalhesCliente.info_bancaria.agencia : 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sócios</Text>
            {detalhesCliente.socios && detalhesCliente.socios.length > 0 ? (
              detalhesCliente.socios.map((socio, index) => (
                <View key={index} style={styles.socioContainer}>
                  <Text style={styles.label}>Nome:</Text>
                  <Text style={styles.text}>{socio.nome_socio}</Text>
                  <Text style={styles.label}>CPF:</Text>
                  <Text style={styles.text}>{socio.cpf_socio}</Text>
                </View>
              ))
            ) : (
              <Text>Nenhum sócio encontrado</Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 15,
  },
  socioContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  text: {
    marginLeft: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 20,
  },
});

export default DetalhesClienteScreen;
