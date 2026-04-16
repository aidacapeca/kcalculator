import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { homeStyles as styles } from '../styles/screens';

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Kcalculator</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.buttonText}>ACCESS AS INVITE</Text>
      </TouchableOpacity>
    </View>
  );
}