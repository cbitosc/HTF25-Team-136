
// src/screens/FeatureShowcaseScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Snap & Track Instantly',
    description: 'Just take a photo—our AI identifies dishes and calculates calories automatically.',
    image: { uri: 'https://picsum.photos/seed/slide1/400' },
  },
  {
    key: '2',
    title: 'AI-Powered Meal Plans',
    description: 'Get customized diet plans based on your goals and preferences.',
    image: { uri: 'https://picsum.photos/seed/slide2/400' },
  },
  {
    key: '3',
    title: 'Track Your Journey',
    description: 'View your complete meal history with photos and nutritional trends.',
    image: { uri: 'https://picsum.photos/seed/slide3/400' },
  },
   {
    key: '4',
    title: 'Insights That Matter',
    description: 'Monitor calories, macros, and progress with intuitive charts.',
    image: { uri: 'https://picsum.photos/seed/slide4/400' },
  },
];

const FeatureShowcaseScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: { item: typeof slides[0] }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
      />
      <View style={styles.footer}>
         <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    lineHeight: 24,
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

export default FeatureShowcaseScreen;
