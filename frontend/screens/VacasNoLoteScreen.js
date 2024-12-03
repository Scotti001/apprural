import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function VacasNoLoteScreen({ route }) {
  const { loteId, loteNome } = route.params;
  const [vacas, setVacas] = useState([]);

  useEffect(() => {
    const fetchVacas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/vacas?loteId=${loteId}`); // Altere a URL para sua API
        setVacas(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as vacas deste lote.');
      }
    };

    fetchVacas();
  }, [loteId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vacas no {loteNome}</Text>
      <FlatList
        data={vacas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.vacaItem}>
            <Text style={styles.vacaText}>{item.nome}</Text>
            <Text style={styles.vacaDescricao}>Brinco: {item.brinco}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma vaca cadastrada neste lote.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  vacaItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderColor: '#ddd', borderWidth: 1 },
  vacaText: { fontSize: 18, fontWeight: 'bold' },
  vacaDescricao: { fontSize: 14, color: '#555' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
});
