import * as React from 'react';
import { Text, StyleSheet, FlatList, View, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Nav from './Nav';
import Header from './Header';
import { useFonts } from 'expo-font';
import { db } from './Config';
import { ref, get, child } from 'firebase/database';
import Geocoder from 'react-native-geocoding';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getDistance } from 'geolib';

export default function ListScreen({ navigation, route }) {

  const [truckData, setTruckData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [sortOption, setSortOption] = React.useState("name");

  React.useEffect(() => {
    console.log(route.params.currentUserLocation);
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setTimeout(() => {
        const dbRef = ref(db);
        get(child(dbRef, `users`)).then((dataSnapshot) => {
          if (dataSnapshot.exists()) {
            const users = Object.keys(dataSnapshot.val());
            for (var j = 0; j < users.length; j++) {
              const data = dataSnapshot.val()[users[j]]["data"];
              const trucks = Object.keys(data).map(key => ({
                  ...data[key]
              }))
              const sortedTruckData = trucks.sort((a, b) => {return a.name.localeCompare(b.name)});
              setTruckData([]);
              Geocoder.init("AIzaSyBzBg_8V451VUSWuujZtTcn03gHJBok97A");
              for (let i = 0; i < sortedTruckData.length; i++) {
                const startDate = new Date(sortedTruckData[i].startTime);
                const endDate = new Date(sortedTruckData[i].endTime);
                const currentDate = new Date(Date.now());
                if (currentDate >= startDate && currentDate <= endDate) {
                  Geocoder.from(sortedTruckData[i].location)
                  .then(json => {
                    var location = json.results[0].geometry.location;
                    sortedTruckData[i].coords = location;
                    setTruckData((prevData) => [...prevData, sortedTruckData[i]]);
                  })
                  .catch(error => console.warn(error));
                }               
              }
            }
          }
        });
        sort("name");
        setLoading(false);
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
      let timeStr = "";
      timeStr += date.split("T")[0] + ", ";
      const time =  date.split("T")[1];
      const hours = time.split(":")[0];
      const minutes = time.split(":")[1];
      if (hours > 12) {
        timeStr += (hours % 12) + ":" + minutes + "PM";
      } else {
        timeStr += time + "AM";
      }

      return timeStr;
    }

    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Description', {truck: item})}>
        {truckToImageMap.get(item.name) && <Image source={truckToImageMap.get(item.name)} style={styles.image} />}
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.timeText}>{getTime(item.startTime)} to {getTime(item.endTime)}</Text>
        </View>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    )
  }

  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  function sort(sortOptionSelected) {
    switch (sortOptionSelected) {
      case "name":
        const temp = truckData;
        temp.sort((a, b) => {return a.name.localeCompare(b.name)});
        setTruckData(temp);
        break;
      case "proximity":
        // do something
        const proximityTemp = truckData;
        proximityTemp.sort((a, b) => {return getDistance(a.coords, {
          latitude: route.params.currentUserLocation.latitude,
          longitude: route.params.currentUserLocation.longitude
        }) - getDistance(b.coords, {
          latitude: route.params.currentUserLocation.latitude,
          longitude: route.params.currentUserLocation.longitude
        })});
        //setTruckData(proximityTemp);
        break;
      case "closingTime":
        const newTemp = truckData;
        newTemp.sort((a, b) => {return new Date(b.endTime) - new Date(a.endTime)});
        setTruckData(newTemp);
        break;
    }
    setSortOption(sortOptionSelected);
  };

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
        <Header 
        currentScreen={"ListScreen"}
        handleNav={() => {navigation.navigate('MapScreen')}}
        />
      <View style={styles.searchBar}>
        <MaterialIcons style={styles.searchIcon} name="search" size={30} color="#000" />
        <TextInput 
          placeholder='Search...'
          placeholderColor = '#000'
          onChangeText={setSearch}
          value={search}
          style={styles.searchText}
        />
        <TouchableOpacity onPress={() => {setSearch("")}}>
          <MaterialIcons name="close" size={32} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} contentContainerStyle={styles.sortScrollView} style={{height:'5%'}}> 
        <Text style={styles.sortText}>Sort by:</Text>
        <TouchableOpacity style={[styles.sortButton, {backgroundColor: 
        (sortOption == "name" ? "gold" : "white")}]}
                          onPress={() => {sort("name")}}>
          <Text style={styles.sortOptionsText}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortButton, {backgroundColor: 
        (sortOption == "proximity" ? "gold" : "white")}]}
                                onPress={() => {sort("proximity")}}>
          <Text style={styles.sortOptionsText}>Proximity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.sortButton, {backgroundColor: 
        (sortOption == "closingTime" ? "gold" : "white")}]}
                                onPress={() => {sort("closingTime")}}>
          <Text style={styles.sortOptionsText}>Closing Time</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList style={{marginTop:'2%'}}
        data={truckData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
   
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
    backgroundColor: '#242526',
    paddingVertical: 20, 
    paddingHorizontal: 20,
    width: '90%',
    marginVertical: 6, // Half of 12 units for spacing between items
    borderRadius: 20, // Rounded corners
    alignSelf: 'center', // Ensure each item is centered horizontally
  },
  itemText: {
    flex: 1,
    fontSize: 20,
    color: 'white',
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
    color: '#B0B3B8',
    fontFamily: 'Lato',
  },
  timeText: {
    fontSize: 12, // Smaller font size
    color: '#B0B3B8',
    fontFamily: 'QuickSandMedium',
  },
  itemContent: {
    flex: 1,
  },
  searchBar: {
    height: '5%',
    marginVertical: '5%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderRadius: 35,
    width: '90%',
    paddingHorizontal: '4%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '30%'
  },
  searchText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Lato',
    width: '80%'
  },
  searchIcon: {
    width: '10%'
  }, 
  sortScrollView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    width:'115%',
    height:'100%',
  },
  sortText: {
    fontFamily: 'QuickSandSemiBold',
    color: 'white'
  }, 
  sortButton: {
    height: '100%',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderRadius: 55,
    width: '25%',
    alignItems: 'center',
  },
  sortOptionsText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'QuickSandMedium',
    top: '15%', 
  }
});

// Remove Header and Changed to SafeAreaView//