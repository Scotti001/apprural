import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrdenhaPesagemScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Ordenha e Pesagem do Leite</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
