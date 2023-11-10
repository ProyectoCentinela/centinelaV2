import { View, Text, StyleSheet, TouchableOpacity, Image, Button , Alert} from 'react-native';
import React, { useState } from 'react'

export default function Home(props) { 
    return (
        <View style={styles.container}>
       
      <View style={styles.barra}>
        <TouchableOpacity onPress={() => Alert.alert('Emergencia','Envaindo tu ubicación')} style={styles.buttonContainer}>
          <Image
            source={require('../assets/advertencia.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Usuario')} style={styles.buttonContainer}>
          <Image
            source={require('../assets/userB.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Carro')} style={styles.buttonContainer}>
          <Image
            source={require('../assets/iconoCarro.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('')} style={styles.buttonContainer}>
          <Image
            source={require('../assets/notificacion.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white',
    },
    barra: {
      height: 70,
      width: '100%',
      backgroundColor: "#365B6D",
      flexDirection: 'row', // Cambia a 'row' para alinear los elementos horizontalmente
      justifyContent: 'space-between', // Alinea los elementos en los extremos
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    },
    buttonContainer: {
      marginHorizontal:10,
      width: 45,
      height: 45,
      borderRadius: 22.5,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonImage: {
      width: 30,
      height: 30,
    },
    botonImagen: {
      marginHorizontal:10,
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
     
    },
    botonImg: {
      width: 100,
      height: 100,
      
    },
    texto:{
      marginBottom:50,
    },
  });