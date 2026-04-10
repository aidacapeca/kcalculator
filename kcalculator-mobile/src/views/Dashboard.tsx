import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {getAllFoods} from '../services/kcal/foods'; // 
import { FoodDetails } from '../types/food';

const Dashboard = ({ navigation }: { navigation: any }) => {
  const [foods, setFoods] = useState([] as FoodDetails[]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 

  useEffect(() => {
    let isMounted = true;

    const fetchFoods = async () => {
      try {
        const response = await getAllFoods();
        if (isMounted) {
          setFoods(response);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error fetching foods';
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFoods();

    return () => {
      isMounted = false;
    };
  }, []);


  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {foods.map((food) => (
        <TouchableOpacity
          key={food.id}
          style={styles.foodItem}
          onPress={() => {
            console.log('[Dashboard] open FoodDetails with foodId:', food.id);
            navigation.navigate('FoodDetails', { foodId: food.id });
          }}
        >
          <Text style={styles.foodTitle}>{food.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  foodItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  loading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default Dashboard;