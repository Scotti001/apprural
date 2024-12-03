import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';

export default function EntregaLeiteScreen() {
  const [data, setData] = useState(moment().format('YYYY-MM-DD')); // Data atual
  const [litros, setLitros] = useState('');
  const [entregas, setEntregas] = useState([]);
  const [totalLitros, setTotalLitros] = useState(0);
  const [comparacao, setComparacao] = useState('');

  // Carregar entregas ao montar o componente
  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/entregas');
        setEntregas(response.data);
        calcularTotais(response.data);
      } catch (error) {
        console.error('Erro ao buscar entregas:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados de entrega.');
      }
    };

    fetchEntregas();
  }, []);

  // Calcular totais e comparação
  const calcularTotais = (dados) => {
    const totalAtual = dados
      .filter((entrega) => moment(entrega.data).isSame(moment(), 'month'))
      .reduce((sum, entrega) => sum + entrega.litros, 0);

    const totalAnterior = dados
      .filter((entrega) =>
        moment(entrega.data).isSame(moment().subtract(1, 'month'), 'month')
      )
      .reduce((sum, entrega) => sum + entrega.litros, 0);

    setTotalLitros(totalAtual);
    setComparacao(
      totalAnterior > 0
        ? `Produção ${((totalAtual / totalAnterior) * 100 - 100).toFixed(2)}% ${
            totalAtual > totalAnterior ? 'maior' : 'menor'
          } que o mês anterior.`
        : 'Sem dados do mês anterior para comparação.'
    );
  };

  // Adicionar uma nova entrega
  const handleAdicionarEntrega = async () => {
    if (!litros || isNaN(litros)) {
      Alert.alert('Erro', 'Informe uma quantidade válida de litros.');
      return;
    }

    try {
      const novaEntrega = { data, litros: parseFloat(litros) };
      await axios.post('http://localhost:3006/entregas', novaEntrega);

      const atualizadas = [...entregas, novaEntrega];
      setEntregas(atualizadas);
      calcularTotais(atualizadas);
      setLitros('');
      Alert.alert('Sucesso', 'Entrega adicionada com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar entrega:', error);
      Alert.alert('Erro', 'Não foi possível salvar a entrega.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Entrega de Leite</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Data da Entrega:</Text>
        <TextInput
          style={styles.input}
          value={data}
          onChangeText={setData}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Quantidade de Litros:</Text>
        <TextInput
          style={styles.input}
          value={litros}
          onChangeText={setLitros}
          keyboardType="numeric"
          placeholder="Digite os litros"
        />

        <TouchableOpacity style={styles.button} onPress={handleAdicionarEntrega}>
          <Text style={styles.buttonText}>Adicionar Entrega</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <Text style={styles.totalText}>Total do Mês: {totalLitros} litros</Text>
        <Text style={styles.comparacaoText}>{comparacao}</Text>
      </View>

      <Text style={styles.historyTitle}>Histórico de Entregas</Text>
      <FlatList
        data={entregas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.entregaItem}>
            <Text style={styles.entregaText}>Data: {item.data}</Text>
            <Text style={styles.entregaText}>Litros: {item.litros}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma entrega cadastrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#1e88e5' },
  form: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1e88e5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  summary: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#1e88e5' },
  comparacaoText: { fontSize: 16, color: '#333' },
  historyTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#1e88e5' },
  entregaItem: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  entregaText: { fontSize: 16, color: '#333' },
  emptyMessage: { textAlign: 'center', color: '#757575', fontSize: 16, marginTop: 20 },
});
