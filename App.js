import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CustomerFormScreen = () => {
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [inscricaoEstadual, setInscricaoEstadual] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [tipoEmpresa, setTipoEmpresa] = useState('');
  const [dataFundacao, setDataFundacao] = useState('');
  const [predioProprioAluguel, setPredioProprioAluguel] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [emailComercial, setEmailComercial] = useState('');
  const [emailFinanceiro, setEmailFinanceiro] = useState('');
  const [emailNFE, setEmailNFE] = useState('');
  const [nomeGerente, setNomeGerente] = useState('');
  const [cpfGerente, setCpfGerente] = useState('');
  const [nomeComprador, setNomeComprador] = useState('');
  const [cpfComprador, setCpfComprador] = useState('');
  const [nomeSocio, setNomeSocio] = useState('');
  const [cpfSocio, setCpfSocio] = useState('');
  const [nomeBanco, setNomeBanco] = useState('');
  const [numeroConta, setNumeroConta] = useState('');
  const [agencia, setAgencia] = useState('');
  const [nomeVendedor, setNomeVendedor] = useState('');
  const [cpfVendedor, setCpfVendedor] = useState(''); // Pode ser obtido do usuário logado

  const handleSubmit = () => {
    // Aqui você pode enviar os dados para onde for necessário, como uma API, por exemplo
    console.log({
      razaoSocial,
      cnpj,
      inscricaoEstadual,
      nomeFantasia,
      tipoEmpresa,
      dataFundacao,
      predioProprioAluguel,
      endereco,
      telefone,
      emailComercial,
      emailFinanceiro,
      emailNFE,
      nomeGerente,
      cpfGerente,
      nomeComprador,
      cpfComprador,
      nomeSocio,
      cpfSocio,
      nomeBanco,
      numeroConta,
      agencia,
      nomeVendedor,
      cpfVendedor
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Top Bar</Text>
      </View>
      <View style={styles.formContainer}>
        {/* Campos da tabela Cliente */}
        <TextInput
          style={styles.input}
          placeholder="Razão Social"
          value={razaoSocial}
          onChangeText={setRazaoSocial}
        />
        <TextInput
          style={styles.input}
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={setCnpj}
        />
        {/* Demais campos da tabela Cliente */}
        {/* Campos da tabela Contato */}
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
        />
        {/* Demais campos da tabela Contato */}
        {/* Botão de envio */}
        <Button title="Enviar" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 100, // Altura da top bar
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default CustomerFormScreen;
