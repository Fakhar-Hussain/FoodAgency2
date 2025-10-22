import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomTopBar from '../custom/CustomTopBar';
import { useCartStorage } from './UseCartStorage';

const { width } = Dimensions.get('window');

const DELIVERY_FEE = 5.0;
const TAX_RATE = 0.05; // 5% tax

// ---------------------------------------------------

const CartScreen = ({ navigation }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const { cartItems, updateItemQuantity, deleteAllCarts, isLoading } = useCartStorage();

  // --- Price Calculation Logic ---
  useEffect(() => {
    if (!isLoading) {
      const newSubtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newTaxAmount = newSubtotal * TAX_RATE;

      setSubtotal(newSubtotal);
      setTaxAmount(newTaxAmount);
    }
  }, [cartItems, isLoading]);

  const grandTotal = subtotal + taxAmount + DELIVERY_FEE;

  // --- Quantity Handlers ---
  const updateQuantity = (itemId, change) => {
      updateItemQuantity(itemId, change); 
  };

  // --- Cart Item Card Component ---
  const CartItemCard = ({ item }) => (
    <View style={styles.card}>
      {/* 1. Left Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      {/* 2. Middle Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.companyText}>{item.restaurantName}</Text>

      {/* 3. Right Quantity & Remove Button */}
      <View style={styles.quantityContainer}>
        
        {item !== undefined && (
            <Text style={styles.productPrice}>
                ${(typeof item.price === 'number' ? item.price : 0).toFixed(2)} 
            </Text>
        )}

        <View style={styles.quantityControlContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} 
            style={styles.quantityBtn}>
            <Ionicons name="remove" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} 
            style={styles.quantityBtn}>
            <Ionicons name="add" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

        <TouchableOpacity
          style={styles.removeIcon}
          onPress={() => updateQuantity(item.id, -item.quantity)}>
          <Ionicons name="close-circle" size={20} color="#FF5733" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Empty Cart Component ---
  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="cart-outline" size={80} color="#ccc" />
      <Text style={styles.emptyText}>Oops! Your cart is empty.</Text>
      <Text style={styles.emptyTextBrief}>Let's fill it up with some great food!</Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.browseButtonText}>Start Now</Text>
      </TouchableOpacity>
    </View>
  );

  const DeleteAllCarts = () => {
      deleteAllCarts();
  }

  // Loading state dikhane ke liye
  if (isLoading) {
      return (
        <View style={styles.container}>
            <Text>Loading Cart...</Text>
        </View>
      );
  }

  // --- Main Content ---
  return (
    <View style={styles.container}>
      <CustomTopBar
        title="Cart"
        rightIconName="trash-outline"
        onRightPress={() => DeleteAllCarts()}
      />   
      
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Cart Items List */}
          <FlatList
            data={cartItems}
            renderItem={({ item }) => <CartItemCard item={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            style={styles.cartList}
          />

          {/* Order Summary Section */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax ({TAX_RATE * 100}%)</Text>
              <Text style={styles.summaryValue}>${taxAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>
                ${DELIVERY_FEE.toFixed(2)}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
            </View>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => 
              navigation.navigate('Checkout', {
                totalAmount: grandTotal,
                subtotal: subtotal,
                taxAmount: taxAmount,
                deliveryCharges: DELIVERY_FEE,
              })
            }>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

// ---------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 100, // Bottom navigation ke liye space
    paddingHorizontal: width * 0.05,
  },
  cartList: {
    marginBottom: 20,
  },

  // --- Cart Item Card Styles ---
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  }, 
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  productName: {
    fontSize: 14,
    letterSpacing: 0.8,
    fontWeight: 400,
    color: '#333',
    maxWidth: '70%',
  },
  productPrice: {
    fontSize: 18,
    color: '#333',
    letterSpacing: 0.8,
    marginTop: 2,
    fontWeight: 400,
    marginLeft: 2
  },
  companyText: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
    marginBottom: 5,
    marginLeft: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  quantityControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
    width: 70,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityBtn: {
    width:"20px",
    height:"20px", 
    borderRadius: 3, 
    backgroundColor: "#333", 
    alignItems: "center", 
    justifyContent: "center",
  },

  removeIcon: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: 'white',
    borderRadius: 50,
  },

  // --- Summary Styles ---
  summaryBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
    letterSpacing: 0.8
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    letterSpacing: 0.8
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.8
  },
  totalValue: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.8
  },

  // --- Checkout Button ---
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.8
  },

  // --- Empty State Styles ---
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: "auto",
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    marginTop: 15,
    textAlign: "center",
    letterSpacing: 0.8,
  },
  emptyTextBrief: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
    textAlign: "center",
    letterSpacing: 0.8,
    marginBottom: 20,
  },

  browseButton: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CartScreen;
