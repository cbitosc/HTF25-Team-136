// src/navigation/MainAppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createStackNavigator();

const MainAppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;
