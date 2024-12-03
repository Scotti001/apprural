import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProducaoScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.header}>Produção</Text>

      {/* Linha 1 */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('OrdenhaPesagem')}
          accessible={true}
          accessibilityLabel="Ordenha e Pesagem do Leite"
        >
          <Text style={styles.boxText}>ORDENHA PESAGEM DO LEITE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('EntregaLeite')}
          accessible={true}
          accessibilityLabel="Entrega do Leite"
        >
          <Text style={styles.boxText}>ENTREGA DO LEITE</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 2 */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Secagem')}
          accessible={true}
          accessibilityLabel="Secagem"
        >
          <Text style={styles.boxText}>SECAGEM</Text>
        </TouchableOpacity>
        
      </View>

      {/* Linha 3 */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('QualidadeLeiteGeral')}
          accessible={true}
          accessibilityLabel="Qualidade do Leite Geral"
        >
          <Text style={styles.boxText}>QUALIDADE DO LEITE GERAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('InducaoLactacao')}
          accessible={true}
          accessibilityLabel="Indução de Lactação"
        >
          <Text style={styles.boxText}>INDUÇÃO DE LACTAÇÃO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', // Fundo verde claro
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#1B5E20', // Verde escuro
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  box: {
    width: '45%', // Botões ocupam 45% da largura da tela
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1E88E5', // Azul para botões
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
});
