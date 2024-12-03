import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';

export default function MastiteScreen() {
  const [ocorrencias, setOcorrencias] = useState([]);

  // Fetch de Ocorrências no Backend
  useEffect(() => {
    const fetchOcorrencias = async () => {
      try {
        const response = await axios.get('http://localhost:3004/mastite');
        setOcorrencias(response.data);
      } catch (error) {
        console.error('Erro ao buscar ocorrências de mastite:', error);
        Alert.alert('Erro', 'Não foi possível carregar as ocorrências de mastite.');
      }
    };

    fetchOcorrencias();
  }, []);

  // Liberar a Vaca
  const liberarVaca = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3004/mastite/${id}/liberar`);
      Alert.alert('Sucesso', 'Vaca liberada com sucesso!');
      setOcorrencias((prev) =>
        prev.map((item) => (item._id === id ? { ...item, liberada: true } : item))
      );
    } catch (error) {
      console.error('Erro ao liberar a vaca:', error);
      Alert.alert('Erro', 'Não foi possível liberar a vaca.');
    }
  };

  // Renderização
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorrências de Mastite</Text>
      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.liberada ? styles.liberada : styles.emTratamento]}>
            {/* Nome da Vaca */}
            <Text style={styles.vacaNome}>
              Vaca: {item.vacaId?.nome || 'Nome não disponível'}
            </Text>

            {/* Número do Brinco */}
            <Text style={styles.text}>
              Brinco: {item.vacaId?.brinco || 'Não informado'}
            </Text>

            {/* Data formatada */}
            <Text style={styles.text}>
              Data da Ocorrência:{' '}
              {item.dataInicio ? moment(item.dataInicio).format('DD-MM-YYYY') : 'Data inválida'}
            </Text>

            {/* Tipo de Mastite */}
            <Text style={styles.text}>Tipo de Mastite: {item.tipo}</Text>

            {/* Status */}
            <Text style={styles.text}>Status: {item.liberada ? 'Liberada' : 'Em Tratamento'}</Text>

            {/* Botão para liberar a vaca */}
            {!item.liberada && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => liberarVaca(item._id)}
              >
                <Text style={styles.buttonText}>Liberar Vaca</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma ocorrência registrada.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  liberada: {
    backgroundColor: '#ffffff', // Verde claro
    borderLeftWidth: 5,
    borderLeftColor: '#28a745', // Verde escuro
  },
  emTratamento: {
    backgroundColor: '#ffffff', // Vermelho claro
    borderLeftWidth: 5,
    borderLeftColor: '#dc3545', // Vermelho escuro
  },
  vacaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
