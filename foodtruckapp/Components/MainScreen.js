import * as React from 'react';
import {Dimensions, StyleSheet, Image, Text, View, TouchableOpacity, Linking, ImageBackground} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFonts} from 'expo-font'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import foodTruckAttributeMap from './FoodTruckAttributes';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MapScreen from './MapScreen';
import ListScreen from './ListScreen';


import Geocoder from 'react-native-geocoding';

export default function MainScreen({ navigation }) {  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Map' },
      { key: 'second', title: 'Browse' },
    ]);


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

    const FirstRoute = () => (
        <MapScreen />
      );
      
      const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
        </View>
      );

      const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      });

      return (
        <View style={styles.container}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: '100%' }}
            renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#161629'}}/>}
            style={{marginTop: '5%'}}
          />
        </View >
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#13294B',
    },
    map: {
      width: '100%',
      height: '100%',
      position: 'absolute'
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
    descriptionButton: {
      position: 'absolute',
      bottom: 50,
      alignSelf: 'center',
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
  },
  descriptionButtonText: {
      color: 'white',
      fontWeight: 'bold',
  },
  locationFocus: {
    backgroundColor: '#d4d4d4',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 50,
    marginHorizontal: '2%',
    bottom: '3%',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    position: 'absolute',
    alignSelf: 'flex-end',
    right: '3%',
    opacity: 0.8
  },
  });