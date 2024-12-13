import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const DriverDetailsScreen = ({ route }) => {
  const { driver_number } = route.params;

  const [pitDetails, setPitDetails] = useState([]);
  const [meetingName, setMeetingName] = useState('');
  const [stints, setStints] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // pit details
        const pitResponse = await axios.get(
          `https://api.openf1.org/v1/pit?session_key=latest&driver_number=${driver_number}`
        );
        const pitData = pitResponse.data || [];
        setPitDetails(pitData);

        // meeting details
        if (pitData.length > 0) {
          const meetingKey = pitData[0].meeting_key;
          const meetingResponse = await axios.get(
            `https://api.openf1.org/v1/meetings?meeting_key=${meetingKey}`
          );
          const meetingData = meetingResponse.data[0] || {};
          setMeetingName(meetingData.meeting_name || 'N/A');
        }

        // stint details
        const stintResponse = await axios.get(
          `https://api.openf1.org/v1/stints?driver_number=${driver_number}&session_key=latest`
        );
        setStints(stintResponse.data || []);
      } catch (error) {
        console.error('Error fetching driver details:', error.message);
      }
    };

    fetchDetails();
  }, [driver_number]);

  const renderPitDetails = ({ item }) => (
    <Animated.View entering={FadeInUp} style={styles.card}>
      <Text style={styles.cardTitle}>Lap {item.lap_number}</Text>
      <Text style={styles.cardContent}>Pit Duration: {item.pit_duration} seconds</Text>
    </Animated.View>
  );

  const renderStints = ({ item }) => (
    <Animated.View entering={FadeInUp} style={styles.card}>
      <Text style={styles.cardTitle}>Stint {item.stint_number}</Text>
      <Text style={styles.cardContent}>
        Compound: {item.compound}, Laps: {item.lap_start} - {item.lap_end}
      </Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Meeting Name Section */}
      <Animated.View style={styles.section} entering={FadeInDown}>
        <Text style={styles.title}>Race Location</Text>
        <Text style={styles.cardContent}>{meetingName}</Text>
      </Animated.View>

      {/* Pit Details Section */}
      <Animated.View style={styles.section} entering={FadeInDown}>
        <Text style={styles.title}>Pit Details</Text>
        {pitDetails.length > 0 ? (
          <FlatList
            data={pitDetails}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPitDetails}
            ListFooterComponent={() => <View style={{ height: 20 }} />}
          />
        ) : (
          <Text style={styles.placeholder}>No pit details available.</Text>
        )}
      </Animated.View>

      {/* Stints Section */}
      <Animated.View style={styles.section} entering={FadeInDown}>
        <Text style={styles.title}>Stints</Text>
        {stints.length > 0 ? (
          <FlatList
            data={stints}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderStints}
            ListFooterComponent={() => <View style={{ height: 20 }} />}
          />
        ) : (
          <Text style={styles.placeholder}>No stints data available.</Text>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 14,
    marginTop: 5,
  },
  placeholder: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default DriverDetailsScreen;
