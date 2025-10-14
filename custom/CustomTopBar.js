import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ---------------------------------------------------

// Props: title, leftIconName, onLeftPress, rightIconName, onRightPress
const CustomTopBar = ({ 
    title = '', 
    leftIconName, 
    onLeftPress, 
    rightIconName, 
    onRightPress, 
    showBackButton = false // Naya prop: Agar true ho toh default back button dikhayega
}) => {
    
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    // Default Back Button Logic (Aam taur par Stack Navigator mein hota hai)
    const handleBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
        // Agar back nahi ja sakte aur koi custom press function nahi hai toh kuch nahi karega
    };

    // Left Side Content
    const LeftContent = () => {
        if (showBackButton) {
            return (
                <TouchableOpacity onPress={onLeftPress || handleBackPress} style={styles.iconContainer}>
                    <Ionicons name="chevron-back" size={16} color="#333" />
                </TouchableOpacity>
            );
        }
        if (leftIconName) {
            return (
                <TouchableOpacity onPress={onLeftPress} style={styles.iconContainer}>
                    <Ionicons name={leftIconName} size={20} color="#333" />
                </TouchableOpacity>
            );
        }
        // Agar kuch na ho toh empty space
        return <View style={styles.iconContainer} />; 
    };

    // Right Side Content
    const RightContent = () => {
        if (rightIconName) {
            return (
                <TouchableOpacity onPress={onRightPress} style={styles.iconContainer}>
                    <Ionicons name={rightIconName} size={20} color="#333" />
                </TouchableOpacity>
            );
        }
        // Agar kuch na ho toh empty space
        return <View style={styles.iconContainer} />; 
    };

    return (
        <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
            <View style={styles.headerContent}>
                
                {/* Left Side */}
                <LeftContent />

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
                </View>

                {/* Right Side */}
                <RightContent />
                
            </View>
        </View>
    );
};

// ---------------------------------------------------

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff', 
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingHorizontal: width * 0.05,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50, // Standard height
    },
    iconContainer: {
        width: 40, // Icons ke liye fixed area
        justifyContent: 'center',
        alignItems: 'center',
        // Optional: Padding for easier tap
    },
    titleContainer: {
        flex: 1, // Title ko zyada space dene ke liye
        alignItems: 'center',
    },
    titleText: {
        fontSize: 14,
        color: '#333',
        maxWidth: '90%',
        letterSpacing: 0.8,
        fontWeight: 400,
    },
    
});

export default CustomTopBar;