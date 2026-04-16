import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  Surface,
  Text,
} from 'react-native-paper';
import { getFoodById } from '../services/kcal/foods';
import { FoodDetails } from '../types/food';

type FoodDetailsScreenProps = {
  route: {
    params?: {
      foodId?: string;
    };
  };
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <>
    <View style={styles.detailRow}>
      <Text variant="bodyLarge" style={styles.detailLabel}>
        {label}
      </Text>
      <Text variant="bodyLarge" style={styles.detailValue}>
        {value}
      </Text>
    </View>
    <Divider />
  </>
);

const FoodDetailsScreen = ({ route }: FoodDetailsScreenProps) => {
  const { foodId } = route.params || {};
  const [food, setFood] = useState<FoodDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const fetchFoodDetails = useCallback(async () => {
    if (!foodId) {
      setError('Food identifier not found.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getFoodById(foodId);
      setFood(response);
      setImageFailed(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch food details.');
    } finally {
      setLoading(false);
    }
  }, [foodId]);

  useEffect(() => {
    fetchFoodDetails();
  }, [fetchFoodDetails]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating size="large" color="#5B5ED2" />
        <Text variant="titleMedium" style={styles.loadingText}>
          Loading food details...
        </Text>
      </View>
    );
  }

  if (error || !food) {
    return (
      <View style={styles.loadingContainer}>
        <Avatar.Icon size={64} icon="alert-circle-outline" style={styles.errorIcon} />
        <Text variant="titleMedium" style={styles.errorText}>
          {error || 'Food details are unavailable.'}
        </Text>
        <Button mode="contained" onPress={fetchFoodDetails} style={styles.retryButton}>
          Try again
        </Button>
      </View>
    );
  }

  const servingText = `${food.serving_size || 0} ${food.serving_unit || 'gr'}`;
  const caloriesText = `${food.calories_per_unit || 0} kcal`;
  const proteinsText = `${food.proteins_per_unit || 0} g`;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Surface style={styles.heroCard} elevation={2}>
        <Avatar.Icon size={54} icon="silverware-fork-knife" style={styles.topIcon} />

        <Text variant="headlineMedium" style={styles.title}>
          {food.name || 'Unknown food'}
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          {food.category || 'Brief description'}
        </Text>

        <View style={styles.imageWrapper}>
          {food.image_url && !imageFailed ? (
            <Image
              source={{ uri: food.image_url }}
              style={styles.image}
              resizeMode="cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <Avatar.Icon size={84} icon="image-outline" style={styles.imagePlaceholder} />
          )}
        </View>

        <Chip icon="scale" style={styles.servingChip} textStyle={styles.chipText}>
          {servingText}
        </Chip>

        <Text variant="displaySmall" style={styles.calories}>
          {caloriesText}
        </Text>
      </Surface>

      <Card style={styles.sectionCard} mode="elevated">
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Basic data
          </Text>
          <Divider style={styles.sectionDivider} />

          <DetailRow label="Category" value={food.category || '-'} />
          <DetailRow label="Serving" value={servingText} />
          <DetailRow label="Proteins" value={proteinsText} />
          <View style={styles.detailRow}>
            <Text variant="bodyLarge" style={styles.detailLabel}>
              Calories
            </Text>
            <Text variant="bodyLarge" style={styles.detailValue}>
              {caloriesText}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained-tonal"
        icon="refresh"
        onPress={fetchFoodDetails}
        style={styles.refreshButton}
      >
        Refresh details
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ECECEF',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEF',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    color: '#5B5ED2',
  },
  errorIcon: {
    backgroundColor: '#D32F2F',
  },
  errorText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#333',
  },
  retryButton: {
    marginTop: 20,
  },
  heroCard: {
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: 'center',
    backgroundColor: '#F7F7FB',
    marginBottom: 18,
  },
  topIcon: {
    backgroundColor: '#151515',
    marginBottom: 18,
  },
  title: {
    textAlign: 'center',
    color: '#5B5ED2',
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    color: '#8B8B8B',
    marginTop: 8,
    marginBottom: 18,
  },
  imageWrapper: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderColor: '#0A6378',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDF5F8',
    overflow: 'hidden',
    marginBottom: 18,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    backgroundColor: '#0C8A8D',
  },
  servingChip: {
    marginBottom: 14,
    backgroundColor: '#E6E6EC',
  },
  chipText: {
    color: '#2D2D2D',
  },
  calories: {
    color: '#151515',
    fontSize: 28,
    fontWeight: '700',
  },
  sectionCard: {
    borderRadius: 18,
    backgroundColor: '#D9D5F5',
  },
  sectionTitle: {
    color: '#26237F',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionDivider: {
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  detailLabel: {
    color: '#2A2A52',
    fontWeight: '600',
  },
  detailValue: {
    color: '#151515',
    maxWidth: '55%',
    textAlign: 'right',
  },
  refreshButton: {
    marginTop: 18,
  },
});

export default FoodDetailsScreen;
