import React from 'react';
import { Alert, Linking, ScrollView, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Button, IconButton, Modal, Portal, Surface, Text } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { PlateProvider, usePlate } from '../context/PlateContext';
import theme from '../styles/light';
import { routerStyles as styles } from '../styles/screens';
import HomeScreen from '../views/Home';
import Dashboard from '../views/Dashboard';
import FoodDetailsScreen from '../views/FoodDetails';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { drawerVisible, openDrawer, closeDrawer, items, removeItem, clearItems, totalCalories, totalProteins } = usePlate();

  const buildShareText = () => {
    const selectedFoods = items.length > 0
      ? items.map((item) => `• ${item.name}: ${item.amount} ${item.unit} (${item.calories} kcal, ${item.proteins} g proteína)`).join('\n')
      : 'Todavía no he añadido alimentos a este plato.';

    return `🍽️ Mi resumen de comida\n\nTotal: ${totalCalories} kcal • ${totalProteins} g de proteína\n\n${selectedFoods}\n`;
  };

  const handleCopySummary = async () => {
    try {
      await Clipboard.setStringAsync(buildShareText());
      Alert.alert('Resumen copiado', 'El texto del plato ya está en el portapapeles.');
    } catch (error) {
      Alert.alert('No se pudo copiar', 'No se pudo copiar el resumen al portapapeles.');
    }
  };

  const handleShareWhatsApp = async () => {
    const text = buildShareText();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

    try {
      const supported = await Linking.canOpenURL(whatsappUrl);

      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert('WhatsApp no disponible', 'Instala WhatsApp para compartir tu plato.');
      }
    } catch (error) {
      Alert.alert('No se pudo compartir', 'No se pudo abrir WhatsApp en este momento.');
    }
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: theme.colors.surface },
            headerTintColor: theme.colors.textPrimary,
            headerShadowVisible: false,
            headerRight: () => (
              <IconButton
                icon="silverware-fork-knife"
                size={18}
                iconColor={theme.colors.textPrimary}
                onPress={openDrawer}
              />
            ),
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
          <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} options={{ title: 'Details' }} />
        </Stack.Navigator>
      </NavigationContainer>

      <Portal>
        <Modal visible={drawerVisible} onDismiss={closeDrawer} contentContainerStyle={styles.drawerModal}>
          <Surface style={styles.drawerSheet} elevation={2}>
            <View style={styles.drawerHeader}>
              <IconButton
                icon="silverware-fork-knife"
                containerColor={theme.colors.secondaryLight}
                iconColor={theme.colors.textPrimary}
              />
              <IconButton icon="close" iconColor={theme.colors.textPrimary} onPress={closeDrawer} />
            </View>

            <Text variant="titleLarge" style={styles.drawerTitle}>
              Plato
            </Text>
            <Text style={styles.drawerSubtitle}>
              {items.length} {items.length === 1 ? 'alimento' : 'alimentos'} seleccionados
            </Text>

            <ScrollView style={styles.drawerContent} contentContainerStyle={styles.drawerContentInner}>
              {items.length === 0 ? (
                <Text variant="bodyMedium" style={styles.drawerText}>
                  No se han agregado alimentos aún.
                </Text>
              ) : (
                items.map((item) => (
                  <View key={item.id} style={styles.drawerItemCard}>
                    <View style={styles.drawerItemContent}>
                      <Text variant="titleMedium" style={styles.drawerItemTitle}>
                        {item.name}
                      </Text>
                      <Text variant="bodySmall" style={styles.drawerItemMeta}>
                        {item.amount} {item.unit} • {item.calories} kcal • {item.proteins} gr de proteína
                      </Text>
                    </View>
                    <IconButton
                      icon="minus"
                      size={18}
                      iconColor={theme.colors.error}
                      accessibilityLabel={`Eliminar ${item.name} del plato`}
                      onPress={() => removeItem(item.id)}
                    />
                  </View>
                ))
              )}
            </ScrollView>

            <View style={styles.drawerSummary}>
              <View style={styles.summaryItem}>
                <IconButton
                  icon="scale"
                  size={18}
                  iconColor={theme.colors.primary}
                  style={styles.summaryIcon}
                />
                <Text style={styles.summaryText}>
                  <Text style={styles.summaryValue}>{totalCalories}</Text>
                  <Text> kcal</Text>
                </Text>
              </View>

              <View style={styles.summaryItem}>
                <IconButton
                  icon="arm-flex-outline"
                  size={18}
                  iconColor={theme.colors.secondary}
                  style={styles.summaryIcon}
                />
                <Text style={styles.summaryText}>
                  <Text style={styles.summaryValue}>{totalProteins} gr</Text>
                  <Text> de proteína</Text>
                </Text>
              </View>
            </View>

            <View style={styles.drawerActions}>
              <View style={styles.drawerActionsRow}>
                <Button
                  mode="text"
                  compact
                  icon="delete-outline"
                  textColor={theme.colors.textSecondary}
                  style={styles.drawerActionButton}
                  onPress={clearItems}
                >
                  Vaciar
                </Button>
                <Button
                  mode="text"
                  compact
                  icon="content-copy"
                  textColor={theme.colors.textPrimary}
                  style={styles.drawerActionButton}
                  onPress={handleCopySummary}
                >
                  Copiar resumen
                </Button>
              </View>
              <Button
                mode="contained-tonal"
                icon="send-outline"
                buttonColor={theme.colors.secondaryLight}
                textColor={theme.colors.textPrimary}
                style={styles.shareButton}
                onPress={handleShareWhatsApp}
              >
                Enviar por WhatsApp
              </Button>
            </View>
          </Surface>
        </Modal>
      </Portal>
    </>
  );
}

export default function Router() {
  return (
    <PlateProvider>
      <AppNavigator />
    </PlateProvider>
  );
}