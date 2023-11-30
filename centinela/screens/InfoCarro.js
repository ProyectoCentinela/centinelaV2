import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

export default function InfoCarro({ navigation }) {
  const [vehicleInfo, setVehicleInfo] = useState({});
  const auth = getAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          const userDocRef = doc(db, 'Usuarios', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.vehiculo) {
              setVehicleInfo(userData.vehiculo);
            } else {
              console.error('No se encontró la información del vehículo');
            }
          } else {
            console.error('No se encontró el registro del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener la información del vehículo', error);
      }
    };

    fetchVehicleData();
  }, [isFocused]);

  const handleConnect = async () => {
    try {
      const response = await axios.get('http://192.168.0.170:5000/ruta_de_conexion');
      
      // Accede a los datos en la respuesta
      const datosDelServidor = response.data;
      console.log('Datos del servidor:', datosDelServidor);
  
      // Pasa los datos a la pantalla EstadoCarro
      navigation.navigate('EstadoCarro', {
        temperatura: datosDelServidor.temperatura,
        aceite: datosDelServidor.aceite,
        anticongelante: datosDelServidor.anticongelante,
      });
    } catch (error) {
      console.error('Error al conectar con el servidor Python', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.vertical}>
          <Image
            style={styles.img}
            source={require("../assets/InfoCarro.png")}
          />
        </View>
        <Text style={styles.text}>Marca: {vehicleInfo.marca}</Text>
        <Text style={styles.text}>Modelo: {vehicleInfo.modelo}</Text>
        <Text style={styles.text}>Año: {vehicleInfo.year}</Text>
        <Text style={styles.text}>Vin: {vehicleInfo.vin}</Text>
        <Text style={styles.text}>Matricula: {vehicleInfo.matricula}</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditarCarro')}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EstadoCarro')}>
          <Text style={styles.buttonText}>Estado del carro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleConnect}>
          <Text style={styles.buttonText}>Conectar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 25,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  body: {},
  button: {
    backgroundColor: '#365B6D',
    width: 140,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
