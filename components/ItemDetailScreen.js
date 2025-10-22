import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import CustomTopBar from '../custom/CustomTopBar';
import { useCartStorage } from './UseCartStorage';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = width * 0.9;

// ---------------------------------------------------

const ItemDetailScreen = ({ route, navigation }) => {
  let data = route.params.productData;
  const item = data;
  // *** Hook use kiya ***
  const { addToCart } = useCartStorage();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);

  const handleQuantityChange = (change) => {
    setQuantity((prevQty) => {
      const newQty = prevQty + change;
      return newQty > 0 ? newQty : 1;
    });
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...item,
      quantity: quantity,
    };

    // *** Item ko AsyncStorage state mein add kiya ***
    addToCart(productToAdd);

    // Cart screen pe navigate kiya
    navigation.navigate('MainTabs', { screen: 'Cart' });
  };

  return (
    <View style={styles.mainWrapper}>
      {/* Custom Top Bar (Absolute positioning use karenge taake image ke upar aaye) */}
      <View style={styles.absoluteHeaderContainer}>
        <CustomTopBar showBackButton={true} title="Details" />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* 1. Image Section */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="cover"
          />
          {/* Favorite Button on Image */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}>
            <Ionicons
              name={isFavorite ? 'heart-sharp' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#FF5733' : '#333'}
            />
          </TouchableOpacity>
        </View>

        {/* 2. Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.productName}>{item.name}</Text>

          {/* Rating and Reviews */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={18} color="#fba519" />
            <Text style={styles.ratingText}>
              {item.rating.toFixed(1)} ({item.reviews} reviews)
            </Text>
          </View>

          {/* Price */}
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>

          {/* Additional Info Row */}
          <View style={styles.infoRow}>
            {/* Prep Time */}
            <View style={styles.infoBox}>
              <Ionicons name="time-outline" size={20} color="#333" />
              <Text style={styles.infoText}>{item.prepTime}</Text>
              <Text style={styles.infoLabel}>Prep Time</Text>
            </View>

            {/* Calories */}
            <View style={styles.infoBox}>
              <Feather name="zap" size={20} color="#333" />
              <Text style={styles.infoText}>{item.calories}</Text>
              <Text style={styles.infoLabel}>Calories</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 3. Bottom Action Bar (Fixed at the bottom) */}
      <View style={styles.bottomBar}>
        {/* Quantity Selector */}
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            onPress={() => handleQuantityChange(-1)}
            style={styles.qtyButton}>
            <Ionicons name="remove-outline" size={22} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => handleQuantityChange(1)}
            style={styles.qtyButton}>
            <Ionicons name="add-outline" size={22} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ---------------------------------------------------

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    height: '100%',
    width: '100%',
    paddingVertical: '10%',
  },

  absoluteHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  scrollContent: {
    paddingBottom: 120, 
  },

  // 1. Image Section
  imageSection: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    margin: 'auto',
  },
  productImage: {
    width: '100%',
    height: '80%',
    margin: 'auto',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // 2. Details Section
  detailsSection: {
    padding: width * 0.05,
    backgroundColor: 'white',
    // Image ke neeche round corners dene ke liye
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    minHeight: 200,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#555',
  },
  productPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    letterSpacing: 1,
  },

  // Additional Info Row
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: '10%',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
  },

  // 3. Bottom Action Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    // marginBottom: "10%"
    // Bottom navigation se upar space ke liye paddingBottom bhi add kar sakte hain
  },

  // Quantity Selector
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  qtyButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
  },

  // Add to Cart Button
  addToCartButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    // width: width * 0.55,
  },
  addToCartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ItemDetailScreen;
