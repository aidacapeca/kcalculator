import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Divider, IconButton, Modal, Portal, Surface, Text } from 'react-native-paper';
import { PlateProvider, usePlate } from '../context/PlateContext';
import HomeScreen from '../views/Home';
import SignUpScreen from '../views/SignUp';
import Dashboard from '../views/Dashboard';
import FoodDetailsScreen from '../views/FoodDetails';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { drawerVisible, openDrawer, closeDrawer, items, clearItems, totalCalories, totalProteins } = usePlate();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerRight: () => (
              <IconButton
                icon="silverware-fork-knife"
                size={18}
                iconColor="#151515"
                onPress={openDrawer}
              />
            ),
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Create New Account' }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
          <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} options={{ title: 'Food Details' }} />
        </Stack.Navigator>
      </NavigationContainer>

      <Portal>
        <Modal visible={drawerVisible} onDismiss={closeDrawer} contentContainerStyle={styles.drawerModal}>
          <Surface style={styles.drawerSheet} elevation={4}>
            <View style={styles.drawerHeader}>
              <IconButton icon="silverware-fork-knife" containerColor="#151515" iconColor="#FFFFFF" />
              <IconButton icon="close" onPress={closeDrawer} />
            </View>

            <Text variant="headlineMedium" style={styles.drawerTitle}>
              Plate
            </Text>

            <View style={styles.drawerContent}>
              {items.length === 0 ? (
                <Text variant="bodyLarge" style={styles.drawerText}>
                  No foods added yet.
                </Text>
              ) : (
                items.map((item) => (
                  <Text key={item.id} variant="bodyLarge" style={styles.drawerListItem}>
                    • {item.name} - {item.amount} {item.unit} - {item.calories} kcal
                  </Text>
                ))
              )}
            </View>

            <Text variant="headlineSmall" style={styles.totalText}>
              Sum of kcal: {totalCalories}
            </Text>
            <Text variant="headlineSmall" style={styles.totalText}>
              Sum of proteins: {totalProteins}
            </Text>
            <View style={styles.drawerActions}>
              <IconButton
                icon="delete-outline"
                size={30}
                iconColor="#111111"
                onPress={clearItems}
              />
              <IconButton
                icon="send"
                size={30}
                iconColor="#111111"
                onPress={() => Alert.alert('Plate', 'Placeholder action')}
              />
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

const styles = StyleSheet.create({
  drawerModal: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  drawerSheet: {
    width: '78%',
    height: '100%',
    backgroundColor: '#EDF1E6',
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  drawerTitle: {
    color: '#5B5ED2',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  drawerContent: {
    flex: 1,
  },
  drawerText: {
    color: '#333333',
    textAlign: 'center',
  },
  drawerListItem: {
    color: '#111111',
    marginBottom: 18,
    lineHeight: 28,
  },
  totalText: {
    textAlign: 'center',
    color: '#111111',
    marginTop: 16,
    marginBottom: 24,
  },
  drawerActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
});