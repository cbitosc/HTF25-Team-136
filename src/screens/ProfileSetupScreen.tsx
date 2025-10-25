
// src/screens/ProfileSetupScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const ProfileSetupScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    weight: 70,
    height: 175,
    goal: '',
    activityLevel: '',
  });

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Finished all steps, navigate to the feature showcase
      navigation.navigate('FeatureShowcase');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Basic Info
        return (
          <>
            <Text style={styles.title}>Tell us about yourself</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType="numeric"
              value={profile.age}
              onChangeText={(text) => setProfile({ ...profile, age: text })}
            />
            <View style={styles.genderContainer}>
              {['Male', 'Female', 'Other'].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.genderButton, profile.gender === g && styles.genderSelected]}
                  onPress={() => setProfile({ ...profile, gender: g })}
                >
                  <Text style={[styles.genderText, profile.gender === g && styles.genderTextSelected]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case 2: // Body Metrics
        return (
          <>
            <Text style={styles.title}>Your Body Metrics</Text>
            <Text style={styles.label}>Weight: {profile.weight.toFixed(1)} kg</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={30}
              maximumValue={200}
              step={0.5}
              value={profile.weight}
              onValueChange={(val) => setProfile({ ...profile, weight: val })}
              minimumTrackTintColor="#2ecc71"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#2ecc71"
            />
            <Text style={styles.label}>Height: {profile.height.toFixed(0)} cm</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={120}
              maximumValue={220}
              step={1}
              value={profile.height}
              onValueChange={(val) => setProfile({ ...profile, height: val })}
              minimumTrackTintColor="#2ecc71"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#2ecc71"
            />
          </>
        );
      case 3: // Goal Selection
        return (
          <>
            <Text style={styles.title}>What's your primary goal?</Text>
            <View style={styles.cardContainer}>
              {['Weight Loss', 'Weight Gain', 'Maintain Weight', 'Build Muscle'].map((goal) => (
                <TouchableOpacity
                  key={goal}
                  style={[styles.goalCard, profile.goal === goal && styles.cardSelected]}
                  onPress={() => setProfile({ ...profile, goal })}
                >
                  <Text style={[styles.cardText, profile.goal === goal && styles.cardTextSelected]}>{goal}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case 4: // Activity Level
        const activityLevels = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'];
        return (
          <>
            <Text style={styles.title}>How active are you?</Text>
            <View style={styles.cardContainer}>
              {activityLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[styles.goalCard, profile.activityLevel === level && styles.cardSelected]}
                  onPress={() => setProfile({ ...profile, activityLevel: level })}
                >
                  <Text style={[styles.cardText, profile.activityLevel === level && styles.cardTextSelected]}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      case 5: // Dietary Preferences (Simplified for brevity)
        return (
            <>
              <Text style={styles.title}>Any Dietary Preferences?</Text>
              <Text style={styles.subtitle}>(Optional)</Text>
              {/* In a real app, you'd have checkboxes or tags here */}
              <TouchableOpacity style={styles.skipButton} onPress={handleNext}>
                <Text style={styles.skipButtonText}>Skip for now</Text>
              </TouchableOpacity>
            </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderStep()}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>{step === 5 ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  subtitle: { fontSize: 16, color: 'grey', textAlign: 'center', marginBottom: 40},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
    paddingVertical: 10,
    marginBottom: 25,
  },
  genderContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 },
  genderButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  genderSelected: { backgroundColor: '#2ecc71', borderColor: '#2ecc71' },
  genderText: { fontSize: 16, color: '#333' },
  genderTextSelected: { color: '#fff', fontWeight: 'bold' },
  label: { fontSize: 18, fontWeight: '500', marginTop: 20, marginBottom: 10 },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalCard: {
    width: '90%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardSelected: { backgroundColor: '#2ecc71', borderColor: '#2ecc71' },
  cardText: { fontSize: 18, fontWeight: '600', color: '#333' },
  cardTextSelected: { color: '#fff' },
  skipButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  skipButtonText: {
    color: '#2ecc71',
    fontSize: 16,
  },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  primaryButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});


export default ProfileSetupScreen;
