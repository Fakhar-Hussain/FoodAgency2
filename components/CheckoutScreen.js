import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomTopBar from '../custom/CustomTopBar'; 
import { useCartStorage } from './UseCartStorage'; 

const DUMMY_ADDRESS = {
  name: 'John Smith',
  street: 'Apartment 4B, 789 Oak Street',
  city: 'New York, NY 10001, USA',
  phone: '+1 212 555 0199',
};

const CheckoutScreen = ({ route, navigation }) => {
  
  const { 
    totalAmount, 
    subtotal, 
    taxAmount, 
    deliveryCharges 
  } = route.params || {}; 
  
  const { cartItems, isLoading, deleteAllCarts } = useCartStorage(); 
  
  const SUBTOTAL = subtotal || 0;
  const TAX = taxAmount || 0;
  const DELIVERY_FEE = deliveryCharges || 0;
  const GRAND_TOTAL = totalAmount || 0;

  const [selectedPayment, setSelectedPayment] = useState('cash'); 
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); 


  const handlePlaceOrder = () => {
    
    deleteAllCarts(); 
    setIsSuccessModalVisible(true);
  };
  
  const handleGoHome = () => {
    setIsSuccessModalVisible(false);
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }], 
    });
  };
  
  if (isLoading) {
      return (
          <View style={[styles.container, styles.loadingContainer]}>
              <Text style={styles.loadingText}>Loading Checkout...</Text>
          </View>
      );
  }
  
  if (cartItems.length === 0 && !isSuccessModalVisible) {
      return (
          <View style={[styles.container, styles.emptyContainer]}>
              <Text style={styles.emptyText}>Your cart is empty! Cannot proceed to checkout.</Text>
              <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}>
                 <Text style={styles.browseButtonText}>Go to Home</Text>
              </TouchableOpacity>
          </View>
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomTopBar
        title="Checkout"
        leftIconName="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.sectionBox}>
          <View style={styles.sectionHeader}>
             <Text style={styles.sectionTitle}>Delivery Address</Text>
             <TouchableOpacity onPress={() => console.log('Change Address')}>
                 <Text style={styles.changeText}>Change</Text>
             </TouchableOpacity>
          </View>
          <View style={styles.addressBox}>
            <Ionicons name="location-sharp" size={24} color="#333" style={{ marginRight: 10, marginTop: 5 }}/>
            <View>
              <Text style={styles.addressName}>{DUMMY_ADDRESS.name}</Text>
              <Text style={styles.addressDetail}>Phone: {DUMMY_ADDRESS.phone}</Text> 
              <Text style={styles.addressDetail}>{DUMMY_ADDRESS.street}</Text>
              <Text style={styles.addressDetail}>{DUMMY_ADDRESS.city}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity 
              style={[styles.paymentOption, selectedPayment === 'cash' && styles.selectedPayment]}
              onPress={() => setSelectedPayment('cash')}>
            <Ionicons 
              name={selectedPayment === 'cash' ? "radio-button-on" : "radio-button-off"} 
              size={20} 
              color="#333" 
            />
            <Text style={styles.paymentText}>Cash on Delivery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
              style={[styles.paymentOption, selectedPayment === 'card' && styles.selectedPayment]}
              onPress={() => setSelectedPayment('card')}>
            <Ionicons 
              name={selectedPayment === 'card' ? "radio-button-on" : "radio-button-off"} 
              size={20} 
              color="#333" 
            />
            <Text style={styles.paymentText}>Credit/Debit Card</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${SUBTOTAL.toFixed(2)}</Text> 
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax ({(TAX / SUBTOTAL * 100 || 0).toFixed(0)}%)</Text>
            <Text style={styles.summaryValue}>${TAX.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${DELIVERY_FEE.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${GRAND_TOTAL.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={{ height: 100 }} />

      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order (${GRAND_TOTAL.toFixed(2)})</Text>
        </TouchableOpacity>
      </View>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSuccessModalVisible}
        onRequestClose={() => setIsSuccessModalVisible(false)} 
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <Ionicons name="checkmark-circle" size={60} color="#4BB543" />
            
            <Text style={styles.modalTitle}>Order Placed Successfully!</Text>
            <Text style={styles.modalText}>
              Your order #ORD{Math.floor(Math.random() * 10000)} has been confirmed and is being prepared. You will receive a message with delivery details shortly.
            </Text>
            
            <TouchableOpacity
              style={styles.homeButton}
              onPress={handleGoHome}>
              <Text style={styles.homeButtonText}>Return</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </Modal>
      
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    height: '100%',
    width: '100%',
    paddingVertical: 0, 
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  
  sectionBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  changeText: {
    fontSize: 14,
    color: '#FF5733', 
    fontWeight: '500',
  },

  addressBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addressName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  addressDetail: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },

  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedPayment: {
    
  },
  paymentText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
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
  
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  placeOrderButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.8
  },

  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  emptyContainer: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
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
  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)', 
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  homeButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    minWidth: '70%',
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CheckoutScreen;