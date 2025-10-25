// src/screens/AuthScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential, signInWithPopup } from 'firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import { OAuthProvider, signInWithCredential as signInWithAppleCredential } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const AuthScreen = ({ navigation }: any) => {

  const handleGoogleSignIn = async () => {
    if (Platform.OS === 'web') {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred during Google Sign-In.');
      }
    } else {
      try {
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, googleCredential);
      } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('User cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('Sign in is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert('Error', 'Play services not available or outdated');
        } else {
          console.error(error);
          Alert.alert('Error', 'An error occurred during Google Sign-In.');
        }
      }
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken } = appleCredential;
      if (identityToken) {
        const provider = new OAuthProvider('apple.com');
        const credential = provider.credential({
          idToken: identityToken,
        });
        await signInWithAppleCredential(auth, credential);
      } else {
        throw new Error('No identityToken.');
      }
    } catch (e: any) {
      if (e.code === 'ERR_CANCELED') {
        console.log('User cancelled Apple Sign in.');
      } else {
        Alert.alert('Error', 'An error occurred during Apple Sign-In.');
      }
    }
  };

  // We are not implementing email in this screen, but you could navigate to a new screen for it
  const handleEmailSignIn = () => {
    navigation.navigate('EmailAuth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>CALMATE</Text>
        <Text style={styles.subtitle}>Create your account</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
          <Ionicons name="logo-google" size={24} color="#DB4437" style={styles.icon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' && ( // Apple Sign In only on iOS
          <TouchableOpacity style={[styles.socialButton, {backgroundColor: '#000'}]} onPress={handleAppleSignIn}>
            <Ionicons name="logo-apple" size={24} color="#FFF" style={styles.icon} />
            <Text style={[styles.socialButtonText, {color: '#FFF'}]}>Continue with Apple</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.socialButton} onPress={handleEmailSignIn}>
          <Ionicons name="mail" size={24} color="#666" style={styles.icon} />
          <Text style={styles.socialButtonText}>Continue with Email</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.termsText}>
        By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 60 },
  logoText: { fontSize: 48, fontWeight: 'bold', color: '#2ecc71' },
  subtitle: { fontSize: 18, color: 'grey', marginTop: 10 },
  buttonContainer: { width: '100%' },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 30,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center'
  },
  icon: { position: 'absolute', left: 20 },
  socialButtonText: { fontSize: 16, fontWeight: '600', color: '#333' },
  termsText: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 40,
    fontSize: 12,
    lineHeight: 18,
  },
  link: { color: '#2ecc71', textDecorationLine: 'underline' },
});


export default AuthScreen;
