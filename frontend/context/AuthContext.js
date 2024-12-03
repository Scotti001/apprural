import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Criação do contexto de autenticação
export const AuthContext = createContext();

// Provider do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para simular o login e armazenar o token
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://192.168.0.107:3004/auth/login', {
        username,
        password,
      });
      const { token, userData } = response.data;

      await AsyncStorage.setItem('userToken', token);
      setUser(userData);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas.');
    }
  };

  // Função para simular o logout e remover o token
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Verificar se o usuário já está logado ao carregar o componente
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Realizar validação do token se necessário
          setUser({ token }); // Aqui, você pode carregar os dados do usuário a partir do token ou fazer outra lógica de validação
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Retornar o provider com as informações e funções de autenticação
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? (
        <></> // Pode ser um indicador de carregamento ou tela em branco enquanto verifica a autenticação
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
