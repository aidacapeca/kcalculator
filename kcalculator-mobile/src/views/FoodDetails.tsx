import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getFoodById } from '../services/kcal/foods';
import { FoodDetails } from '../types/food';

const FoodDetailsScreen = ({ route }: { route: any }) => {
  const { foodId } = route.params || {};
  const [food, setFood] = useState<Pick<FoodDetails, 'name' | 'category'>>({
    name: '',
    category: '',
  });

  useEffect(() => {
    let isMounted = true;

    console.log('[FoodDetails] mounted with foodId:', foodId);

    const fetchFoodDetails = async () => {
      if (!foodId) {
        console.log('[FoodDetails] missing foodId in route params');
        return;
      }

      try {
        const response = await getFoodById(foodId);
        console.log('[FoodDetails] API response payload:', response);
        if (isMounted) {
          setFood({
            name: response.name || '',
            category: response.category || '',
          });
        }
      } catch (err) {
        console.log('[FoodDetails] fetch error:', err);
      }
    };

    fetchFoodDetails();

    return () => {
      isMounted = false;
    };
  }, [foodId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{food.name || 'No name'}</Text>
      <Text style={styles.subtitle}>{food.category || '-'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEF',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: '#5B5ED2',
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 20,
    color: '#8B8B8B',
    textAlign: 'center',
  },
});

export default FoodDetailsScreen;
