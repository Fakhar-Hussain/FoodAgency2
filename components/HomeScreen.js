import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'; 

import CustomTopBar from '../custom/CustomTopBar'; // File path adjust karein

import ProductScreen from '../custom/ProductScreen'
import RecommendScreen from '../custom/Recommended'
import BannerScreen from '../custom/BannerScreen'

const { width } = Dimensions.get('window');

// ---------------------------------------------------

const HomeScreen = ({ navigation }) => { 

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.agencyText}>Foodies</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("FavoriteStack")}>
        <Ionicons name="heart-outline" size={24} color="#161a25" />
      </TouchableOpacity>
    </View>
  );

  const ProductsSection = () => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Your trusted picks</Text>
      <TouchableOpacity 
          onPress={() => navigation.navigate("Menu")}
      >
        <Text style={styles.seeAllText}>View all</Text>
      </TouchableOpacity>
    </View>
  );
  
  const RecommendSection = () => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Recommended</Text>
      <TouchableOpacity 
          onPress={() => navigation.navigate("AllProducts")}
      >
        <Text style={styles.seeAllText}>View all</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopBar
        title="Home"
        rightIconName="restaurant-outline"
        onRightPress={() => navigation.navigate('Menu')}
      />
      <ScrollView 
        contentContainerStyle={styles.container} 
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
      >
        
        <BannerScreen/>
        <ProductsSection/>
        <ProductScreen navigation={navigation} />
        <RecommendSection/>
        <RecommendScreen navigation={navigation} />

      </ScrollView>
    </SafeAreaView>
  );
};

// ---------------------------------------------------
// Stylesheet
// ---------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    // backgroundColor: '#f5f5f5',
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1,
    padding: width * 0.05, 
    paddingVertical: 10, 
    maxHeight: "100%",
    // backgroundColor: "yellow"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  agencyText: {
    fontSize: 20,
    color: "#161a25"
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10, 
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 12,
    color: '#555', 
    fontWeight: '600',
  },
});

export default HomeScreen;