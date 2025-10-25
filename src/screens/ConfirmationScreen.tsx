
// src/screens/ConfirmationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConfirmationScreen = ({ navigation }: any) => {
  // In a real app, you would pass the user's name from the profile state.
  const userName = "User";

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons name="checkmark-circle" size={100} color="#2ecc71" />
      <Text style={styles.title}>Welcome, {userName}!</Text>
      <Text style={styles.subtitle}>You're all set up.</Text>
      
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Quick Tip</Text>
        <Text style={styles.tipText}>
          For the best results, take clear, top-down photos of your meals.
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.primaryButton}
        // This should navigate to your main app dashboard
        onPress={() => console.log("Navigate to Dashboard")} 
      >
        <Text style={styles.primaryButtonText}>Let's Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 40,
  },
  tipCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipText: {
    textAlign: 'center',
    color: '#555',
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfirmationScreen;
