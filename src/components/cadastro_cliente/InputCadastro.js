import React from 'react';
import { TextInput, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const InputCadastro = ({ label, value, onChangeText }) => {
  // Função para determinar a máscara com base no placeholder
  const determineMask = (placeholder) => {
    switch (placeholder) {
      case 'CNPJ':
        return 'cnpj';
      case 'CPF':
        return 'cpf';
      case 'CEP':
        return 'zip-code';
      default:
        return null; // Caso nenhum placeholder corresponda, não aplicar máscara
    }
  };

  const mask = determineMask(label);

  // Renderizar TextInput com ou sem máscara dependendo do valor de mask
  return (
    <SafeAreaView>
      <Text style={styles.inputLegend}>{label}</Text>
      {mask ? (
        <TextInputMask
          style={styles.input}
          placeholder={label}
          value={value}
          onChangeText={onChangeText}
          type={mask}
          ellipsizeMode="tail" 
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder={label}
          value={value}
          onChangeText={onChangeText}
          ellipsizeMode="tail" 
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,    
  },
  inputLegend: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
});

export default InputCadastro;
