import React, { createContext, useContext, useMemo, useState } from 'react';

export type PlateItem = {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  proteins: number;
};

type PlateContextValue = {
  items: PlateItem[];
  drawerVisible: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<PlateItem, 'id'>) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  totalCalories: number;
  totalProteins: number;
};

const PlateContext = createContext<PlateContextValue | undefined>(undefined);

export function PlateProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<PlateItem[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const addItem = (item: Omit<PlateItem, 'id'>) => {
    const id = `${item.name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setItems((current) => [...current, { ...item, id }]);
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearItems = () => setItems([]);

  const totalCalories = useMemo(
    () => items.reduce((sum, item) => sum + item.calories, 0),
    [items],
  );

  const totalProteins = useMemo(
    () => items.reduce((sum, item) => sum + item.proteins, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      drawerVisible,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      clearItems,
      totalCalories,
      totalProteins
    }),
    [items, drawerVisible, totalCalories],
  );

  return <PlateContext.Provider value={value}>{children}</PlateContext.Provider>;
}

export function usePlate() {
  const context = useContext(PlateContext);

  if (!context) {
    throw new Error('usePlate must be used within a PlateProvider');
  }

  return context;
}
