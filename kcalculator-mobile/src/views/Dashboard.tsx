import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getAllFoods } from '../services/kcal/foods';
import { dashboardStyles as styles } from '../styles/screens';
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
          onPress={() => navigation.navigate('FoodDetails', { foodId: food.id })}
        >
          <Text style={styles.foodTitle}>{food.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Dashboard;