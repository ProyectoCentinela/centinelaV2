import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

export default function Carro(props) {
  const initialState = {
    marca: '',
    modelo: '',
    year: '',
    vin: '',
    matricula: ''
  };

  const [state, setState] = useState(initialState);
  const isFocused = useIsFocused();

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          // Obtener el documento existente del usuario
          const userDocRef = doc(db, 'Usuarios', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Si el documento existe, cargar los datos del vehículo en el estado
            setState({ ...userDoc.data().vehiculo });
          }
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    cargarDatosUsuario();
  }, [isFocused]);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;

        // Obtener el documento existente del usuario
        const userDocRef = doc(db, 'Usuarios', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Si el documento existe, actualizarlo con la nueva información del vehículo
          await updateDoc(userDocRef, {
            vehiculo: {
              ...state
            }
          });

          Alert.alert('Actualización exitosa', 'Accediendo a la siguiente sección');
          props.navigation.navigate('Home');
        } else {
          // Si el documento no existe, mostrar un mensaje de error
          Alert.alert('Error', 'No se encontró el registro del usuario');
        }
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'No se pudo hacer la actualización');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/InfoCarro.png')} />
        <Text style={styles.text}>Datos de tu vehículo</Text>
        <TextInput
          style={styles.input}
          placeholder="Marca"
          onChangeText={(value) => handleChangeText(value, 'marca')}
          value={state.marca}
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          onChangeText={(value) => handleChangeText(value, 'modelo')}
          value={state.modelo}
        />
        <TextInput
          style={styles.input}
          placeholder="Año"
          onChangeText={(value) => handleChangeText(value, 'year')}
          value={state.year}
        />
        <TextInput
          style={styles.input}
          placeholder="VIN"
          onChangeText={(value) => handleChangeText(value, 'vin')}
          value={state.vin}
        />
        <TextInput
          style={styles.input}
          placeholder="Matricula"
          onChangeText={(value) => handleChangeText(value, 'matricula')}
          value={state.matricula}
        />
        <TouchableOpacity style={styles.boton} onPress={saveData}>
          <Text style={styles.textButton}>Guardar datos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 25
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20
  },
  boton: {
    backgroundColor: '#365B6D',
    fontVariant: 'bold',
    width: 160,
    height: 70,
    alignContent: 'center',
    borderRadius: 15
  },
  textButton: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  }
});
