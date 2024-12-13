import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DriverScreen from '../screens/DriverScreen';
import SessionScreen from '../screens/SessionScreen';
import DetailsScreen from '../screens/DetailScreen';
import DriverDetailsScreen from '../screens/DriverDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen}   options={{ headerShown: false }} />
      <Stack.Screen name="Drivers" component={DriverScreen} />
      <Stack.Screen name="Sessions" component={SessionScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen
        name="DriverDetails"
        component={DriverDetailsScreen} 
        options={{ title: 'Driver Details' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
