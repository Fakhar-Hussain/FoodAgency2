import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList
} from 'react-native';
import { Feather, Ionicons, AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const productsData = [
  {
    id: 'P101',
    name: 'Premium Classic CheeseBurger',
    price: 18.50,
    description: 'A masterpiece of taste: juicy 100% beef patty, melted cheddar cheese, fresh lettuce, tomato, and our signature secret sauce, all nestled in a toasted brioche bun. Served with a side of crispy seasoned fries.',
    rating: 4.7,
    reviews: 350,
    image: 'https://i.pinimg.com/564x/b8/a7/5e/b8a75e580a202cce7ac6bc3693e96672.jpg',
    isFavorite: true,
    calories: 780,
    prepTime: '20-30 min',
    location: '21 Green Avenue',
    restaurantName: 'Los Polos Hermanos',
  },
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
    id: 'P105',
    name: 'Pepperoni Pizza',
    price: 8.99,
    description: 'A generous slice of classic New York style pizza with rich tomato sauce, mozzarella cheese, and spicy pepperoni.',
    rating: 4.6,
    reviews: 320,
    image: 'https://img.freepik.com/free-psd/top-view-delicious-pizza_23-2151868964.jpg?semt=ais_hybrid&w=740&q=80',
    isFavorite: true,
    calories: 510,
    prepTime: '10-20 min',
    location: '55 Orange Drive',
    restaurantName: 'Mama Mia\'s Pizza',
  },
  {
    id: 'P106',
    name: 'Fresh Sushi Platter',
    price: 25.00,
    description: 'Assortment of fresh sashimi, nigiri, and maki rolls, served with wasabi, pickled ginger, and soy sauce.',
    rating: 4.8,
    reviews: 410,
    image: 'https://media.istockphoto.com/id/177096343/photo/sushi-and-chopsticks-on-a-white-plate.jpg?s=612x612&w=0&k=20&c=ZrJGDES6fri8HnmLNFZBJY89kEbfeqCa_CkM78reYZY=',
    isFavorite: true,
    calories: 590,
    prepTime: '30-40 min',
    location: '30 Aqua Lane',
    restaurantName: 'Koi Pond',
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
  {
    id: 'P108',
    name: 'Chicken Tikka',
    price: 19.99,
    description: 'Tender chunks of chicken marinated in spices and yogurt, baked and served in a creamy, richly flavored tomato sauce.',
    rating: 4.4,
    reviews: 280,
    image: 'https://thumbs.dreamstime.com/b/fresh-chicken-tikka-kebab-isolated-white-background-fresh-chicken-tikka-kebab-isolated-white-background-357050525.jpg',
    isFavorite: false,
    calories: 910,
    prepTime: '35-45 min',
    location: '9 Green Valley',
    restaurantName: 'Spice Route',
  },
  {
    id: 'P109',
    name: 'Double Decker Tacos',
    price: 11.00,
    description: 'Two layers of tortillas (soft and hard) filled with seasoned ground beef, cheese, lettuce, and sour cream.',
    rating: 4.2,
    reviews: 190,
    image: 'https://media.istockphoto.com/id/459396345/photo/taco.jpg?s=612x612&w=0&k=20&c=_yCtd6OEb2L8xNal4kC1xvm8HoBp8sry6tcBwmxmPHw=',
    isFavorite: false,
    calories: 700,
    prepTime: '15-20 min',
    location: '66 Brown Road',
    restaurantName: 'Taco Loco',
  },
  {
    id: 'P110',
    name: 'French Onion Soup',
    price: 9.00,
    description: 'Classic rich beef broth, caramelized onions, topped with a crouton and melted Gruyère cheese.',
    rating: 4.0,
    reviews: 120,
    image: 'https://media.istockphoto.com/id/1364577235/photo/front-view-of-pumpkin-soup-on-white-background-with-olive-oil-and-parsley.jpg?s=612x612&w=0&k=20&c=E5LY2fUqJ_RtLZyJ5Bmo7VoqBq6bFsyoPbdy2QBxPV8=',
    isFavorite: true,
    calories: 350,
    prepTime: '10-15 min',
    location: '2 White Ave',
    restaurantName: 'Le Bistro',
  },
  {
    id: 'P111',
    name: 'Grilled Salmon with Asparagus',
    price: 22.50,
    description: 'Pan-seared salmon fillet seasoned with lemon and herbs, served with roasted asparagus.',
    rating: 4.7,
    reviews: 310,
    image: 'https://media.istockphoto.com/id/509028439/photo/grilled-fish-salmon-steak.jpg?s=612x612&w=0&k=20&c=9vtoieZd6s1AV8-_r5Vy2Jtlt3NMLNeC7Mvj9PmEFBg=',
    isFavorite: true,
    calories: 650,
    prepTime: '20-30 min',
    location: '40 Harbour View',
    restaurantName: 'Ocean Blue',
  },
  {
    id: 'P112',
    name: 'Vanilla Bean Milkshake',
    price: 7.50,
    description: 'Thick and creamy milkshake blended with real vanilla beans and topped with whipped cream.',
    rating: 4.5,
    reviews: 250,
    image: 'https://thumbs.dreamstime.com/b/vanilla-milkshake-whipped-cream-refreshing-treat-served-straw-bean-384251004.jpg',
    isFavorite: false,
    calories: 480,
    prepTime: '5-10 min',
    location: '77 Downtown',
    restaurantName: 'The Diner',
  },
];
// --- End Dummy Data ---

const ProductScreen = ({navigation}) => {

  // --- Product Card Component ---
  const ProductCard = ({ product }) => (
    <TouchableOpacity style={styles.productCard} 
      onPress={() => navigation.navigate('ItemDetail', { 
            productData: product
        })}
    >
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.ratingBox}>
          <Ionicons name="star" size={12} color="#fba519" />
          <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
        <View style={styles.detailsRow}>
            <Text style={styles.detailText}>{product.restaurantName}</Text>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="clock-outline" size={18} color="#333" />
            <Text style={styles.detailText}>{product.prepTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="fire" size={18} color="#333" />
            <Text style={styles.detailText}>{product.calories} calories</Text>
          </View>
        </View>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}
        onPress={() => navigation.navigate('ItemDetail', { 
            productData: product
        })}
      >
        <AntDesign 
          name="right" 
          size={14} 
          color="white" 
          style={{ paddingTop: 1,}} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // --- Main Content ---
  return (
    <View style={styles.safeArea}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.bestSellersList}>
          {productsData.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// ---------------------------------------------------
// Stylesheet
// ---------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f5f5f5',
  },

  // Best Sellers Styles
  bestSellersList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  // rating box
  ratingBox: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginRight: 8,
    position: "absolute",
    top: 10,
    right: 5

    // backgroundColor: "red"
  },
  ratingText: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },

  // Product Card Styles
  productCard: {
    width: width * 0.45, 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: '80%',
    height: 100,
    marginVertical: 20,
    borderRadius: 15,
    marginHorizontal: "auto",
  },
  productName: {
    fontSize: 14,
    letterSpacing: 0.8,
    fontWeight: 400,
    color: '#333',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 400,
    color: '#333',
    marginTop: 15,
    letterSpacing: 0.5,
    marginLeft: 3
  },
  detailsRow: {
  },
  detailItem: {
    marginTop: 3,
    // marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  detailText: {
    fontSize: 10,
    color: '#888',
    marginLeft: 2,
    marginTop: 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#333',
    borderRadius: 50,
    height:30,
    width: 30,
    alignItems: "center",
    justifyContent: "center"
  },


});

export default ProductScreen;
