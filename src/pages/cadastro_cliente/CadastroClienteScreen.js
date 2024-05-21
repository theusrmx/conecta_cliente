import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { RadioButton } from 'react-native-paper';
import InputCadastro from '../../components/cadastro_cliente/InputCadastro';
import CustomButton from '../../components/comum/CustomButton';

const CadastroClienteScreen = () => {
  const [cnpj, setCnpj] = useState('');
  const [clienteData, setClienteData] = useState(null);
  const [tipoEmpresa, setTipoEmpresa] = useState(''); 
  const [predioProprio, setPredioProprio] = useState('')

  const consultarCNPJ = async () => {
    try {
      const response = await fetch(`https://minhareceita.org/${cnpj}`);
      const data = await response.json();
      setClienteData(data);
      console.log(data)
    } catch (error) {
      console.error('Erro ao consultar CNPJ:', error);
    }
  };

  const cadastrarCliente = async () => {
    

    let clienteDataAPI = {
      razao_social: clienteData.razao_social,
      cnpj: clienteData.cnpj,
      nome_fantasia: clienteData.nome_fantasia,
      tipo_empresa: tipoEmpresa,
      data_fundacao: clienteData.data_inicio_atividade,
      predio_proprio: predioProprio,
      aluguel: clienteData.aluguel,
      nome_gerente: clienteData.nome_gerente,
      cpf_gerente: clienteData.cpf_gerente,
      nome_comprador: clienteData.nome_comprador,
      cpf_comprador: clienteData.cpf_comprador,
      telefone: clienteData.ddd_telefone_1,
      email_comercial: clienteData.email_comercial,
      email_financeiro: clienteData.email_financeiro,
      email_NFE: clienteData.email_nfe,
      endereco: `${clienteData.descricao_tipo_de_logradouro} ${clienteData.logradouro}, ${clienteData.numero}, ${clienteData.bairro}, ${clienteData.municipio}, ${clienteData.uf} - CEP: ${clienteData.cep}`,
      nome_banco: clienteData.nome_banco,
      numero_conta: clienteData.numero_conta,
      agencia: clienteData.agencia,
      qsa: clienteData.qsa.map(socio => ({
        nome_socio: socio.nome_socio,
        cpf_socio: socio.cnpj_cpf_do_socio
      }))
    }
    console.log(clienteDataAPI)

    try {
      const response = await fetch('http://192.168.15.65:5000/cadastrar_cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteDataAPI),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao cadastrar cliente');
      }
      setTimeout(() => {
        setClienteData(null);
        setCnpj('');
        setTipoEmpresa('');
        setPredioProprio('');
      }, 3000);
      console.log('Cliente cadastrado com sucesso');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Cadastro de Cliente</Text>
        <TextInputMask
          style={styles.input}
          placeholder="CNPJ"
          value={cnpj}
          onChangeText={setCnpj}
          type={'cnpj'}
        />
        <CustomButton title="Consultar CNPJ" onPress={consultarCNPJ} />
        
        {clienteData && (
          <View style={styles.clienteDataContainer}>
            <Text style={styles.subheading}>EMPRESA</Text>

            <InputCadastro
              label="CNPJ"
              value={clienteData.cnpj}
              onChangeText={value => setClienteData({...clienteData, cnpj: value})}
            />

            <InputCadastro
              label="Razão Social"
              value={clienteData.razao_social}
              onChangeText={value => setClienteData({...clienteData, razao_social: value})}
            />

            <InputCadastro
              label="Nome fantasia"
              value={clienteData.nome_fantasia}
              onChangeText={value => setClienteData({...clienteData, nome_fantasia: value})}
            />

            <InputCadastro
              label="Nome - Gerente"
              value={clienteData.nome_gerente}
              onChangeText={value => setClienteData({...clienteData, nome_gerente: value})}
            />

            <InputCadastro
              label="CPF - Gerente"
              value={clienteData.cpf_gerente}
              onChangeText={value => setClienteData({...clienteData, cpf_gerente: value})}
            />

            <InputCadastro
              label="Nome - Comprador"
              value={clienteData.nome_comprador}
              onChangeText={value => setClienteData({...clienteData, nome_comprador: value})}
            />

            <InputCadastro
              label="CPF - Comprador"
              value={clienteData.cpf_comprador}
              onChangeText={value => setClienteData({...clienteData, cpf_comprador: value})}
            />

            <InputCadastro
              label="Data fundação"
              value={clienteData.data_inicio_atividade}
              onChangeText={value => setClienteData({...clienteData, data_inicio_atividade: value})}
            />

            <Text style={styles.label}>Tipo de Empresa:</Text>
              <View style={styles.radioGroup}>
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="LTDA"
                        status={tipoEmpresa === 'LTDA' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setTipoEmpresa('LTDA')} 
                        color="#007BFF"
                    /> 
                    <Text style={styles.radioLabel}> 
                        LTDA
                    </Text> 
                </View>

                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="MEI"
                        status={tipoEmpresa === 'MEI' ?  
                                 'checked' : 'unchecked'} 
                        onPress={() => setTipoEmpresa('MEI')} 
                        color="#007BFF"
                    /> 
                    <Text style={styles.radioLabel}> 
                        MEI
                    </Text> 
                </View>

                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="EPP"
                        status={tipoEmpresa === 'EPP' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setTipoEmpresa('EPP')} 
                        color="#007BFF"
                    /> 
                    <Text style={styles.radioLabel}> 
                        EPP
                    </Text> 
                </View>

                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="ME"
                        status={tipoEmpresa === 'ME' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setTipoEmpresa('ME')} 
                        color="#007BFF"
                    /> 
                    <Text style={styles.radioLabel}> 
                        ME
                    </Text> 
                </View>
              </View>
    

            <Text style={styles.subheading}>ENDEREÇO E CONTATO</Text>
            <InputCadastro
              label="Endereço"
              value={`${clienteData.descricao_tipo_de_logradouro} ${clienteData.logradouro}`}
              onChangeText={value => setClienteData({...clienteData, logradouro: value})}
            />

            <InputCadastro
              label="Número"
              value={clienteData.numero}
              onChangeText={value => setClienteData({...clienteData, numero: value})}
            />

            <InputCadastro
              label="Bairro"
              value={clienteData.bairro}
              onChangeText={value => setClienteData({...clienteData, bairro: value})}
            />

            <InputCadastro
              label="Cidade"
              value={clienteData.municipio}
              onChangeText={value => setClienteData({...clienteData, cidade: value})}
            />
            
            <InputCadastro
              label="UF"
              value={clienteData.uf}
              onChangeText={value => setClienteData({...clienteData, uf: value})}
            />
            
            <InputCadastro
              label="CEP"
              value={clienteData.cep}
              onChangeText={value => setClienteData({...clienteData, cep: value})}
            />
            
            <InputCadastro
              label="E-mail Comercial"
              value={clienteData.email}
              onChangeText={value => setClienteData({...clienteData, email_comercial: value})}
            />

            <InputCadastro
              label="E-mail Financeiro/Boleto"
              value={clienteData.email}
              onChangeText={value => setClienteData({...clienteData, email_financeiro: value})}
            />

            <InputCadastro
              label="E-mail para NFE"
              value={clienteData.email}
              onChangeText={value => setClienteData({...clienteData, email_nfe: value})}
            />

            <InputCadastro
              label="Telefone"
              value={clienteData.ddd_telefone_1}
              onChangeText={value => setClienteData({...clienteData, ddd_telefone_1: value})}
            />

            
              <Text style={styles.label}>Prédio próprio:</Text>
              <View style={styles.radioGroup}>
                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="SIM"
                        status={predioProprio === 'SIM' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setPredioProprio('SIM')} 
                        color="#007BFF"
                    /> 
                    <Text style={styles.radioLabel}> 
                        SIM
                    </Text> 
                </View>

                <View style={styles.radioButton}> 
                    <RadioButton.Android 
                        value="NAO"
                        status={predioProprio === 'NAO' ?  
                                'checked' : 'unchecked'} 
                        onPress={() => setPredioProprio('NAO')} 
                        color="#007BFF"
                    /> 
                    <Text style={styles.radioLabel}> 
                        NÃO
                    </Text> 
                </View>
              </View>

              <InputCadastro
              label="Aluguel"
              value={clienteData.aluguel}
              onChangeText={value => setClienteData({...clienteData, aluguel: value})}
              />

            <Text style={styles.subheading}>SÓCIOS</Text>
            {clienteData.qsa.map((socio, index) => (
              <View key={index}>
                
                <InputCadastro
                  label="Nome"
                  value={socio.nome_socio}
                  onChangeText={value => {
                    const updatedQsa = [...clienteData.qsa];
                    updatedQsa[index] = {...socio, nome_socio: value};
                    setClienteData({...clienteData, qsa: updatedQsa});
                  }}
                />

                <InputCadastro
                  label="CPF/CNPJ"
                  value={socio.cnpj_cpf_do_socio}
                  onChangeText={value => {
                    const updatedQsa = [...clienteData.qsa];
                    updatedQsa[index] = {...socio, cnpj_cpf_do_socio: value};
                    setClienteData({...clienteData, qsa: updatedQsa});
                  }}
                />
              </View>
            ))}

            <Text style={styles.subheading}>INFORMAÇÕES BANCÁRIAS</Text>
            <InputCadastro
              label="Banco"
              value={clienteData.nome_banco}
              onChangeText={value => setClienteData({...clienteData, nome_banco: value})}
            />

            <InputCadastro
              label="Número da conta"
              value={clienteData.numero_conta}
              onChangeText={value => setClienteData({...clienteData, numero_conta: value})}
            />

            <InputCadastro
              label="Agência"
              value={clienteData.agencia}
              onChangeText={value => setClienteData({...clienteData, agencia: value})}
            />

          
          <CustomButton title="Cadastrar cliente" onPress={cadastrarCliente} />
          </View>
        )} 
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 30,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  inputLegend: {
    fontSize: 12,
    color: '#888',
  },
  clienteDataContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    width: '100%'
  },
  radioGroup: {  
    alignItems: 'left', 
    justifyContent: 'space-around', 
    marginTop: 20, 
    borderRadius: 8, 
    backgroundColor: 'white', 
    padding: 16, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { 
        width: 0, 
        height: 2, 
    }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    }, 
    radioButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    radioLabel: { 
        marginLeft: 8, 
        fontSize: 16, 
        color: '#333', 
    }, 
});

export default CadastroClienteScreen;
