import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Nav from './Nav';
import Header from './Header';
import { db } from './Config';
import { ref, get, child } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

import Geocoder from 'react-native-geocoding';

export default function MapScreen({ navigation }) {  

    const [screenJustFocused, setScreenJustFocused] = React.useState(true);
    const GEOCODER_API_KEY = "AIzaSyBzBg_8V451VUSWuujZtTcn03gHJBok97A"
    const mapStyle = [
      {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#202c3e"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "gamma": 0.01
              },
              {
                  "lightness": 20
              },
              {
                  "weight": "1.39"
              },
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "weight": "0.96"
              },
              {
                  "saturation": "9"
              },
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 30
              },
              {
                  "saturation": "9"
              },
              {
                  "color": "#29446b"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "saturation": 20
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 20
              },
              {
                  "saturation": -20
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 10
              },
              {
                  "saturation": -30
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#193a55"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "saturation": 25
              },
              {
                  "lightness": 25
              },
              {
                  "weight": "0.01"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "lightness": -20
              }
          ]
      }
  ];

    const [truckData, setTruckData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
  
    React.useEffect(() => {
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
                console.log(data);
                const trucks = Object.keys(data).map(key => ({
                    ...data[key]
                }))
                const sortedTruckData = trucks.sort((a, b) => a.name.localeCompare(b.name));
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
          >
            <Image source={require('../assets/truck_marker.png')} style={{width: 35, height: 55}} />
          </Marker>
        )
      }
    }

    const _mapView = React.createRef();
    React.useEffect(() => {
      _animateToFitMarkers(truckData);
    }, [truckData, _mapView.current != null])

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

    function _animateToFitMarkers(markers) {
      if (_mapView.current && markers.length > 0) {
        _mapView.current.fitToSuppliedMarkers(
          markers.map(({ key }) => key),
          {
            animated: true,
            edgePadding: {
              top: 20,
              left: 20,
              right: 20,
              bottom: 20
            }
          }
        );
      }
    }

    const [currentUserLocation, setCurrentUserLocation] = React.useState();
    return (
    <View style={styles.container}>
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
            onUserLocationChange={(pos) => setCurrentUserLocation(pos.nativeEvent.coordinate)}
        >
           {mapMarkers()}
        </MapView>
        <Header currentScreen="MapScreen"         
          handleNav={() => {navigation.navigate('ListScreen')}}
        />
        <TouchableOpacity
          style={styles.locationFocus}
          onPress={() => {
            _animateToUserPosition(currentUserLocation);
          }}
        >
          <Ionicons name="locate-outline" size={30}/>
        </TouchableOpacity>
    </View>
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