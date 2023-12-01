import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EstadoCarro = ({ route }) => {
  const [estadoCarro, setEstadoCarro] = useState({
    temperatura: 0,
    aceite: 0,
    anticongelante: 0,
  });

  const navigation = useNavigation();

  const actualizarEstadoCarro = (nuevoEstado) => {
    setEstadoCarro(nuevoEstado);
  };

  useEffect(() => {
    const { temperatura, aceite, anticongelante } = route.params || {};
    actualizarEstadoCarro({ temperatura: temperatura || 0, aceite: aceite || 0, anticongelante: anticongelante || 0 });
  }, [route.params]);

  const getColor = (value) => {
    if (value >= 1 && value <= 3) {
      return 'yellow';
    } else if (value >= 4 && value <= 7) {
      return 'green';
    } else if (value >= 8 && value <= 10) {
      return 'red';
    }
    // Puedes ajustar estos rangos según tus necesidades
    return 'black'; // Color por defecto si el valor no está en ninguno de los rangos anteriores
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Temperatura:</Text>
        <View style={[styles.circle, { backgroundColor: getColor(estadoCarro.temperatura) }]} />
        <Text style={styles.value}>{estadoCarro.temperatura}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Aceite:</Text>
        <View style={[styles.circle, { backgroundColor: getColor(estadoCarro.aceite) }]} />
        <Text style={styles.value}>{estadoCarro.aceite}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Anticongelante:</Text>
        <View style={[styles.circle, { backgroundColor: getColor(estadoCarro.anticongelante) }]} />
        <Text style={styles.value}>{estadoCarro.anticongelante}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Home', {
            datosErrores: estadoCarro,
          })
        }>

      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  value: {
    fontSize: 18,
  },
});

export default EstadoCarro;
