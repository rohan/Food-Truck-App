import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Nav = ({ navigation, currentScreen }) => {
    const windowWidth = Dimensions.get('window').width;
    const isTablet = windowWidth > 768; 

        return (
            <View style={[styles.navContainer, isTablet && styles.navContainerTablet]}>
                <TouchableOpacity 
                    style={[styles.navButton, isTablet && styles.haha]}
                    onPress={() => navigation.navigate('MapScreen')}
                >
                    <Ionicons style={styles.button} name="map" size={40} color={currentScreen === 'MapScreen' ? "white" : "grey"} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.navButton, isTablet && styles.haha]}
                    onPress={() => navigation.navigate('ListScreen')}
                >
                    <Ionicons style={styles.button} name="list" size={40} color={currentScreen === 'ListScreen' ? "white" : "grey"} />
                </TouchableOpacity>
            </View>
        );
    };
    

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#13294B',
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
        
    },
    navContainerMap: {
        top: '0%',
    },
    navContainerList: {
        top: '0%',
    },
    navButton: {
        padding: 10,
        marginHorizontal: 70,
    },
    button: {
        bottom: '20%',
    },
    navContainerTablet: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#13294B',
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: '100%',
        bottom: '-1%',
    },
    haha: {
        padding: 10,
        marginHorizontal: 350,
    },
    
   
});

export default Nav;
