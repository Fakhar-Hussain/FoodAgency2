import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView // Agar options bohot zyada hon toh scroll use kar sakte hain
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

import CustomTopBar from '../custom/CustomTopBar'; // File path adjust karein

const { width } = Dimensions.get('window');

// --- Profile Options Data ---
const profileOptions = [
  // { 
  //   id: '12', 
  //   name: 'My Orders', 
  //   icon: 'bag-handle-outline', 
  //   library: Ionicons, 
  //   screen: 'OrderHistory' 
  // },
  // { 
  //   id: '13', 
  //   name: 'My Orders', 
  //   icon: 'bag-handle-outline', 
  //   library: Ionicons, 
  //   screen: 'OrderHistory' 
  // },
  // { 
  //   id: '14', 
  //   name: 'My Orders', 
  //   icon: 'bag-handle-outline', 
  //   library: Ionicons, 
  //   screen: 'OrderHistory' 
  // },
  { 
    id: '1', 
    name: 'My Orders', 
    icon: 'bag-handle-outline', 
    library: Ionicons, 
    screen: 'OrderHistory' 
  },
  { 
    id: '2', 
    name: 'Addresses', 
    icon: 'location-outline', 
    library: Ionicons, 
    screen: 'Addresses' 
  },
  { 
    id: '3', 
    name: 'Payment Methods', 
    icon: 'card-outline', 
    library: Ionicons, 
    screen: 'PaymentMethods' 
  },
  { 
    id: '4', 
    name: 'Settings', 
    icon: 'settings-outline', 
    library: Ionicons, 
    screen: 'Settings' 
  },
];

// ---------------------------------------------------

const ProfileScreen = ({ navigation }) => {

    // --- Single Option Item Component ---
    const OptionItem = ({ item }) => {
        const IconComponent = item.library;

        return (
            <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => navigation.navigate(item.screen)}
            >
                <View style={styles.optionLeft}>
                    {/* Icon */}
                    <View style={styles.iconCircle}>
                        <IconComponent name={item.icon} size={20} color="#333" />
                    </View>
                    {/* Text */}
                    <Text style={styles.optionText}>{item.name}</Text>
                </View>
                
                {/* Arrow */}
                <Ionicons name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>
        );
    };

    // --- Main Content ---
    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomTopBar
              title="Profile"
              // showBackButton={true}
              rightIconName="basket-outline"
              onRightPress={() => navigation.navigate('CartStack')}
            />   
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                

                {/* 2. User Info Card */}
                <View style={styles.userInfoCard}>
                    <Image
                        source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} 
                        style={styles.profileImage}
                    />
                    <View style={styles.userInfoText}>
                        <Text style={styles.userName}>Ali Khan</Text>
                        <Text style={styles.userEmail}>ali.khan@example.com</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
                        <Feather name="edit-3" size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* 3. Options List */}
                <View style={styles.optionsList}>
                    {profileOptions.map(item => (
                        <OptionItem key={item.id} item={item} />
                    ))}
                </View>

                {/* 4. Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Logging Out...')}>
                    <MaterialIcons name="logout" size={22} color="#fff" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

// ---------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  container: {
    paddingHorizontal: width * 0.05,
    paddingTop: 10,
    paddingBottom: 100, // Bottom navigation ke liye space
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },

  // --- User Info Card Styles ---
  userInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  userInfoText: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  editButton: {
    padding: 5,
  },

  // --- Options List Styles ---
  optionsList: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#f5f5f5', // Light background for icon
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },

  // --- Logout Button Styles ---
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;