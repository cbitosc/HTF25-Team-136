// src/screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

const DashboardScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CALMATE!</Text>
      <Text style={styles.subtitle}>You are logged in.</Text>
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: 'grey', marginBottom: 20 },
});

export default DashboardScreen;
