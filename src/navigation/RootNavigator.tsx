// src/navigation/RootNavigator.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import OnboardingNavigator from './OnboardingNavigator';
import MainAppNavigator from './MainAppNavigator';

const RootNavigator = () => {
  const { user } = useAuth();

  // If a user is logged in, show the main app. Otherwise, show the onboarding/auth flow.
  return user ? <MainAppNavigator /> : <OnboardingNavigator />;
};

export default RootNavigator;
