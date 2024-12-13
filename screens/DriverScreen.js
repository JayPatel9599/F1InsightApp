import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import CharacterCard from '../components/CharacterCard';
import { fetchDrivers } from '../src/api/api';

const DriverScreen = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const data = await fetchDrivers();
        setDrivers(data);
        setFilteredDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getDrivers();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = drivers.filter((driver) =>
      driver.full_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDrivers(filtered);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <>
          <TextInput
            style={styles.searchBar}
            placeholder="Search drivers..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredDrivers}
            keyExtractor={(item) => item.driver_number.toString()}
            renderItem={({ item }) => <CharacterCard driver={item} />}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DriverScreen;
