import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
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
import theme from '../styles/light';
import { foodDetailsStyles as styles } from '../styles/screens';
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
    <Divider style={styles.sectionDivider} />
  </>
);

const FoodDetailsScreen = ({ route }: FoodDetailsScreenProps) => {
  const { foodId } = route.params || {};
  const { addItem, openDrawer } = usePlate();
  const [food, setFood] = useState<FoodDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        <ActivityIndicator animating size="large" color={theme.colors.primary} />
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
    const normalizedValue = nextValue.replace(',', '.');
    const sanitized = normalizedValue
      .replace(/[^0-9.]/g, '')
      .replace(/\.(?=.*\.)/g, '');
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
      <View style={styles.headerBlock}>
        <Text variant="headlineSmall" style={styles.title}>
          {food.name || 'Unknown food'}
        </Text>
      </View>
      <View style={styles.amountControlRow}>
        <Surface style={styles.amountBox} elevation={0}>
          <TextInput
            mode="flat"
            value={amount}
            onChangeText={updateAmount}
            keyboardType="decimal-pad"
            style={styles.amountInput}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            contentStyle={styles.amountInputContent}
          />
        </Surface>

        <View style={styles.amountButtons}>
          <IconButton
            icon="chevron-up"
            mode="contained-tonal"
            containerColor={theme.colors.primary}
            iconColor={theme.colors.textOnPrimary}
            size={12}
            onPress={() => changeAmountBy(1)}
          />
          <IconButton
            icon="chevron-down"
            mode="contained-tonal"
            containerColor={theme.colors.primary}
            iconColor={theme.colors.textOnPrimary}
            size={12}
            onPress={() => changeAmountBy(-1)}
          />
        </View>
      </View>

      <View style={styles.nutritionRow}>
        <Text style={styles.nutritionText}>
          <Text>Calorías: </Text>
          <Text style={styles.nutritionValue}>{caloriesText}</Text>
        </Text>
        <Text style={styles.nutritionText}>
          <Text>Proteínas: </Text>
          <Text style={styles.nutritionValue}>{proteinsText}</Text>
        </Text>
      </View>

      <Button
        mode="contained-tonal"
        icon="silverware-fork-knife"
        buttonColor={theme.colors.secondaryLight}
        textColor={theme.colors.textPrimary}
        style={styles.addButton}
        labelStyle={styles.addButtonLabel}
        onPress={addCurrentFoodToPlate}
      >
        Agregar al plato
      </Button>

      <Card style={styles.sectionCard} mode="outlined">
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Datos básicos
          </Text>
          <Divider style={styles.sectionDivider} />

          <DetailRow label="Categoria" value={food.category || '-'} />
          <DetailRow label="Cantidad base" value={`${baseServing} ${food.serving_unit || 'g'}`} />
          <DetailRow label="Calorías" value={`${food.calories_per_unit || '-'}`} />
          <DetailRow label="Proteínas" value={`${food.proteins_per_unit || '-'}`} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default FoodDetailsScreen;
