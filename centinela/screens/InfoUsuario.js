import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, updatePassword } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

export default function PerfilUsuario({ navigation }) {
  const [userInfo, setUserInfo] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const auth = getAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          const userDocRef = doc(db, 'Usuarios', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          } else {
            console.error('No se encontró el registro del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario', error);
      }
    };

    fetchUserData();
  }, [isFocused]);

  const handleChangePassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      console.log('Contraseña actualizada con éxito');
      setNewPassword(''); // Limpiar el campo de nueva contraseña
    } catch (error) {
      console.error('Error al actualizar la contraseña', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.vertical}>
          <Image
            style={styles.img}
            source={require("../assets/user.png")}
          />
          <Text style={styles.textFoto}>{userInfo.foto}</Text>
        </View>
        <Text style={styles.text}>Nombre: {userInfo.nombre}</Text>
        <Text style={styles.text}>Apellido: {userInfo.apellido}</Text>
        <Text style={styles.text}>Usuario: {userInfo.usuario}</Text>
        <Text style={styles.text}>Correo: {auth.currentUser.email}</Text>
        <Text style={styles.text}>Contraseña: *********</Text>
        <Text style={styles.text}>Teléfono: {userInfo.telefono}</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegistroCarro')}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <View style={styles.changePasswordContainer}>
          <Text style={styles.changePasswordLabel}>Nueva Contraseña:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Ingrese nueva contraseña"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <Button
            title="Cambiar Contraseña"
            onPress={handleChangePassword}
          />
        </View>
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
  textFoto: {
    marginLeft: 10,
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  textNormal: {
    fontSize: 20,
    marginBottom: 30,
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
  changePasswordContainer: {
    marginTop: 20,
  },
  changePasswordLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
});
