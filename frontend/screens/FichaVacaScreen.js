import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Picker, Button, Image } from 'react-native';

export default function FichaVacaScreen() {
  const [nomeAnimal, setNomeAnimal] = useState('');
  const [numero, setNumero] = useState('');
  const [registro, setRegistro] = useState('');
  const [escoreCorporal, setEscoreCorporal] = useState('');
  const [raca, setRaca] = useState('');
  const [grupo, setGrupo] = useState('Bovinos de Leite');
  const [situacaoReprodutiva, setSituacaoReprodutiva] = useState('');
  const [diasGestacao, setDiasGestacao] = useState('');
  const [dataPrevistaParto, setDataPrevistaParto] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [idadeAnimal, setIdadeAnimal] = useState('');
  const [sexo, setSexo] = useState('Fêmea');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ficha do Animal</Text>

      {/* Foto da Vaca */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />
        <Button title="Adicionar Foto" onPress={() => {}} />
      </View>

      {/* Campos de Informações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Gerais</Text>
        <TextInput style={styles.input} placeholder="Nome do Animal" value={nomeAnimal} onChangeText={setNomeAnimal} />
        <TextInput style={styles.input} placeholder="Número" value={numero} onChangeText={setNumero} />
        <TextInput style={styles.input} placeholder="Registro" value={registro} onChangeText={setRegistro} />
        <TextInput style={styles.input} placeholder="Raça" value={raca} onChangeText={setRaca} />
        <TextInput style={styles.input} placeholder="Escore Corporal" value={escoreCorporal} onChangeText={setEscoreCorporal} />
        <Picker selectedValue={sexo} style={styles.input} onValueChange={(itemValue) => setSexo(itemValue)}>
          <Picker.Item label="Fêmea" value="femea" />
          <Picker.Item label="Macho" value="macho" />
        </Picker>
        <TextInput style={styles.input} placeholder="Nascimento" value={nascimento} onChangeText={setNascimento} />
        <TextInput style={styles.input} placeholder="Idade do Animal" value={idadeAnimal} onChangeText={setIdadeAnimal} />
        <Picker selectedValue={grupo} style={styles.input} onValueChange={(itemValue) => setGrupo(itemValue)}>
          <Picker.Item label="Bovinos de Leite" value="bovinosLeite" />
        </Picker>
      </View>

      {/* Situação Reprodutiva */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Situação Reprodutiva</Text>
        <TextInput style={styles.input} placeholder="Situação Reprodutiva" value={situacaoReprodutiva} onChangeText={setSituacaoReprodutiva} />
        <TextInput style={styles.input} placeholder="Dias de Gestação" value={diasGestacao} onChangeText={setDiasGestacao} />
        <TextInput style={styles.input} placeholder="Data Prevista para o Parto" value={dataPrevistaParto} onChangeText={setDataPrevistaParto} />
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionButtons}>
        <Button title="Confirmar" onPress={() => {}} />
        <Button title="Cancelar" color="red" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
