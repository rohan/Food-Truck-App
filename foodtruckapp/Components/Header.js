import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Header = ({ currentScreen }) => {
    const [loaded] = useFonts({
        Lato: require('../assets/fonts/Lato-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={[styles.safeArea, currentScreen === 'MapScreen' ? styles.mapScreenStyle : null]}>
            <Text style={styles.headerTitle}>Wheel's & Meals UIUC</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#13294B',
        paddingVertical: 30,
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: "Lato",
        fontWeight: 'bold',
        color: 'white',
        top: '90%',
    },
    mapScreenStyle: {
        bottom: '80.5%', // Apply bottom margin only for MapScreen
    },
});

export default Header;
