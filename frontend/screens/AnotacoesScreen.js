import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import moment from 'moment';

export default function CadastroVacaScreen({ route }) {
  const vacaId = route?.params?.vacaId; // Corrige a obtenção de vacaId para evitar undefined
  const [vaca, setVaca] = useState(null);
  const [loading, setLoading] = useState(true);

  const [vacinas, setVacinas] = useState([]);
  const [mastite, setMastite] = useState({
    tipo: '', // "clinica" ou "subclinica"
    data: '',
    medicamentos: [],
    carencia: '',
    dosagem: '',
  });

  useEffect(() => {
    if (!vacaId) {
      setLoading(false);
      return;
    }

    const fetchVaca = async () => {
      try {
        const response = await axios.get(`http://192.168.1.106:3004/vacascadastro/${vacaId}`);
        setVaca(response.data);
        setVacinas(response.data.vacinas || []);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da vaca:', error);
        setLoading(false);
      }
    };
  
    fetchVaca();
  }, [vacaId]);
  
  const handleInputChange = (field, value) => {
    const updatedVaca = { ...vaca, [field]: value };
    if (field === 'dataInseminacao' && value) {
      updatedVaca.dataPrevisaoParto = moment(value, 'DD/MM/YYYY').add(283, 'days').format('DD/MM/YYYY');
    }
    setVaca(updatedVaca);
  };

  const handleVacinaChange = (index, field, value) => {
    const updatedVacinas = [...vacinas];
    updatedVacinas[index][field] = value;
    setVacinas(updatedVacinas);
  };

  const handleAddVacina = () => {
    setVacinas([...vacinas, { nome: '', data: '', carencia: '' }]);
  };

  const handleSave = async () => {
    try {
      if (mastite.tipo) {
        // Enviar informações de mastite para o backend
        await axios.post('http://192.168.1.106:3004/mastite', {
          vacaId: vaca._id, // ID da vaca
          nomeVaca: vaca.nome,
          brinco: vaca.brinco,
          data: mastite.data,
          metodoTratamento: mastite.tipo,
          medicamentos: mastite.medicamentos,
        });
        Alert.alert('Sucesso', 'Dados de mastite salvos com sucesso!');
      }

      // Salvar os dados gerais da vaca e vacinas
      await axios.put(`http://192.168.1.106:3004/vacascadastro/${vacaId}`, { ...vaca, vacinas });
      Alert.alert('Sucesso', 'Dados da vaca salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!vacaId) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Erro: ID da vaca não fornecido.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Atualizações da Vaca: {vaca?.nome || ''}</Text>

      {/* Dados Básicos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Básicos</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={vaca?.nome || ''}
          onChangeText={(value) => handleInputChange('nome', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Número do Brinco"
          value={vaca?.brinco || ''}
          onChangeText={(value) => handleInputChange('brinco', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Raça"
          value={vaca?.raca || ''}
          onChangeText={(value) => handleInputChange('raca', value)}
        />
      </View>

      {/* Inseminação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inseminação</Text>
        <TextInput
          style={styles.input}
          placeholder="Data do Cio"
          value={vaca?.dataCio || ''}
          onChangeText={(value) => handleInputChange('dataCio', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Data da Inseminação"
          value={vaca?.dataInseminacao || ''}
          onChangeText={(value) => handleInputChange('dataInseminacao', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Data Prevista de Parto"
          value={vaca?.dataPrevisaoParto || ''}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Cria"
          value={vaca?.dataCria || ''}
          onChangeText={(value) => handleInputChange('dataCria', value)}
        />
      </View>

      {/* Vacinação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vacinação</Text>
        {vacinas.map((vacina, index) => (
          <View key={index} style={styles.vacinaForm}>
            <TextInput
              style={styles.input}
              placeholder="Nome da Vacina"
              value={vacina.nome}
              onChangeText={(value) => handleVacinaChange(index, 'nome', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={vacina.data}
              onChangeText={(value) => handleVacinaChange(index, 'data', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Carência"
              value={vacina.carencia}
              onChangeText={(value) => handleVacinaChange(index, 'carencia', value)}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleAddVacina}>
          <Text style={styles.buttonText}>Adicionar Vacina</Text>
        </TouchableOpacity>
      </View>

      {/* Mastite */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mastite</Text>
        <TextInput
          style={styles.input}
          placeholder="Tipo de Mastite"
          value={mastite.tipo}
          onChangeText={(value) => setMastite({ ...mastite, tipo: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Data"
          value={mastite.data}
          onChangeText={(value) => setMastite({ ...mastite, data: value })}
        />
        <TextInput
          style={styles.input}
          placeholder="Medicamentos"
          value={mastite.medicamentos.join(', ')}
          onChangeText={(value) => setMastite({ ...mastite, medicamentos: value.split(', ') })}
        />
      </View>

      <Button title="Salvar Alterações" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, marginBottom: 10 },
  vacinaForm: { marginBottom: 15 },
  button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
