import React from 'react';
import { TextInput, View, Text, StyleSheet, SafeAreaView } from 'react-native';

const InputCadastro = ({ label, value, onChangeText }) => {
  return (
    <SafeAreaView>
      <Text style={styles.inputLegend}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        ellipsizeMode="tail" 
      />
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
