import { View, StyleSheet, Image, Alert ,TouchableOpacity} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper/src';


export default function Home(props) {
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
        <TouchableOpacity onPress={() => Alert.alert('Emergencia', 'Enviando tu ubicación')} style={styles.buttonContainer}>
          <Image
            source={require('../assets/advertencia.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('InfoUsuario')} style={styles.buttonContainer}>
          <Image
            source={require('../assets/userB.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('InfoCarro')} style={styles.buttonContainer}>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  carouselContainer: {
    width: '100%',
    height: '30%',
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
});
