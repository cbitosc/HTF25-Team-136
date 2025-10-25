
// src/screens/SplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the type for your navigation stack parameters
type RootStackParamList = {
  Welcome: undefined;
  // ... other screens
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const animationProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: 2500, // Animation duration
      useNativeDriver: false,
    }).start();

    // Navigate after a delay
    const timer = setTimeout(() => {
      navigation.replace('Welcome'); // Use replace to prevent going back to splash
    }, 3000); // Total splash screen time

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Replace with your logo */}
      <Text style={styles.logoText}>CALMATE</Text>
      <LottieView
        source={require('../assets/animations/loading.json')} // Your Lottie file
        progress={animationProgress}
        style={styles.lottie}
      />
      <Text style={styles.versionInfo}>Version 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 20,
  },
  lottie: {
    width: 150,
    height: 150,
  },
  versionInfo: {
    position: 'absolute',
    bottom: 40,
    fontSize: 12,
    color: 'grey',
  },
});

export default SplashScreen;
