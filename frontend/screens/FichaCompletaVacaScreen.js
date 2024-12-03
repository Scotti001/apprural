import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import {Picker, Button, Image } from 'react-native';
import axios from 'axios';

export default function FichaCompletaVaca({ route }) {
  const { vacaId } = route.params; // ID da vaca passada via navegação
  const [vaca, setVaca] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vacina, setVacina] = useState('');
  const [dataVacina, setDataVacina] = useState('');
  const [vacinas, setVacinas] = useState([]);

  // Busca os dados da vaca do backend
  useEffect(() => {
    const fetchVacaData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.106:3004/vacascadastro/${vacaId}`); // Substitua pelo seu IP
        setVaca(response.data);
        setVacinas(response.data.vacinas || []); // Inicializa o campo de vacinas
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados da vaca:', error);
        setLoading(false);
      }
    };

    fetchVacaData();
  }, [vacaId]);

  // Função para adicionar uma nova vacina
  const adicionarVacina = () => {
    if (vacina && dataVacina) {
      const novaVacina = { tipo: vacina, data: dataVacina };
      setVacinas([...vacinas, novaVacina]);
      setVacina('');
      setDataVacina('');
    }
  };

  // Função para salvar as vacinas no banco de dados
  const salvarVacinas = async () => {
    try {
      await axios.put(`http://192.168.1.106:3000/vacas/${vacaId}`, {
        ...vaca,
        vacinas,
      });
      alert('Vacinas salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar as vacinas:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Carregando dados da vaca...</Text>
      </View>
    );
  }

  return (
    
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ficha Completa da Vaca: {vaca?.nome}</Text>
      {/* Foto da Vaca */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
        <Button title="Adicionar Foto" onPress={() => {}} />
      </View>

      <View style={styles.table}>
        <Text style={styles.label}>ID da Vaca: {vaca?._id || '-'}</Text>
        <Text style={styles.label}>Nome da Vaca: {vaca?.nome || '-'}</Text>
        <Text style={styles.label}>Número do Brinco: {vaca?.brinco || '-'}</Text>
        <Text style={styles.label}>Raça: {vaca?.raca || '-'}</Text>
        <Text style={styles.label}>Data de Nascimento: {vaca?.data_nascimento || '-'}</Text>
        <Text style={styles.label}>Pai: {vaca?.pai || '-'}</Text>
        <Text style={styles.label}>Mãe: {vaca?.mae || '-'}</Text>
        <Text style={styles.label}>Data de Cio: {vaca?.dataCio || '-'}</Text>
        <Text style={styles.label}>Data de Inseminação: {vaca?.dataInseminacao || '-'}</Text>
        <Text style={styles.label}>Touro Utilizado: {vaca?.touroUtilizado || '-'}</Text>
        <Text style={styles.label}>Data de Previsão de Parto: {vaca?.dataPrevisaoParto || '-'}</Text>
        <Text style={styles.label}>Data de Cria: {vaca?.dataCria || '-'}</Text>
        <Text style={styles.label}>Sexo do Bezerro: {vaca?.sexoBezerro || '-'}</Text>
        <Text style={styles.label}>Observações: {vaca?.observacoes || '-'}</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AnotacoesScreen')}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Exibir vacinas da vaca */}
      <Text style={styles.title}>Vacinas Aplicadas:</Text>
      {vacinas.length > 0 ? (
        vacinas.map((vacina, index) => (
          <View key={index} style={styles.vacinaRow}>
            <Text style={styles.vacinaText}>Vacina: {vacina.tipo} - Data: {vacina.data}</Text>
          </View>
        ))
      ) : (
        <Text>Nenhuma vacina registrada.</Text>
      )}

      {/* Adicionar nova vacina */}
      <View style={styles.table}>
        <Text style={styles.label}>Adicionar Nova Vacina</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da Vacina"
          value={vacina}
          onChangeText={setVacina}
        />
        <TextInput
          style={styles.input}
          placeholder="Data da Vacina (DD/MM/AAAA)"
          value={dataVacina}
          onChangeText={setDataVacina}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarVacina}>
          <Text style={styles.addButtonText}>Adicionar Vacina</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={salvarVacinas}>
        <Text style={styles.saveButtonText}>Salvar Vacinas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  vacinaRow: {
    marginBottom: 10,
  },
  vacinaText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
