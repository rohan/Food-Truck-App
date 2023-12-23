import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as React from 'react';

export default function ViewSwitch({ onMapScreen, onPressViewSwitch }) {
    return (
        <View style={styles.viewSwitch}>
        <TouchableOpacity
            style={[styles.viewButton, {
                borderRightWidth: 1,
                borderRightColor: 'white',
                backgroundColor: onMapScreen ? 'white' : '#3a3b3c',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
            }]}
            disabled={onMapScreen}
            onPress={onPressViewSwitch}
        >
            <Text style={[styles.viewButtonText, {color: onMapScreen ? '#3a3b3c' : 'white'}]}>
            Map
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.viewButton, {
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: !onMapScreen ? 'white' : '#3a3b3c',
            }]}
            onPress={onPressViewSwitch}
            disabled={!onMapScreen}
        >
            <Text style={[styles.viewButtonText, {color: !onMapScreen ? '#3a3b3c' : 'white'}]}>
            List
            </Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#000',
      justifyContent: 'flex-end'
    },
    map: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    viewSwitch: {
      backgroundColor: '#3a3b3c',
      width: '70%',
      height: '10%',
      alignSelf: 'center',
      marginBottom: '10%',
      borderRadius: 20,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'white'
    },
    viewButton: {
      width: '50%',
      height: '100%',
      justifyContent: 'center',
    },
    viewButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
  });