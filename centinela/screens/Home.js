import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity, Text, Linking } from 'react-native';
import Swiper from 'react-native-swiper/src';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';

export default function Home(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const sendEmergencySMS = () => {
    if (location) {
      const phoneNumber = '7711516662'; // Reemplaza con el número de teléfono al que deseas enviar el SMS
      const message = `¡Emergencia! Mi ubicación actual es: https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;

      // Usar Linking para abrir la aplicación de mensajes con el número y mensaje predefinidos
      const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      Linking.openURL(url).catch((err) => {
        console.error('Error al abrir la aplicación de mensajes', err);
        Alert.alert('Error', 'Error al abrir la aplicación de mensajes');
      });
    } else {
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide}>
            <Image source={require('../assets/prueba1.jpg')} style={styles.image} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../assets/prueba2.jpg')} style={styles.image} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../assets/prueba3.jpg')} style={styles.image} />
          </View>
        </Swiper>
      </View>
      
      <View style={styles.barra}>
      <TouchableOpacity onPress={sendEmergencySMS} style={styles.buttonContainer}>
          <Image source={require('../assets/advertencia.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('InfoUsuario')} style={styles.buttonContainer}>
          <Image source={require('../assets/userB.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('InfoCarro')} style={styles.buttonContainer}>
          <Image source={require('../assets/iconoCarro.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('')} style={styles.buttonContainer}>
          <Image source={require('../assets/notificacion.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  carouselContainer: {
    width: '100%',
    height: '50%',
  },
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  barra: {
    height: 70,
    width: '100%',
    backgroundColor: '#365B6D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    marginHorizontal: 10,
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
  locationContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
});
