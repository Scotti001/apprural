import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function ControleLeiteiro({ navigation }) {
  const [vacas, setVacas] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Função para buscar vacas do backend
  useEffect(() => {
    const fetchVacas = async () => {
      try {
        const response = await axios.get('http://192.168.1.106:3004/animais');
        setVacas(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as vacas.');
        console.error('Erro ao buscar vacas:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVacas();
  }, []);

  // Filtra as vacas com base na pesquisa
  const filteredVacas = vacas.filter((vaca) =>
    vaca.nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <SearchBar search={search} setSearch={setSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#28a745" style={styles.loader} />
      ) : (
        <VacaList vacas={filteredVacas} navigation={navigation} />
      )}
    </View>
  );
}

// Subcomponente: Cabeçalho
const Header = ({ navigation }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.navigate('CadastroVacas')}>
      <Text style={styles.buttonText}>Cadastrar Vacas/Novilhas/Bezerras</Text>
    </TouchableOpacity>
  </View>
);

// Subcomponente: Barra de Pesquisa
const SearchBar = ({ search, setSearch }) => (
  <TextInput
    style={styles.searchInput}
    placeholder="Pesquisar por nome..."
    value={search}
    onChangeText={setSearch}
  />
);

// Subcomponente: Lista de Vacas
const VacaList = ({ vacas, navigation }) => (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    {vacas.length > 0 ? (
      vacas.map((vaca) => <VacaCard key={vaca._id} vaca={vaca} navigation={navigation} />)
    ) : (
      <Text style={styles.noResults}>Nenhuma vaca encontrada. Tente outro nome.</Text>
    )}
  </ScrollView>
);

// Subcomponente: Cartão de uma vaca
const VacaCard = ({ vaca, navigation }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Image source={{ uri: vaca.imagem || 'https://via.placeholder.com/100' }} style={styles.image} />
      <View style={styles.vacaInfo}>
        <Text style={styles.vacaName}>{vaca.nome}</Text>
        <Text style={styles.vacaDetails}>Raça: {vaca.raca || 'Desconhecida'}</Text>
        <Text style={styles.vacaDetails}>Idade: {calcularIdadeEmDias(vaca.dataNascimento)} dias</Text>
        <Text style={styles.vacaDetails}>Lactações: {vaca.lactacoes || 'N/A'}</Text>
      </View>
    </View>
    <View style={styles.cardBody}>
      <Text style={styles.vacaDetails}>Último parto: {vaca.ultimoParto || '---'}</Text>
      <Text style={styles.vacaDetails}>Inseminada: {vaca.inseminada ? 'Sim' : 'Não'}</Text>
      <Text style={styles.vacaDetails}>Previsão de parto: {vaca.previsaoParto || '---'}</Text>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity
        style={[styles.actionButton, styles.primaryButton]}
        onPress={() => navigation.navigate('AnotacoesScreen', { vacaId: vaca._id })}
      >
        <Text style={styles.actionButtonText}>Anotações e Pesagem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.secondaryButton]}
        onPress={() => navigation.navigate('FichaVaca', { vacaId: vaca._id })}
      >
        <Text style={styles.actionButtonText}>Ver Ficha</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Função para calcular a idade em dias
const calcularIdadeEmDias = (dataNascimento) => {
  if (!dataNascimento) return '---';
  const dataAtual = new Date();
  const nascimento = new Date(dataNascimento);
  if (isNaN(nascimento)) return '---';
  const diferencaEmMilissegundos = dataAtual - nascimento;
  return Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#28a745',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchInput: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  scrollViewContent: {
    padding: 10,
  },
  loader: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  vacaInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  vacaName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  vacaDetails: {
    fontSize: 14,
    color: '#333',
  },
  cardBody: {
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007BFF',
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    marginTop: 20,
  },
});
