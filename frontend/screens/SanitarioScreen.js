import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SanitarioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sanitário</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('MedicacoesVacinas')}
        >
          <Text style={styles.boxText}>MEDICAÇÕES E VACINAS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Exames')}
        >
          <Text style={styles.boxText}>EXAMES</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('CalendarioSanitario')}
        >
          <Text style={styles.boxText}>CALENDÁRIO SANITÁRIO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Protocolos')}
        >
          <Text style={styles.boxText}>PROTOCOLOS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('AplicacaoProtocolos')}
        >
          <Text style={styles.boxText}>APLICAÇÃO DE PROTOCOLOS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('OcorrenciaMastite')}
        >
          <Text style={styles.boxText}>OCORRÊNCIA DE MASTITE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Verde claro para o fundo
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#2E7D32', // Verde escuro para o texto
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  box: {
    width: 160,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#4CAF50', // Verde médio para os botões
    elevation: 5, // Sombra para destacar os botões
  },
  boxText: {
    color: '#FFFFFF', // Texto branco
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
});
