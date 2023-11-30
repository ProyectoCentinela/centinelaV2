import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EstadoCarro = ({ route }) => {
  const { temperatura, aceite, anticongelante } = route.params;

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
        <View style={[styles.circle, { backgroundColor: getColor(temperatura) }]} />
        <Text style={styles.value}>{temperatura}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Aceite:</Text>
        <View style={[styles.circle, { backgroundColor: getColor(aceite) }]} />
        <Text style={styles.value}>{aceite}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Anticongelante:</Text>
        <View style={[styles.circle, { backgroundColor: getColor(anticongelante) }]} />
        <Text style={styles.value}>{anticongelante}</Text>
      </View>
      {/* Resto de tu lógica para la pantalla EstadoCarro */}
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
