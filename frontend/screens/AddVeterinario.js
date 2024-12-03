import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Clipboard, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function PropriedadeScreen({ route, navigation }) {
  const { propriedadeId } = route.params; // ID da propriedade
  const [conviteCodigo, setConviteCodigo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropriedade = async () => {
      try {
        const response = await axios.get(`http://192.168.1.106:3004/propriedades/${propriedadeId}`);
        setConviteCodigo(response.data.propriedade.conviteCodigo);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar os detalhes da propriedade.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropriedade();
  }, [propriedadeId]);

  const handleCopyCodigoConvite = () => {
    Clipboard.setString(conviteCodigo);
    Alert.alert('Sucesso', 'Código de convite copiado para a área de transferência.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Propriedade</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <View style={styles.linkContainer}>
          <Text style={styles.linkLabel}>Código de Convite:</Text>
          <Text style={styles.linkText}>{conviteCodigo}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyCodigoConvite}>
            <Text style={styles.copyButtonText}>Copiar Código</Text>
          </TouchableOpacity>
        </View>
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
});
