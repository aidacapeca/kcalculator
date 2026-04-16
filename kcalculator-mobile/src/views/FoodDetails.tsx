import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import { usePlate } from '../context/PlateContext';
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
  const { addItem, openDrawer } = usePlate();
  const [food, setFood] = useState<FoodDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [amount, setAmount] = useState('100');

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
      setAmount(String(response.serving_size || 100));
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

  const value = Number(amount);
  const parsedAmount = Number.isFinite(value) && value > 0 ? value : 0;

  const baseServing = food.serving_size || 100;
  const multiplier = baseServing > 0 ? parsedAmount / baseServing : 0;
  const totalCalories = Math.round((food.calories_per_unit || 0) * multiplier);
  const totalProteins = Number(((food.proteins_per_unit || 0) * multiplier).toFixed(1));

  const caloriesText = `${totalCalories} kcal`;
  const proteinsText = `${totalProteins} g`;

  const updateAmount = (nextValue: string) => {
    const sanitized = nextValue.replace(/[^0-9]/g, '');
    setAmount(sanitized);
  };

  const changeAmountBy = (delta: number) => {
    const nextAmount = Math.max(1, (parsedAmount || 0) + delta);
    setAmount(String(nextAmount));
  };

  const addCurrentFoodToPlate = () => {
    addItem({
      name: food.name || 'Unknown food',
      amount: parsedAmount || baseServing,
      unit: food.serving_unit || 'g',
      calories: totalCalories,
      proteins: totalProteins,
    });
    openDrawer();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Surface style={styles.heroCard} elevation={2}>
          <Text variant="headlineMedium" style={styles.title}>
            {food.name || 'Unknown food'}
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

          <View style={styles.amountControlRow}>
            <Surface style={styles.amountBox} elevation={1}>
              <TextInput
                mode="flat"
                value={amount}
                onChangeText={updateAmount}
                keyboardType="numeric"
                style={styles.amountInput}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                contentStyle={styles.amountInputContent}
              />
              <Text style={styles.unitText}>{food.serving_unit || 'g'}</Text>
            </Surface>

            <View style={styles.amountButtons}>
              <IconButton
                icon="chevron-up"
                mode="contained"
                containerColor="#D8D1F0"
                iconColor="#4E4ECF"
                size={16}
                onPress={() => changeAmountBy(10)}
              />
              <IconButton
                icon="chevron-down"
                mode="contained"
                containerColor="#D8D1F0"
                iconColor="#4E4ECF"
                size={16}
                onPress={() => changeAmountBy(-10)}
              />
            </View>
          </View>

          <Text variant="displaySmall" style={styles.calories}>
            {caloriesText}
          </Text>
          <Text variant="displaySmall" style={styles.calories}>
            {proteinsText}
          </Text>
          <IconButton
            icon="silverware-fork-knife"
            mode="contained"
            containerColor="#151515"
            iconColor="#FFFFFF"
            size={28}
            style={styles.plateButton}
            onPress={addCurrentFoodToPlate}
          />

        <Card style={styles.sectionCard} mode="elevated">
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Basic data
            </Text>
            <Divider style={styles.sectionDivider} />

            <DetailRow label="Category" value={food.category || '-'} />
            <DetailRow label="Base serving" value={`${baseServing} ${food.serving_unit || 'gr'}`} />
            <DetailRow label="Calories" value={`${food.calories_per_unit || '-'}`} />
            <DetailRow label="Proteins" value={`${food.proteins_per_unit || '-'}`} />
          </Card.Content>
        </Card>
      </Surface>
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
  amountControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  amountBox: {
    width: 150,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#F3F1F8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  amountInput: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 56,
  },
  amountInputContent: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 0,
  },
  unitText: {
    color: '#5F5F6C',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  amountButtons: {
    marginLeft: 4,
    justifyContent: 'center',
  },
  calories: {
    color: '#151515',
    fontSize: 28,
    fontWeight: '700',
  },
  plateButton: {
    marginTop: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  sectionCard: {
    width: '100%',
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
    alignSelf: 'stretch',
  },
});

export default FoodDetailsScreen;
