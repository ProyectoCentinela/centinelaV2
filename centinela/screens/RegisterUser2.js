import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image,Alert,ScrollView } from 'react-native'

import appFirebase from '../credenciales'
import {getFirestore,collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'
const db =getFirestore(appFirebase)

export default function RegisterUser(props) {
    //variable de estado
    const initialState={
      nombre:'',
      apellido:'',
      usuario:'',
      telefono:'',
      direccion:''
    }
    const[state,setState]=useState(initialState)

    const handleChangeText= (value,name)=>{
      setState({...state,[name]:value})
    }
    const saveData= async()=> {
    try{
      await addDoc(collection(db,'Usuarios'),{
        ...state
      })
      Alert.alert('Registro exitoso','Accediendo a la siguiente sección')
      props.navigation.navigate('Home')
    }catch(error){
      Alert.alert('Error','No se pudo hacer el registro')
    }
      //console.log(state)
    }
    return (
      <ScrollView>
      <View style={styles.container}>
    
       
          <Image
              style={styles.img }
              source={require("../assets/user.png")}
            />
            <Text style={styles.text}>Datos obligatorios</Text>
            <TextInput style={styles.input} placeholder="Nombre" onChangeText={(value)=>handleChangeText(value,'nombre')} value={state.nombre}/>
            <TextInput style={styles.input} placeholder="Apellido" onChangeText={(value)=>handleChangeText(value,'apellido')} value={state.apellido}/>
            <TextInput style={styles.input} placeholder="Usuario" onChangeText={(value)=>handleChangeText(value,'usuario')} value={state.usuario}/>
            <TextInput style={styles.input} placeholder="Teléfono"  onChangeText={(value)=>handleChangeText(value,'telefono')} value={state.telefono}/>
            <TextInput style={styles.input} placeholder="Dirección" onChangeText={(value)=>handleChangeText(value,'direccion')} value={state.direccion}/>
            <TouchableOpacity style={styles.boton} onPress={saveData}>
                <Text  style={styles.textButton}>Registrar Datos</Text>
            </TouchableOpacity>
          
  
      </View>
      </ScrollView>
        
    
    );
}
const styles = StyleSheet.create({
    img:{
        width: 200, 
        height: 200, 
        marginBottom: 15,
        borderRadius:25,
    },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:30,
  },
  
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius:20
  },
  boton:{
    backgroundColor:'#365B6D',
    fontVariant: 'bold',
    width:140,
    height:40,
    alignContent:'center',
    borderRadius:15
  }, 
  textButton:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center',
    color:'white'
  }
});