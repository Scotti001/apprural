import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function NutricionalScreen() {
  const [litrosLeite, setLitrosLeite] = useState('');
  const [pesoVaca, setPesoVaca] = useState('');
  const [faseLactacao, setFaseLactacao] = useState(''); // início, meio ou fim
  const [resultado, setResultado] = useState('');

  const calcularAlimentacao = () => {
    if (!litrosLeite || !pesoVaca || !faseLactacao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const peso = parseFloat(pesoVaca);
    const leite = parseFloat(litrosLeite);

    let concentrado = 0;

    // Determinar a proporção de concentrado com base no estágio
    if (faseLactacao === 'inicio') {
      concentrado = leite / 2.5; // 1kg para cada 2.5L de leite
    } else if (faseLactacao === 'meio') {
      concentrado = leite / 3; // 1kg para cada 3L de leite
    } else if (faseLactacao === 'fim') {
      concentrado = leite / 4; // 1kg para cada 4L de leite
    }

    // Cálculo do volumoso (60% volumoso e 40% concentrado, exemplo genérico)
    const volumoso = (peso * 0.025) - concentrado;

    setResultado(
      `Concentrado: ${concentrado.toFixed(2)} kg/dia\nVolumoso: ${volumoso.toFixed(2)} kg/dia`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrição para Vacas Leiteiras</Text>

      <TextInput
        style={styles.input}
        placeholder="Litros de leite/dia"
        keyboardType="numeric"
        value={litrosLeite}
        onChangeText={setLitrosLeite}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso da vaca (kg)"
        keyboardType="numeric"
        value={pesoVaca}
        onChangeText={setPesoVaca}
      />
      <TextInput
        style={styles.input}
        placeholder="Fase da lactação (inicio, meio, fim)"
        value={faseLactacao}
        onChangeText={setFaseLactacao}
      />

      <TouchableOpacity style={styles.button} onPress={calcularAlimentacao}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {resultado ? (
        <Text style={styles.resultado}>{resultado}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2E7D32',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#2E7D32',
    fontWeight: 'bold',
  },
});
