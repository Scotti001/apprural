import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Criação do contexto de autenticação
export const AuthContext = createContext();

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função de login
  const login = async (username, password) => {
    try {
      // Requisição para o backend para autenticar o usuário
      const response = await axios.post('http://192.168.0.107:3004/auth/login', {
        username,
        password,
      });
      const { token, userData } = response.data;

      // Armazena o token no AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      setUser(userData); // Define os dados do usuário autenticado
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      // Remove o token do AsyncStorage
      await AsyncStorage.removeItem('userToken');
      setUser(null); // Define o usuário como null após logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Checar o status do login quando o app inicia
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Obtém o token armazenado
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Opcional: validar o token no backend antes de definir o usuário
          setUser({ token }); // Define os dados do usuário caso o token exista
        }
      } catch (error) {
        console.error('Erro ao checar status de login:', error);
      } finally {
        setLoading(false); // Para de exibir o estado de carregamento
      }
    };

    checkLoginStatus();
  }, []);

  // Retornar o provider que envolve o app
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? (
        <></> // Pode ser substituído por um indicador de carregamento enquanto verifica o login
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
