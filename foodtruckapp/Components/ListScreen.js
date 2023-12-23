import { Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import * as React from 'react';
import ViewSwitch from './ViewSwitch';


export default function ListScreen({ navigation }) {

  const DATA = [
    {
      name: "Taco Bell", 
      location: "Armory",
      time: "4pm to 7pm",
    },
    {
      name: "Jurassic Grill", 
      location: "Green",
      time: "4pm to 7pm",
    },
    {
      name: "McDonalds", 
      location: "FAR",
      time: "4pm to 7pm",
    },
  ]
  
  const renderItem = ({ item }) => (
    <SafeAreaView style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.location}</Text>
      <Text style={styles.itemText}>{item.time}</Text>
    </SafeAreaView>
  )

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.columnHeaderContainer}>
        <Text style={styles.columnHeader}>NAME</Text>
        <Text style={styles.columnHeader}>LOCATION</Text>
        <Text style={styles.columnHeader}>TIME</Text>
      </SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      <ViewSwitch onMapScreen={false} onPressViewSwitch={() => {navigation.navigate("MapScreen")}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
    margin: "2.5%",
    backgroundColor: "#0a192f",
    alignItems: 'center', 
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
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    width: '90%',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});