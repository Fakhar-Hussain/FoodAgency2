import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { getFocusedRouteNameFromState } from '@react-navigation/native'; 

import { Feather, Ionicons } from '@expo/vector-icons'; 
import HomeScreen from '../components/HomeScreen'; 
import MenuScreen from '../components/MenuScreen'; 
import ProfileScreen from '../components/ProfileScreen'; 
import CartScreen from '../components/CartScreen'; 
import ItemDetailScreen from '../components/ItemDetailScreen'; 
import CheckoutScreen from '../components/CheckoutScreen'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 

const navItems = [
  { key: 'Home', icon: 'home-outline', activeIcon: 'home', text: 'Home' },
  { key: 'Menu', icon: 'restaurant-outline', activeIcon: 'restaurant', text: 'Menu' },
  { key: 'Cart', icon: 'cart-outline', activeIcon: 'cart', text: 'Cart' },
  { key: 'Profile', icon: 'person-outline', activeIcon: 'person', text: 'Profile' },
];


const ExtraScreen = () => (
  <View style={styles.safeArea}>
    <View style={styles.header}>
        <Text style={styles.agencyText}>Extra Screen</Text>
    </View>
  </View>
);

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.bottomNav}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const item = navItems.find(i => i.key === route.name);
               
                if (!item) return null;
                
                return (
                    <TouchableOpacity 
                        key={index}
                        style={[
                            styles.navItem,
                            isFocused && styles.activeNavItem,
                        ]}
                        onPress={() => navigation.navigate(route.name)}
                    >
                        <Ionicons
                            name={isFocused ? item.activeIcon : item.icon} 
                            size={16} 
                            color={isFocused ? 'white' : '#888'} 
                        />
                        {isFocused && <Text style={styles.activeNavText}>{item.text}</Text>}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

function AppTabs() {
  return (
    <Tab.Navigator 
        initialRouteName="Home"
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{headerShown: false}} 
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Cart" component={CartScreen} /> 
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="MainTabs" 
                component={AppTabs} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="ItemDetail" 
                component={ItemDetailScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="ExtraMain" 
                component={ExtraScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Checkout" 
                component={CheckoutScreen} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}


const NavigationScreen = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  agencyText: {
    fontSize: 20,
    color: "#161a25"
  },
  
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  activeNavItem: {
    flexDirection: 'row',
    backgroundColor: '#333', 
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 35,
  },
  activeNavText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
    top: 1,
    fontSize: 12,
  },
});


export default NavigationScreen
