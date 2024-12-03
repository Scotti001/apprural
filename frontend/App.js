import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthProvider'; 
import LoginScreen from './screens/LoginScreen';
import CadastroVacasScreen from './screens/CadastroVacasScreen';
import ControleLeiteiro from './screens/ControleLeiteiro';
import FichaVacaScreen from './screens/FichaVacaScreen';
import AnotacoesScreen from './screens/AnotacoesScreen'; 
import PainelControleScreen from './screens/PainelControleScreen';
import FichaCompletaVaca from './screens/FichaCompletaVacaScreen';
import MenuScreen from './screens/TelaOpcoesScreen';
import SanitarioScreen from './screens/SanitarioScreen';
import ProducaoScreen from './screens/ProducaoScreen';
import CadastroScreen from './screens/OpcoesCadastroScreen';
import CadastroMedicamentosScreen from './screens/CadastroMedicamentosScreeen'; 
import CadastroLotesScreen from './screens/CadastroLotesScreen';
import logo from './screens/iniciarScreen';
import EntregaLeiteScreen from './screens/TelasPainelProducao/EntregaLeiteScreen';
import InducaoLactacaoScreen from './screens/TelasPainelProducao/InducaoLactacaoScreen';
import OrdenhaPesagemScreen from './screens/TelasPainelProducao/OrdenhaPesagemScreen';
import QualidadeLeiteGeralScreen from './screens/TelasPainelProducao/QualidadeLeiteGeral';
import SecagemScreen from './screens/TelasPainelProducao/SecagemScreen';
import ProducaoAlimentacaoScreen from './screens/CalculoNutricao';
import CadastroUsuarioScreen from './screens/CadastroUsuarioScreen';
import VacasNoLoteScreen from './screens/VacasNoLoteScreen';
import OcorrenciaMastite from './screens/TelasPainelSanitario/OcorrenciaMastite';
import ProprietarioHome from './screens/ProprietarioHome';
import VeterinarioHome from './screens/VeterinarioHome';
import AddVeterinario from './screens/AddVeterinario';
import PropriedadeScreen from './screens/AddVeterinario';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Iniciar">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CadastroScreen" component={CadastroUsuarioScreen} options={{ title: 'Cadastro' }} />
          <Stack.Screen name="Iniciar" component={logo} options={{ headerShown: false }} />
          <Stack.Screen name="CadastroVacas" component={CadastroVacasScreen} options={{ title: 'Cadastrar Vacas' }} />
          <Stack.Screen name="VacasNoLoteScreen" component={VacasNoLoteScreen} options={{ title: 'Vacas no Lote' }} />
          <Stack.Screen name="ControleLeiteiro" component={ControleLeiteiro} options={{ title: 'Controle Leiteiro' }} />
          <Stack.Screen name="ProprietarioHome" component={ProprietarioHome} />
          <Stack.Screen name="VeterinarioHome" component={VeterinarioHome} />
          <Stack.Screen name="Producao" component={ProducaoScreen} options={{ title: 'Painel Produção' }} />
          <Stack.Screen name="OpcoesCadastro" component={CadastroScreen} options={{ title: 'Painel Opções de Cadastro' }} />
          <Stack.Screen name="CadastroLotes" component={CadastroLotesScreen} options={{ title: 'Cadastro de Lotes' }} />
          <Stack.Screen name="CadastroMedicamentos" component={CadastroMedicamentosScreen} options={{ title: 'Cadastro de Medicamentos' }} />
          <Stack.Screen name="OcorrenciaMastite" component={OcorrenciaMastite} options={{ title: 'Ocorrência Mastite' }} />
          <Stack.Screen name="FichaVaca" component={FichaVacaScreen} options={{ title: 'Ficha da Vaca' }} />
          <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu Opções' }} />
          <Stack.Screen name="Sanitario" component={SanitarioScreen} options={{ title: 'Menu Opções Sanitário' }} />
          <Stack.Screen name="AnotacoesScreen" component={AnotacoesScreen} options={{ title: 'Anotações e Pesagens' }} />
          <Stack.Screen name="PainelControle" component={PainelControleScreen} options={{ title: 'Painel Controle' }} />
          <Stack.Screen name="FichaCompletaVaca" component={FichaCompletaVaca} />
          <Stack.Screen name="OrdenhaPesagem" component={OrdenhaPesagemScreen} />
          <Stack.Screen name="EntregaLeite" component={EntregaLeiteScreen} />
          <Stack.Screen name="Secagem" component={SecagemScreen} />
          <Stack.Screen name="QualidadeLeiteGeral" component={QualidadeLeiteGeralScreen} />
          <Stack.Screen name="InducaoLactacao" component={InducaoLactacaoScreen} />
          <Stack.Screen name="AddVeterinario" component={AddVeterinario} />
          <Stack.Screen name="PropriedadeScreen" component={PropriedadeScreen} options={{ title: 'Detalhes da Propriedade' }}
/>

          <Stack.Screen name="CalculoNutricao" component={ProducaoAlimentacaoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
