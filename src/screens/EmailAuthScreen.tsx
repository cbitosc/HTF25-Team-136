
// src/screens/EmailAuthScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const EmailAuthScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up and Sign In

  const handleAuthentication = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created successfully! Please sign in.');
        setIsSignUp(false); // Switch to sign-in view after successful sign-up
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        // On successful sign-in, the AuthProvider will navigate the user to the main app
      }
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
        <Text style={styles.subtitle}>
          {isSignUp ? 'Enter your email and password to sign up' : 'Enter your credentials to sign in'}
        </Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleAuthentication}>
        <Text style={styles.primaryButtonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.secondaryButton} onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.secondaryButtonText}>
          {isSignUp ? 'Already have an account? ' : "Don\'t have an account? "}
          <Text style={styles.link}>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
    header: { alignItems: 'center', marginBottom: 40 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#333' },
    subtitle: { fontSize: 16, color: 'grey', marginTop: 10, textAlign: 'center' },
    inputContainer: { marginBottom: 30 },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingVertical: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    primaryButton: {
        backgroundColor: '#2ecc71',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    secondaryButton: { alignItems: 'center' },
    secondaryButtonText: { color: 'grey', fontSize: 14 },
    link: { color: '#2ecc71', fontWeight: 'bold' },
});

export default EmailAuthScreen;
