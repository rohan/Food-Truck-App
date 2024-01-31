import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import Foundation from 'react-native-vector-icons/Foundation';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ currentScreen, handleRefresh, handleNav, navigation }) => {
    const [loaded] = useFonts({
        Lato: require('../assets/fonts/Lato-Regular.ttf'),
        QuickSand: require('../assets/fonts/Quicksand-Regular.ttf'),
        QuickSandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
        QuickSandMedium: require('../assets/fonts/Quicksand-Medium.ttf'),
        QuickSandSemiBold: require('../assets/fonts/Quicksand-SemiBold.ttf'),
        PlayfairDisplay: require("../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
        UberMove: require('../assets/fonts/UberMoveMedium.otf'),
        UberMoveBold: require('../assets/fonts/UberMoveBold.otf')
      });
      if(!loaded) {
        return null;
      }

    return (
        <View style={styles.safeArea}>
            <TouchableOpacity style={[styles.navButton, {borderBottomColor: currentScreen === "MapScreen" ? 'white' : '#c0c0c8'}]} onPress={handleNav} disabled={currentScreen == "MapScreen"}>
                <Image source={require('../assets/mapscreenicon2.png')} style={styles.mapIcon}/>
                <Text style={styles.buttonText}> Map </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navButton, {borderBottomColor: currentScreen === "ListScreen" ? 'white' : '#c0c0c8'}]} onPress={handleNav} disabled={currentScreen == "ListScreen"}>
            <Image source={require('../assets/browsetruckicon.png')} style={styles.browseIcon}/>
                <Text style={styles.buttonText}> Browse </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#161629',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        height: '12%',
        bottom: '88%'
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: "UberMoveBold",
        fontWeight: 'bold',
        color: 'white',
        width: '65%',
        textAlign: 'center',
        height: '100%',
        top: '5%',
    },
    buttonText: {
        fontFamily: 'UberMove',
        color: 'white',
        fontSize: 24,
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
        width: '50%',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        borderBottomWidth: 3,
        height: '100%',
        paddingTop: '15%'
    },
    mapIcon: {
        resizeMode: 'contain',
        width: '30%',
        bottom: '85%'
    },
    browseIcon: {
        resizeMode: 'contain',
        width: '30%',
        bottom: '111%'
    },
});

export default Header;
