import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { getAllFoods } from '../services/kcal/foods';
import { dashboardStyles as styles } from '../styles/screens';
import { FoodDetails } from '../types/food';

const getCategoryIcon = (category: string) => {
  const normalized = category.toLowerCase();

  if (normalized.includes('fruit') || normalized.includes('fruta')) return 'food-apple';
  if (normalized.includes('veget') || normalized.includes('verd')) return 'carrot';
  if (normalized.includes('carne') || normalized.includes('pollo') || normalized.includes('pescado') || normalized.includes('proteina')) return 'food-drumstick';
  if (normalized.includes('marisco')) return 'fish';
  if (normalized.includes('drink') || normalized.includes('bebida')) return 'cup-water';
  if (normalized.includes('breakfast') || normalized.includes('snack')) return 'coffee';
  if (normalized.includes('grain') || normalized.includes('bread') || normalized.includes('cereal')) return 'bread-slice';

  return 'silverware-fork-knife';
};

const formatValue = (value: number) => {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  return value.toFixed(1);
};

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

  const groupedFoods = useMemo(() => {
    return foods.reduce<Record<string, FoodDetails[]>>((acc, food) => {
      const categoryName = food.category?.trim() || 'Otros';

      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }

      acc[categoryName].push(food);
      return acc;
    }, {});
  }, [foods]);

  if (loading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size="large" color="#6D63FF" />
        <Text style={styles.loading}>Loading foods...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroCard}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Explore foods by category and swipe to compare servings.</Text>
      </View>

      {Object.entries(groupedFoods).map(([category, items]) => (
        <View key={category} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <View style={styles.categoryTitleRow}>
              <View style={styles.categoryIconWrap}>
                <IconButton icon={getCategoryIcon(category)} size={20} iconColor="#1F1A44" />
              </View>
              <View style={styles.categoryTextBlock}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryCount}>
                  {items.length} {items.length === 1 ? 'food' : 'foods'}
                </Text>
              </View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sliderContent}
          >
            {items.map((food) => (
              <TouchableOpacity
                key={food.id}
                style={styles.foodCard}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('FoodDetails', { foodId: food.id })}
              >
                {food.image_url ? (
                  <Image source={{ uri: food.image_url }} style={styles.foodImage} resizeMode="cover" />
                ) : (
                  <View style={[styles.foodImage, styles.foodImageFallback]}>
                    <Text style={styles.foodImageFallbackText}>{food.name.charAt(0).toUpperCase()}</Text>
                  </View>
                )}

                <Text style={styles.foodTitle} numberOfLines={2}>
                  {food.name}
                </Text>

                <Text style={styles.foodMeta}>
                  Por {formatValue(food.serving_size)} {food.serving_unit}:{'\n'}
                  {formatValue(food.calories_per_unit)} Kcal - {formatValue(food.proteins_per_unit)} proteins
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

export default Dashboard;