import { View, Image } from 'react-native'; // Adicionando a importação de Text
import React from 'react';
import HomeScreen from './src/pages/home/HomeScreen';
import CadastroClienteScreen from './src/pages/cadastro_cliente/CadastroClienteScreen';
import ListarClientesScreen from './src/pages/listar_cliente/ListaClientesScreen';
import DetalhesClienteScreen from './src/pages/listar_cliente/DetalhesCliente';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#004AAD',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          headerTitle: props => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('./src/assets/logo_c.png')} 
                style={{ width: 80, height: 80, marginRight: 10 }} 
              />
            </View>
          ),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CadastroCliente" component={CadastroClienteScreen} />
        <Stack.Screen name="ListarClientes" component={ListarClientesScreen} />
        <Stack.Screen name="DetalhesCliente" component={DetalhesClienteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
