import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import Foundation from 'react-native-vector-icons/Foundation';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ currentScreen, handleRefresh, handleNav }) => {
    const [loaded] = useFonts({
        Lato: require('../assets/fonts/Lato-Regular.ttf'),
        QuickSand: require('../assets/fonts/Quicksand-Regular.ttf'),
        QuickSandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
        QuickSandMedium: require('../assets/fonts/Quicksand-Medium.ttf'),
        QuickSandSemiBold: require('../assets/fonts/Quicksand-SemiBold.ttf'),
        PlayfairDisplay: require("../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
      });
      if(!loaded) {
        return null;
      }

    return (
        <View style={styles.safeArea}>
            <TouchableOpacity style={styles.navButton} onPress={handleNav}>
                <Ionicons style={styles.button} name={currentScreen === "ListScreen" ? "map" : "list"} size={40} color="white"/>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Meals on Wheels</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                <Foundation name="refresh" size={40} color="white"/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#000',
        paddingVertical: 30,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: "PlayfairDisplay",
        fontWeight: 'bold',
        color: 'white',
        width: '65%',
        textAlign: 'center',
        height: '100%',
        top: '5%',
    },

    refreshButton: {
        color: '#BB86FC',
        width: '7%',
        justifyContent: 'center',
        alignSelf: 'center',
        top: '3.5%',
        left: '20%'
    },
    navButton: {
        color: '#BB86FC',
        width: '7%',
        justifyContent: 'center',
        alignSelf: 'center',
        top: '3.5%',
    }
});

export default Header;
