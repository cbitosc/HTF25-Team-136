
// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logoText}>CALMATE</Text>
        <Text style={styles.tagline}>Smart nutrition tracking made simple</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ProfileSetup')} // Navigate to ProfileSetup screen
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Auth')}>
          <Text style={styles.secondaryButtonText}>
            Already have an account? <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoText: { fontSize: 48, fontWeight: 'bold', color: '#2ecc71' },
  tagline: { fontSize: 18, color: 'grey', marginTop: 10, textAlign: 'center' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  primaryButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  secondaryButton: { marginTop: 15, alignItems: 'center' },
  secondaryButtonText: { color: 'grey', fontSize: 14 },
  signInLink: { color: '#2ecc71', fontWeight: 'bold' },
});

export default WelcomeScreen;
