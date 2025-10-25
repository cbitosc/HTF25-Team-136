// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
// You MUST get this from your Google Cloud Platform credentials for your Firebase project
// Go to GCP -> APIs & Services -> Credentials -> OAuth 2.0 Client IDs -> Your Web client
GoogleSignin.configure({
  webClientId: '719148803377-sdo3i6goloj3nga0ohtvct8oa9b4ra3g.apps.googleusercontent.com',
});

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
