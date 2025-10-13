import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList, // FlatList use karenge behtar performance ke liye
} from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
// Card ki width ko screen width se thora kam rakha (taake kinaron par margin ho)
const CARD_WIDTH = width * 0.9; 

const RECOMMENDED_DATA = [
  {
    id: 'P102',
    name: 'Spicy Chicken Zinger',
    price: 12.99,
    description: 'Crispy fried chicken fillet tossed in a spicy sauce, served with cool mayo and fresh iceberg lettuce on a sesame seed bun.',
    rating: 4.5,
    reviews: 210,
    image: 'https://thumbs.dreamstime.com/b/zinger-chicken-burger-isolated-white-background-delicious-ideal-fast-food-dining-savory-meal-content-356195958.jpg',
    isFavorite: false,
    calories: 620,
    prepTime: '15-25 min',
    location: '45 Red Street',
    restaurantName: 'Chick King',
  },
  {
    id: 'P103',
    name: 'Vegan Quinoa Salad Bowl',
    price: 15.00,
    description: 'A nutritious mix of fresh quinoa, avocado, cherry tomatoes, cucumbers, and spinach with a lemon vinaigrette dressing.',
    rating: 4.9,
    reviews: 480,
    image: 'https://media.istockphoto.com/id/953083908/photo/chicken-salad.jpg?s=612x612&w=0&k=20&c=g1e34gZmITTubxEoWSlQYJ-P417fzy_gN6vIz8ID9TI=',
    isFavorite: true,
    calories: 450,
    prepTime: '10-15 min',
    location: '8 Blue Road',
    restaurantName: 'Green Grub',
  },
  {
    id: 'P104',
    name: 'BBQ Pulled Sandwich',
    price: 16.75,
    description: 'Slow-cooked pulled beef bathed in smoky BBQ sauce, topped with coleslaw and pickles on a toasted bun.',
    rating: 4.3,
    reviews: 150,
    image: 'https://thumbs.dreamstime.com/b/sandwich-isolated-white-background-43370002.jpg',
    isFavorite: false,
    calories: 850,
    prepTime: '25-35 min',
    location: '12 Yellow Path',
    restaurantName: 'The Smokehouse',
  },
  {
    id: 'P107',
    name: 'Chocolate Lava Cake',
    price: 9.50,
    description: 'Warm, gooey chocolate cake with a molten center, served with vanilla bean ice cream.',
    rating: 4.9,
    reviews: 550,
    image: 'https://www.shutterstock.com/image-photo/lava-cake-chocolate-coming-out-600nw-2500970875.jpg',
    isFavorite: true,
    calories: 550,
    prepTime: '5-10 min',
    location: '17 Purple Place',
    restaurantName: 'Sweet Delights',
  },
];
// --- End Dummy Data ---


// ---------------------------------------------------

const RecommendedScreen = () => {
    
  // --- Recommended Item Card Component (Naye design ke mutabiq) ---
  const RecommendedCard = ({ item }) => (
    <View style={styles.card}>
      
      {/* 1. Left Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={[styles.productImage, {marginLeft: 5, borderRadius: 10 }]}
          resizeMode="cover"
        />
        
      </View>
      
      {/* 2. Right Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
            <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
            {/* Rating */}
            <View style={styles.ratingBox}>
                <Ionicons name="star" size={12} color="#fba519" />
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
        </View>
        
        <Text style={styles.companyText}>Cookie Heaven</Text>
        
        {/* Location */}
        <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#888" />
            <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        {/* Price and Add Button */}
        <View style={styles.bottomRow}>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.addButton}>
                <AntDesign name="plus" size={14} color="white" />
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // --- Main Content ---
  return (
    <View style={styles.container}>
      
      <FlatList
        data={RECOMMENDED_DATA}
        renderItem={({ item }) => <RecommendedCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle mein padding set kiya hai taake sides mein space mile
        contentContainerStyle={styles.listContent} 
        scrollEnabled={false} // Agar yeh component ScrollView ke andar hai, toh isko false rakhein
      />
    </View>
  );
};

// ---------------------------------------------------
// Stylesheet
// ---------------------------------------------------

const styles = StyleSheet.create({
  container: {
    // Agar yeh component Home Screen ki ScrollView ke andar hai, toh yahan padding horizontal hatana behtar hai
    // Taake width 100% ho sake
    backgroundColor: '#f5f5f5',
  },
  listContent: {
      marginBottom: 60,
      alignItems: 'center', // Cards ko center mein rakhega
  },

  // --- Card Styles ---
  card: {
    width: CARD_WIDTH, // Screen width jitna
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  // 1. Image Section
  imageContainer: {
    width: '35%', // Image ke liye 35% space
    height: 100,
    position: 'relative',
    padding: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  // 2. Details Section
  detailsContainer: {
    width: '65%', // Details ke liye 65% space
    padding: 10,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    letterSpacing: 0.8,
    fontWeight: 400,
    color: '#333',
    maxWidth: '70%', // Rating ke liye jagah chhodna
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    // backgroundColor: "red"
  },
  ratingText: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  companyText: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
    marginLeft: 2,
    marginBottom: 5,
  },

  // Location
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },

  // Bottom Row
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 400,
    color: '#333',
    letterSpacing: 0.5,
    marginLeft: 3
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#333', // Dark Add Button
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    marginRight: 10
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default RecommendedScreen;