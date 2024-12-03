import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Easing } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [opacity] = useState(new Animated.Value(0)); // Para animação de fade-in

  // Animação de fade-in para a tela de login
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (email === '' || senha === '') {
      Alert.alert('Erro', 'Email e senha são obrigatórios');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.1.106:3004/usuarios/login', { email, senha });
  
      const { token, usuario } = response.data;
      const { role } = usuario; // Pegando o role do objeto usuario
  
      console.log('Login bem-sucedido!', response.data);
  
      // Redirecionar para a tela correspondente
      if (role === 'proprietario') {
        console.log('Redirecionando para Proprietário');
        navigation.navigate('Menu');
      } else if (role === 'veterinario') {
        console.log('Redirecionando para Veterinário');
        navigation.navigate('VeterinarioHome');
      } else {
        console.error('Tipo de usuário desconhecido:', role);
        Alert.alert('Erro', 'Tipo de usuário desconhecido');
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro no login:', error.response.data);
        Alert.alert('Erro', error.response.data.error || 'Erro no login');
      } else {
        console.error('Erro ao conectar ao servidor:', error);
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
    }
  };
  


  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.title}>Bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroScreen')}>
        <Text style={styles.link}>Não tenho cadastro</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
