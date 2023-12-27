import React from 'react';
import { Text, SafeAreaView, StyleSheet, FlatList, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ViewSwitch from './ViewSwitch';
import Nav from './Nav';
import Header from './Header';
import {useFonts} from 'expo-font'


export default function ListScreen({ navigation }) {

  const [loaded] = useFonts({
    Lato: require('../assets/fonts/Lato-Regular.ttf'),
    
  });
  if(!loaded) {
    return null;
  }

  const DATA = [
    {
      name: "Tacos Locos",
      location: "Armory",
      time: "4pm to 7pm",
      image: require('../assets/Food_trucks_Pitt_09.jpg'), // Path to your image
    },
    {
      name: "Jurassic Grill",
      location: "Green",
      time: "4pm to 7pm",
      image: require('../assets/JG.png'), 
    },
    {
      name: "McDonalds", 
      location: "FAR",
      time: "4pm to 7pm",
      image: require('../assets/MCD.png'), 
    },
    {
      name: "Canes", 
      location: "Green",
      time: "1pm to 3pm",
      image: require('../assets/Canes.webp'), 
    },
    {
      name: "La Paloma", 
      location: "Gregory St",
      time: "2pm to 9pm",
      image: require('../assets/LaPal.jpeg'),
    },
  ]
  
  const sortedData = DATA.sort((a, b) => a.name.localeCompare(b.name));


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Description')}>
      {item.image && <Image source={item.image} style={styles.image} />}
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.locationText}>{item.location}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Ionicons name="arrow-forward" size={20} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.todayHeader}>Today</Text>
      <FlatList
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <Nav navigation={navigation} currentScreen="ListScreen" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: 'stretch', 
  },
  columnHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '95%',
  },
  columnHeader: { 
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 20, 
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      width: '100%',
  },
  itemText: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Lato',
  },
  image: {
    width: 60, 
    height: 60, 
    borderRadius: 40,
    marginRight: 10,
  },
  todayHeader: {
    fontSize: 17,
    fontFamily: 'Lato',
    color: 'black',
    padding: 10,
    alignSelf: 'flex-start', 
  },
  locationText: {
    fontSize: 14, // Smaller font size
    color: 'grey',
    fontFamily: 'Lato',
  },
  timeText: {
    fontSize: 14, // Smaller font size
    color: 'grey',
    fontFamily: 'Lato',
  },
  itemContent: {
    flex: 1,
  },
  
});