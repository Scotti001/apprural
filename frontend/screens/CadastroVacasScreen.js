import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [brinco, setBrinco] = useState('');
  const [mae, setMae] = useState('');
  const [pai, setPai] = useState('');
  const [avosPaterno, setAvosPaterno] = useState('');
  const [avosMaterno, setAvosMaterno] = useState('');
  const [propriedade, setPropriedade] = useState('');
  const [lote, setLote] = useState('');
  const [numeroPartos, setNumeroPartos] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');

  const handleCadastro = async () => {
    try {
      const response = await axios.post('http://192.168.1.106:3004/vacascadastro/cadastrar', { 
        nome, 
        brinco, 
        mae, 
        pai, 
        avosPaterno, 
        avosMaterno, 
        propriedade, 
        lote,
        numeroPartos,
        dataEntrada
      });
      Alert.alert('Sucesso', response.data.message);

      // Redirecionar para a tela de rebanho
      navigation.navigate('ControleLeiteiro');
    } catch (error) {
      if (error.response) {
        Alert.alert('Erro', error.response.data.error);
      } else {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Vaca</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Brinco"
        value={brinco}
        onChangeText={setBrinco}
      />
      <TextInput
        style={styles.input}
        placeholder="Mãe"
        value={mae}
        onChangeText={setMae}
      />
      <TextInput
        style={styles.input}
        placeholder="Pai"
        value={pai}
        onChangeText={setPai}
      />
      <TextInput
        style={styles.input}
        placeholder="Avós Paterno"
        value={avosPaterno}
        onChangeText={setAvosPaterno}
      />
      <TextInput
        style={styles.input}
        placeholder="Avós Materno"
        value={avosMaterno}
        onChangeText={setAvosMaterno}
      />
      <TextInput
        style={styles.input}
        placeholder="Propriedade"
        value={propriedade}
        onChangeText={setPropriedade}
      />
      <TextInput
        style={styles.input}
        placeholder="Lote"
        value={lote}
        onChangeText={setLote}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Partos"
        value={numeroPartos}
        onChangeText={setNumeroPartos}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Entrada (não obrigatório)"
        value={dataEntrada}
        onChangeText={setDataEntrada}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Vaca</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 20, backgroundColor: '#fff' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
