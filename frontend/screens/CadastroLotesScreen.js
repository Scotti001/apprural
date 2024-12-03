import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

export default function CadastroLotesScreen({ navigation }) {
  const [lotes, setLotes] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  // Buscar lotes ao carregar a tela
  useEffect(() => {
    const fetchLotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/lotes'); // URL da API para buscar lotes
        setLotes(response.data); // Atualiza o estado com os lotes
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os lotes. Tente novamente mais tarde.');
      }
    };

    fetchLotes();
  }, []);

  // Cadastrar um novo lote
  const handleCadastro = async () => {
    try {
      const response = await axios.post('http://localhost:3000/lotes', {
        nome: nome || `Lote ${lotes.length + 1}`,
        descricao,
      });
      Alert.alert('Sucesso', 'Lote cadastrado com sucesso!');
      setLotes([...lotes, response.data]); // Atualiza a lista de lotes
      setNome('');
      setDescricao('');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar lote. Tente novamente mais tarde.');
    }
  };

  // Navegar para a tela de vacas no lote selecionado
  const handleLoteClick = (lote) => {
    navigation.navigate('VacasNoLoteScreen', { loteId: lote._id, loteNome: lote.nome }); // Altere para o nome correto da sua tela
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Lotes</Text>

      {/* Lista de Lotes */}
      <FlatList
        data={lotes}
        keyExtractor={(item) => item._id} // Certifique-se de que "_id" está no retorno da API
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.loteItem}
            onPress={() => handleLoteClick(item)}
          >
            <Text style={styles.loteText}>{item.nome}</Text>
            <Text style={styles.loteDescricao}>{item.descricao}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum lote cadastrado.</Text>}
      />

      {/* Formulário para Novo Lote */}
      <TextInput
        style={styles.input}
        placeholder="Nome do Lote"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Novo Lote</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  loteItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  loteText: { fontSize: 18, fontWeight: 'bold' },
  loteDescricao: { fontSize: 14, color: '#555' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
});
