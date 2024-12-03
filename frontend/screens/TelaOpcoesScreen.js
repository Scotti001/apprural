import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.box, styles.cadastro]}onPress={() => navigation.navigate('OpcoesCadastro')}>
          <Text style={styles.boxText}>CADASTRO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, styles.rebanho]}onPress={() => navigation.navigate('ControleLeiteiro')}>
          <Text style={styles.boxText}>REBANHO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, styles.genetica]}>
          <Text style={styles.boxText}>GENÉTICA</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.box, styles.reproducao]}>
          <Text style={styles.boxText}>REPRODUÇÃO</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, styles.producao]} onPress={() => navigation.navigate('Producao')}>
          <Text style={styles.boxText}>PRODUÇÃO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.box, styles.sanitario]}
          onPress={() => navigation.navigate('Sanitario')}
        >
          <Text style={styles.boxText}>SANITÁRIO</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.box, styles.financeiro]}>
          <Text style={styles.boxText}>FINANCEIRO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, styles.estoque]}onPress={() => navigation.navigate('AddVeterinario')}>
          <Text style={styles.boxText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, styles.nutricao]} onPress={() => navigation.navigate('CalculoNutricao')}>
          <Text style={styles.boxText}>NUTRIÇÃO</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.relatorios}>
        <Text style={styles.relatoriosText}>RELATÓRIOS</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFFEF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    // Relevo para as caixas
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cadastro: { backgroundColor: '#44B670' },
  rebanho: { backgroundColor: '#1A6637' },
  genetica: { backgroundColor: '#2ECC6B' },
  reproducao: { backgroundColor: '#1A6637' },
  producao: { backgroundColor: '#2ECC6B' },
  sanitario: { backgroundColor: '#44B670' },
  financeiro: { backgroundColor: '#2ECC6B' },
  estoque: { backgroundColor: '#44B670' },
  nutricao: { backgroundColor: '#1A6637' },
  relatorios: {
    width: '90%',
    height: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 15,
    // Relevo para relatórios
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  relatoriosText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cadastrarButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#00E5FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // Relevo para o botão cadastrar
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cadastrarText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
