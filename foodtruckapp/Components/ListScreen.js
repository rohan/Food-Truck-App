import * as React from 'react';
import { Text, StyleSheet, FlatList, View, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Nav from './Nav';
import Header from './Header';
import { useFonts } from 'expo-font';
import { db } from './Config';
import { ref, get, child } from 'firebase/database';
import Geocoder from 'react-native-geocoding';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        // get(child(dbRef, `users/`)).then((snapshot) => {
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

  const [search, setSearch] = React.useState("");
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
    <View style={styles.container}>
        <Header handleRefresh={() => {
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
                  
                  setLoading(false);
                }, 1000);       
        }}/>
      <View style={styles.searchBar}>
        <MaterialIcons style={styles.searchIcon} name="search" size={30} color="#000" />
        <TextInput 
          placeholder='Search...'
          onChangeText={setSearch}
          value={search}
          style={styles.searchText}
        />
        <TouchableOpacity onPress={() => {setSearch("")}}>
          <MaterialIcons name="close" size={32} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={truckData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{marginTop: 6}}
      />
      <Nav navigation={navigation} currentScreen="ListScreen" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f9",
   
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
      width: '90%',
      marginVertical: 6, // Half of 12 units for spacing between items
      borderRadius: 20, // Rounded corners
      alignSelf: 'center', // Ensure each item is centered horizontally
      shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,


  },
  itemText: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontFamily: 'QuickSandSemiBold',
  },
  image: {
    width: 60, 
    height: 60, 
    borderRadius: 40,
    marginRight: 10,
  },
  todayHeader: {
    fontSize: 20,
    fontFamily: 'QuickSandMedium',
    color: 'black',
    padding: 10,
    alignSelf: 'flex-start', 
  },
  locationText: {
    fontSize: 12, // Smaller font size
    color: 'grey',
    fontFamily: 'Lato',
  },
  timeText: {
    fontSize: 12, // Smaller font size
    color: 'grey',
    fontFamily: 'QuickSandMedium',
  },
  itemContent: {
    flex: 1,
  },
  searchBar: {
    height: '8%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    paddingHorizontal: '4%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchText: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Lato',
    width: '80%'
  },
  searchIcon: {
    width: '10%'
  }
});

// Remove Header and Changed to SafeAreaView//