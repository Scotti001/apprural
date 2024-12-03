import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function VeterinarioHome({ route, navigation }) {
  const { veterinarioId } = route.params || {}; // Certifique-se de que o parâmetro é recebido
  const [propriedades, setPropriedades] = useState([]);
  const [codigoConvite, setCodigoConvite] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Estado para o carregamento inicial

  // Carregar propriedades no início
  useEffect(() => {
    const fetchPropriedades = async () => {
      if (!veterinarioId) {
        Alert.alert('Erro', 'ID do veterinário não encontrado.');
        setIsFetching(false);
        return;
      }
      try {
        const response = await axios.get(`http://192.168.1.106:3004/veterinario/${veterinarioId}/propriedades`);
        setPropriedades(response.data.propriedades || []);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar propriedades.');
      } finally {
        setIsFetching(false);
      }
    };
    fetchPropriedades();
  }, [veterinarioId]);

  // Adicionar propriedade pelo código de convite
  const handleAdicionarPropriedade = async () => {
    if (!codigoConvite) {
      Alert.alert('Erro', 'O código de convite é obrigatório.');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.1.106:3004/veterinario/adicionarPropriedade', {
        veterinarioId,
        codigoConvite,
      });
      setPropriedades((prev) => [...prev, response.data.propriedade]);
      Alert.alert('Sucesso', 'Propriedade adicionada com sucesso!');
      setCodigoConvite('');
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao adicionar propriedade.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard do Veterinário</Text>

      {/* Entrada do Código de Convite */}
      <TextInput
        style={styles.input}
        placeholder="Insira o código de convite"
        value={codigoConvite}
        onChangeText={setCodigoConvite}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdicionarPropriedade} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Adicionando...' : 'Adicionar Propriedade'}</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Propriedades Vinculadas</Text>

      {isFetching ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : propriedades.length === 0 ? (
        <Text style={styles.noPropriedadesText}>Nenhuma propriedade vinculada.</Text>
      ) : (
        <FlatList
          data={propriedades}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.propriedadeItem}
              onPress={() => navigation.navigate('Rebanho', { propriedadeId: item.id })}
            >
              <Text style={styles.propriedadeText}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 20 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  propriedadeItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10 },
  propriedadeText: { fontSize: 16, fontWeight: 'bold' },
  noPropriedadesText: { fontSize: 16, textAlign: 'center', color: '#777' },
});
