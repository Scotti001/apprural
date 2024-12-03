import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function RebanhoScreen({ route }) {
  const { propriedadeId } = route.params;
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const response = await axios.get(`http://192.168.1.106:3004/propriedades/${propriedadeId}/animais`);
        setAnimais(response.data.animais);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os animais.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimais();
  }, [propriedadeId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Animais</Text>
      <FlatList
        data={animais}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.animalItem}>
            <Text style={styles.animalName}>Nome: {item.nome}</Text>
            <Text style={styles.animalInfo}>Raça: {item.raca}</Text>
            <Text style={styles.animalInfo}>Idade: {calcularIdade(item.dataNascimento)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return '---';
  const diff = Date.now() - new Date(dataNascimento).getTime();
  return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 365))} anos`;
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  animalItem: { padding: 15, marginBottom: 10, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  animalName: { fontSize: 18, fontWeight: 'bold' },
  animalInfo: { fontSize: 14, color: '#555' },
});
