import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CharacterCard = ({ driver }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DriverDetails', { driver_number: driver.driver_number })
      }
    >
      <Image source={{ uri: driver.headshot_url }} style={styles.driverImage} />
      <View style={styles.info}>
        <Text style={styles.name}>{driver.full_name}</Text>
        <Text style={styles.team}>{driver.team}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  team: {
    fontSize: 14,
    color: '#555',
  },
});

export default CharacterCard;
