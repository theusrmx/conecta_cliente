import { View } from 'react-native'
import React from 'react'
import SplashScreen from './src/pages/splash/SplashScreen'
import HomeScreen from './src/pages/home/HomeScreen'
import CadastroClienteScreen from './src/pages/cadastro_cliente/CadastroClienteScreen'
import ListarClientesScreen from './src/pages/listar_cliente/ListaClientesScreen'


export default function App() {
    return (
      <ListarClientesScreen/>
    )
}