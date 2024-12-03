import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function CadastroScreen({ navigation }) {
  const [userType, setUserType] = useState('proprietario'); // 'proprietario' ou 'veterinario'
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomePropriedade, setNomePropriedade] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha || (userType === 'proprietario' && !nomePropriedade)) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setLoading(true);
      const data =
        userType === 'proprietario'
          ? { nome, email, senha, role: 'proprietario', nomePropriedade }
          : { nome, email, senha, role: 'veterinario' };

      const response = await axios.post('http://192.168.1.106:3004/usuarios/cadastrar', data);
      Alert.alert('Sucesso', response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      if (error.response) {
        Alert.alert('Erro', error.response.data.error || 'Erro ao cadastrar.');
      } else {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[styles.roleButton, userType === 'proprietario' && styles.roleButtonSelected]}
          onPress={() => setUserType('proprietario')}
        >
          <Text style={[styles.roleButtonText, userType === 'proprietario' && styles.roleButtonTextSelected]}>
            Proprietário
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, userType === 'veterinario' && styles.roleButtonSelected]}
          onPress={() => setUserType('veterinario')}
        >
          <Text style={[styles.roleButtonText, userType === 'veterinario' && styles.roleButtonTextSelected]}>
            Veterinário
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      {userType === 'proprietario' && (
        <TextInput
          style={styles.input}
          placeholder="Nome da Propriedade"
          value={nomePropriedade}
          onChangeText={setNomePropriedade}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  roleSelector: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  roleButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#e6e6e6',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  roleButtonSelected: { backgroundColor: '#007BFF', borderColor: '#007BFF' },
  roleButtonText: { fontSize: 16, color: '#555', fontWeight: 'bold' },
  roleButtonTextSelected: { color: '#fff' },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
