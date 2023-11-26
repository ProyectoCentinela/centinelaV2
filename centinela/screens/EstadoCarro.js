import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
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
            // Comprobar si la subcolección "vehiculo" existe en el documento del usuario
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

  return (
    <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/estado.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Temperatura: </Text><Text style={styles.textNormal}>xxxx</Text>
          <View style={styles.circle} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Aceite: </Text><Text style={styles.textNormal}>xxxx</Text>
          <View style={styles.circle} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Anticongelante: </Text><Text style={styles.textNormal}>xxxx</Text>
          <View style={styles.circle} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>A: </Text><Text style={styles.textNormal}>xxxx</Text>
          <View style={styles.circle} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Correo: </Text><Text style={styles.textNormal}>xxxx</Text>
          <View style={styles.circle} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Teléfono: </Text><Text style={styles.textNormal}>xxxx</Text>
          <View style={styles.circle} />
        </View>

        <Button
          color="#365B6D"
          title="Actualizar"
          onPress={() => navigation.navigate(' ')}
        />
      </View>
  );
}

const styles = StyleSheet.create({
    img: {
      width: 200,
      height: 200,
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
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },textNormal: {
      fontSize: 20,
      marginBottom: 10,
    },
    circle: {
      width: 15,
      height: 15,
      borderRadius: 7.5, // La mitad del ancho y alto para hacerlo circular
      backgroundColor: 'red', // Puedes cambiar el color aquí
      marginLeft: 10, // Espacio entre el texto y el círculo
    },
    body: {},
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 20,
      padding: 10,
    },
  });
  
