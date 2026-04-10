import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../views/Home';
import SignUpScreen from '../views/SignUp';
import Dashboard from '../views/Dashboard';
import FoodDetailsScreen from '../views/FoodDetails';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Create New Account' }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} options={{ title: 'Food Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}