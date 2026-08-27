import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { getAllFoods } from '../services/kcal/foods';
import theme from '../styles/light';
import { dashboardStyles as styles } from '../styles/screens';
import { FoodDetails } from '../types/food';

const getCategoryIcon = (category: string) => {
  const normalized = category.toLowerCase();

  if (normalized.includes('fruit') || normalized.includes('fruta')) return 'food-apple';
  if (normalized.includes('veget') || normalized.includes('verd')) return 'carrot';
  if (normalized.includes('carne') || normalized.includes('pollo') || normalized.includes('pescado') || normalized.includes('proteína')) return 'food-drumstick';
  if (normalized.includes('marisco')) return 'fish';
  if (normalized.includes('drink') || normalized.includes('bebida')) return 'cup-water';
  if (normalized.includes('breakfast') || normalized.includes('snack')) return 'coffee';
  if (normalized.includes('grain') || normalized.includes('grano') || normalized.includes('cereal')) return 'seed';
  if (normalized.includes('pan')) return 'bread-slice';
  if (normalized.includes('lácteo')) return 'cheese';
    if (normalized.includes('grasa')) return 'soy-sauce';
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
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredFoods = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) return foods;

    return foods.filter((food) => {
      const searchableText = [food.name, food.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedTerm);
    });
  }, [foods, searchTerm]);

  const groupedFoods = useMemo(() => {
    return filteredFoods.reduce<Record<string, FoodDetails[]>>((acc, food) => {
      const categoryName = food.category?.trim() || 'Otros';

      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }

      acc[categoryName].push(food);
      return acc;
    }, {});
  }, [filteredFoods]);

  if (loading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
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
        <Text style={styles.subtitle}>Aquí puedes ver todos los alimentos registrados por categoría y deslizar para comparar porciones.</Text>

        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Buscar alimentos o categorías"
          placeholderTextColor={theme.colors.textSecondary}
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {Object.keys(groupedFoods).length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>No se encontraron alimentos</Text>
          <Text style={styles.emptyStateText}>Prueba con otra palabra clave o limpia la búsqueda.</Text>
        </View>
      ) : null}

      {Object.entries(groupedFoods).map(([category, items]) => (
        <View key={category} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <View style={styles.categoryTitleRow}>
              <View style={styles.categoryIconWrap}>
                <IconButton icon={getCategoryIcon(category)} size={20} iconColor={theme.colors.textPrimary} />
              </View>
              <View style={styles.categoryTextBlock}>
                <Text style={styles.categoryTitle}>{category}</Text>
                <Text style={styles.categoryCount}>
                  {items.length} {items.length === 1 ? 'alimento' : 'alimentos'}
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
                  {formatValue(food.calories_per_unit)} Kcal - {formatValue(food.proteins_per_unit)} g de proteínas
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