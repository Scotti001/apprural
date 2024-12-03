import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard'; // Use este pacote para copiar para a área de transferência
import axios from 'axios';

export default function PropriedadeScreen({ route, navigation }) {
  const { propriedadeId } = route.params || {}; // Garante que o parâmetro não seja undefined
  const [linkPropriedade, setLinkPropriedade] = useState('');
  const [veterinarios, setVeterinarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca os detalhes da propriedade e os veterinários conectados
  useEffect(() => {
    if (!propriedadeId) {
      Alert.alert('Erro', 'ID da propriedade não fornecido.');
      navigation.goBack(); // Volta para a tela anterior
      return;
    }

    const fetchPropriedade = async () => {
      try {
        const response = await axios.get(`http://192.168.1.106:3004/propriedade/${propriedadeId}`);
        setLinkPropriedade(response.data.link); // Assume que a API retorna o link
        setVeterinarios(response.data.veterinarios || []); // Assume que a API retorna os veterinários conectados
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os detalhes da propriedade.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropriedade();
  }, [propriedadeId]);

  const handleCopyLink = () => {
    Clipboard.setString(linkPropriedade);
    Alert.alert('Sucesso', 'Link copiado para a área de transferência.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Propriedade</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          {/* Exibição do Link */}
          <View style={styles.linkContainer}>
            <Text style={styles.linkLabel}>Link da Propriedade:</Text>
            <Text style={styles.linkText}>{linkPropriedade}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
              <Text style={styles.copyButtonText}>Copiar Link</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Veterinários */}
          <Text style={styles.sectionTitle}>Veterinários Conectados:</Text>
          {veterinarios.length > 0 ? (
            veterinarios.map((vet) => (
              <View key={vet._id} style={styles.veterinarioItem}>
                <Text style={styles.veterinarioName}>{vet.nome}</Text>
                <Text style={styles.veterinarioEmail}>{vet.email}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noVeterinariosText}>Nenhum veterinário conectado ainda.</Text>
          )}
        </>
      )}
    </View>
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
    textAlign: 'center',
  },
  linkContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  linkLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  linkText: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 10,
  },
  copyButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  veterinarioItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  veterinarioName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  veterinarioEmail: {
    fontSize: 14,
    color: '#555',
  },
  noVeterinariosText: {
    textAlign: 'center',
    color: '#777',
  },
});
