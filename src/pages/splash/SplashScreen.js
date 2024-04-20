import { StyleSheet, Image, View, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo_transparent.png")}
        style={styles.logo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: "#004AAD",
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      width: width, // Definindo a largura como a largura da tela
      height: height, // Definindo a altura como a altura da tela
      resizeMode: 'contain' // Redimensionar a imagem para caber no espaço especificado
    }
})