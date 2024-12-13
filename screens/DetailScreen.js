import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { fetchWeather, fetchRaceControl } from '../src/api/api';

const DetailsScreen = ({ route }) => {
  const { session_key } = route.params;
  const [weatherConditions, setWeatherConditions] = useState(null);
  const [raceControlData, setRaceControlData] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // weather conditions
        const weather = await fetchWeather(session_key);
        setWeatherConditions(weather);

        // race control data
        const raceControl = await fetchRaceControl(session_key);
        setRaceControlData(raceControl);
      } catch (error) {
        console.error('Error fetching details:', error.message);
      }
    };

    fetchDetails();
  }, [session_key]);

  const renderWeatherSection = () => (
    <Animated.View style={styles.section} entering={FadeInDown}>
      <Text style={styles.title}>Race Weather Conditions</Text>
      {weatherConditions ? (
        <View style={styles.weather}>
          <Text style={styles.weatherText}>
            Temperature: {weatherConditions.air_temperature}°C
          </Text>
          <Text style={styles.weatherText}>
            Humidity: {weatherConditions.humidity}%
          </Text>
          <Text style={styles.weatherText}>
            Rainfall: {weatherConditions.rainfall} mm
          </Text>
          <Text style={styles.weatherText}>
            Wind Speed: {weatherConditions.wind_speed} km/h
          </Text>
          <Text style={styles.weatherText}>
            Wind Direction: {weatherConditions.wind_direction}°
          </Text>
        </View>
      ) : (
        <Text style={styles.placeholder}>Loading weather conditions...</Text>
      )}
    </Animated.View>
  );

  const renderRaceControlItem = ({ item }) => (
    <Animated.View entering={FadeInUp} style={styles.card}>
      <Text style={styles.cardTitle}>Category: {item.category}</Text>
      {item.flag && <Text style={styles.cardFlag}>Flag: {item.flag}</Text>}
      <Text style={styles.cardMessage}>{item.message}</Text>
    </Animated.View>
  );

  const renderRaceControlSection = () => (
    <Animated.View style={styles.section} entering={FadeInDown}>
      <Text style={styles.title}>Race Control</Text>
      {raceControlData.length > 0 ? (
        <FlatList
          data={raceControlData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRaceControlItem}
        />
      ) : (
        <Text style={styles.placeholder}>No race control data available.</Text>
      )}
    </Animated.View>
  );

  return (
    <FlatList
      data={[{ key: 'weather' }, { key: 'raceControl' }]}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) =>
        item.key === 'weather' ? renderWeatherSection() : renderRaceControlSection()
      }
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  weather: {
    marginTop: 10,
  },
  weatherText: {
    fontSize: 16,
    marginVertical: 4,
  },
  card: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#fefefe',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardMessage: {
    fontSize: 16,
    color: '#555',
  },
});

export default DetailsScreen;