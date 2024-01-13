import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import Foundation from 'react-native-vector-icons/Foundation';

const Header = ({ currentScreen, handleRefresh }) => {
    const [loaded] = useFonts({
        Lato: require('../assets/fonts/Lato-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={[styles.safeArea, currentScreen === 'MapScreen' ? styles.mapScreenStyle : null]}>
            <Text style={styles.headerTitle}>Meals on Wheels</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                <Foundation name="refresh" size={40} color="white"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#13294B',
        paddingVertical: 30,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: "Lato",
        fontWeight: 'bold',
        color: 'white',
        width: '65%',
        textAlign: 'center',
        marginLeft: '7.5%',
        height: '100%',
        top: '5%',
    },
    mapScreenStyle: {
        // backgroundColor: '#ffffff',
        paddingVertical: 30,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        bottom: '173%', // Apply bottom margin only for MapScreen
    },
    refreshButton: {
        color: 'white',
        width: '7%',
        justifyContent: 'center',
        alignSelf: 'center',
        top: '3.5%',
        left: '50%'
    }
});

export default Header;
