import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ViewSwitch from './ViewSwitch';
import Geocoder from 'react-native-geocoding';
import Nav from './Nav';
import Header from './Header';

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

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // The screen is focused
        // Call any action
        Geocoder.init(GEOCODER_API_KEY);
        Geocoder.from("Cocomero", {
          //40.093346171727056, -88.25784343096215
          //40.12704879226831, -88.21812886505093
          southwest: {lat: 40.093346171727056, lng: -88.25784343096215},
          northeast: {lat: 40.12704879226831, lng: -88.21812886505093}})
          .then(json => {
            var location = json.results[0].geometry.location;
            console.log(location);
          })
          .catch(error => console.warn(error));
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]);

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
       <Header />
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
           <Marker
                    coordinate={{ latitude: 40.110558, longitude: -88.228333 }}
                    title={"Patel Brothers"} // Optional
                    onPress={() => navigation.navigate("Description")}
                />
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
    backgroundColor: '#000',
    justifyContent: 'flex-end'
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
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