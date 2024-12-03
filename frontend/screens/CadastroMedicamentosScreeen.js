// screens/CadastroMedicamentosScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CadastroMedicamentosScreen() {
  const [nome, setNome] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [validade, setValidade] = useState('');

  const handleCadastro = () => {
    Alert.alert('Sucesso', 'Medicamento cadastrado com sucesso!');
    // Lógica de envio para o backend
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Medicamentos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Medicamento"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Fabricante"
        value={fabricante}
        onChangeText={setFabricante}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Validade"
        value={validade}
        onChangeText={setValidade}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
