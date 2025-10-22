import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CART_STORAGE_KEY = '@MyApp:CartItems';

const saveCart = async (cartData) => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
  } catch (error) {
    console.error('Error saving cart to AsyncStorage:', error);
  }
};

export const useCartStorage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (storedCart !== null) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveCart(cartItems);
    }
  }, [cartItems, isLoading]);
  
  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

      let newItems;
      if (existingItemIndex > -1) {
        newItems = [...prevItems];
        newItems[existingItemIndex].quantity += product.quantity;
      } else {
        newItems = [...prevItems, product];
      }
      return newItems;
    });
  }, []);

  const updateItemQuantity = useCallback((itemId, change) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty >= 1 ? newQty : 0 };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
      
      return updatedItems;
    });
  }, []);
  
  const deleteAllCarts = useCallback(() => {
    setCartItems([]);
  }, []);


  return { cartItems, addToCart, updateItemQuantity, deleteAllCarts, isLoading };
};