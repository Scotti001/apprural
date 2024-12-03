import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CadastroScreen() {
  const navigation = useNavigation(); // Usa o hook para acessar o objeto de navegação

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.box, styles.cadastro]} onPress={() => navigation.navigate('CadastroVacas')}>
          <Text style={styles.boxText}>ANIMAL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box, styles.cadastro]}onPress={() => navigation.navigate('CadastroLotes')}>
          <Text style={styles.boxText}>LOTES</Text>
        </TouchableOpacity>
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFFEF5',
    padding: 20,
  },
  header: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#5A8B6D',
    // Relevo
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 2, height: 4 }, // Deslocamento da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 3, // Suavidade da sombra
    elevation: 5, // Para Android
  },
  largeBox: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2E7D32',
    marginTop: 10,
    // Relevo
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  boxText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
});
