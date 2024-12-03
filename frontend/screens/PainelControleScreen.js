import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function PainelControleScreen({ navigation }) {
  const [dadosPainel, setDadosPainel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchDadosPainel = async () => {
      try {
        const response = await axios.get('http://192.168.1.106:3000/painel'); // Substitua pelo seu endpoint da API
        setDadosPainel(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados do painel:', error);
        setLoading(false);
      }
    };

    fetchDadosPainel();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Carregando dados do painel...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Painel Reprodutivo</Text>

      <View style={styles.card}>
        {dadosPainel ? (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Em Lactação</Text>
              <Text style={styles.value}>{dadosPainel.emLactacao}</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerLactacao')}>
                <Text style={styles.buttonText}>Ordenhar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Para Inseminar</Text>
              <Text style={styles.value}>{dadosPainel.paraInseminar}</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerInseminar')}>
                <Text style={styles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Inseminadas</Text>
              <Text style={styles.value}>{dadosPainel.inseminadas}</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerInseminadas')}>
                <Text style={styles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Ultrassom/Toque</Text>
              <Text style={styles.value}>{dadosPainel.ultrassomToque}</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerUltrassom')}>
                <Text style={styles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Prenhas</Text>
              <Text style={styles.value}>{dadosPainel.prenhas}</Text>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VerPrenhas')}>
                <Text style={styles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Para Secar</Text>
              <Text style={styles.value}>{dadosPainel.paraSecar}</Text>
              <TouchableOpacity style={[styles.button, styles.disabled]}>
                <Text style={styles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Animais Secos</Text>
              <Text style={styles.value}>{dadosPainel.animaisSecos}</Text>
              <TouchableOpacity style={[styles.button, styles.disabled]}>
                <Text style={styles.buttonText}>Ver</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Bezerras</Text>
              <Text style={styles.value}>{dadosPainel.bezerras}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Novilhas</Text>
              <Text style={styles.value}>{dadosPainel.novilhas}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Total de Animais</Text>
              <Text style={[styles.value, styles.total]}>{dadosPainel.totalAnimais}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.errorText}>Erro ao carregar os dados</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#d4d4d4',
  },
  total: {
    color: '#28a745',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
});
