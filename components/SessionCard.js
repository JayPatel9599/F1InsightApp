import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SessionCard = ({ session, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.name}>{session.session_name}</Text>
        <Text style={styles.details}>
          {session.location}, {session.country_name}
        </Text>
        <Text style={styles.date}>
          {new Date(session.date_start).toLocaleString()} -{' '}
          {new Date(session.date_end).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
});

export default SessionCard;
