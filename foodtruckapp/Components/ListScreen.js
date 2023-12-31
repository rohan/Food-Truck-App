import * as React from 'react';
import { Text, StyleSheet, FlatList, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Nav from './Nav';
import Header from './Header';
import {useFonts} from 'expo-font';
import { db } from './Config';
import { ref, get, child } from 'firebase/database';
import Geocoder from 'react-native-geocoding';

export default function ListScreen({ navigation }) {

  const [truckData, setTruckData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setTimeout(() => {
        const dbRef = ref(db);
        get(child(dbRef, `users/82LyYqZ73TZ2XUZizHj9piktknm1/data`)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const trucks = Object.keys(data).map(key => ({
                ...data[key]
            }))
            const sortedTruckData = trucks.sort((a, b) => a.name.localeCompare(b.name));
            setTruckData([]);
            Geocoder.init("AIzaSyBzBg_8V451VUSWuujZtTcn03gHJBok97A");
            for (let i = 0; i < sortedTruckData.length; i++) {
              Geocoder.from(sortedTruckData[i].location)
              .then(json => {
                var location = json.results[0].geometry.location;
                sortedTruckData[i].coords = location;
                setTruckData((prevData) => [...prevData, sortedTruckData[i]]);
              })
              .catch(error => console.warn(error));
            }
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
        });
        setLoading(true);
      }, 1000);     
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const [loaded] = useFonts({
    Lato: require('../assets/fonts/Lato-Regular.ttf'),
    
  });
  if(!loaded) {
    return null;
  }

  const truckToImageMap = new Map([
    ["Sample", require('../assets/Food_trucks_Pitt_09.jpg')],
    ["JGrill", require('../assets/JG.png')],
    ["a", require('../assets/MCD.png')]
  ])

  function Item({ item }) {

    function getDate() {
      return item.startTime.split("T")[0];
    }

    function getTime(date) {
      const time =  date.split("T")[1];
      const hours = time.split(":")[0];
      const minutes = time.split(":")[1];
      if (hours > 12) {
        return (hours % 12) + ":" + minutes + "PM";
       } else {
        return time + "AM";
       }
    }

    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Description', {truck: item})}>
        {truckToImageMap.get(item.name) && <Image source={truckToImageMap.get(item.name)} style={styles.image} />}
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.timeText}>{getDate()}</Text>
          <Text style={styles.timeText}>{getTime(item.startTime)} to {getTime(item.endTime)}</Text>
        </View>
        <Ionicons name="arrow-forward" size={20} color="black" />
      </TouchableOpacity>
    )
  }

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.todayHeader}>Active Food Trucks</Text>
      <FlatList
        data={truckData}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
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