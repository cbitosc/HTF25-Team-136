
// src/navigation/OnboardingNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import FeatureShowcaseScreen from '../screens/FeatureShowcaseScreen';
import AuthScreen from '../screens/AuthScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import EmailAuthScreen from '../screens/EmailAuthScreen';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="FeatureShowcase" component={FeatureShowcaseScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="EmailAuth" component={EmailAuthScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
