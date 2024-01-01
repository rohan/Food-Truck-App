import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Nav from './Nav';
import Header from './Header';
import { db } from './Config';
import { ref, get, child } from 'firebase/database';
import Geocoder from 'react-native-geocoding';

export default function MapScreen({ navigation }) {  

    const [screenJustFocused, setScreenJustFocused] = React.useState(true);
    const GEOCODER_API_KEY = "AIzaSyBzBg_8V451VUSWuujZtTcn03gHJBok97A"
    const mapStyle = [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#242f3e',
            },
          ],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#746855',
            },
          ],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#242f3e',
            },
          ],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#263c3f',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#6b9a76',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#38414e',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#212a37',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9ca5b3',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#746855',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#1f2835',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#f3d19c',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#2f3948',
            },
          ],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#17263c',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#515c6d',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#17263c',
            },
          ],
        },
      ];

    const [truckData, setTruckData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
  
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
          
          setLoading(false);
        }, 1000);     
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]);

    mapMarkers = () => {
      if (truckData.length > 0) {
        return truckData.map((truck) =>
          <Marker
            coordinate={{ latitude: truck.coords.lat, longitude: truck.coords.lng}}
            title={truck.name}
            identifier={truck.key}
            key={truck.key}
            onPress={() => navigation.navigate("Description", {truck: truck})}
          />
        )
      }
    }

    const _mapView = React.createRef();
    function _animateToUserPosition(coordinate) {
        if (_mapView.current) {
          _mapView.current.animateToRegion(
            {
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            500
          );
        }
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
        <MapView 
            style={styles.map}
            customMapStyle={mapStyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            pitchEnabled={true}
            rotateEnabled={true}
            zoomEnabled={true}
            scrollEnabled={true}
            ref={_mapView}
            onUserLocationChange={(userPosition) => {
              if (screenJustFocused) {
                _animateToUserPosition(userPosition.nativeEvent.coordinate);
                setScreenJustFocused(false);
              }
            }}
        >
           {mapMarkers()}
        </MapView>
        <Header currentScreen="MapScreen" />
        <Nav navigation={navigation} currentScreen="MapScreen" />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#13294B',
    justifyContent: 'flex-end',
    alignItems: "stretch"
  },
  map: {
    width: '100%',
    height: '90%',
    position: 'absolute',
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
}
});