import {Dimensions, StyleSheet, ImageBackground, Text, View, TouchableOpacity, Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFonts} from 'expo-font'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';

const windowWidth = Dimensions.get('window').width;
const isTablet = windowWidth > 768; 

export default function Description({ navigation, route }) {
  const time = getTime(route.params.truck.startTime) + " to " + getTime(route.params.truck.endTime);
  const foodtruckname= route.params.truck.name;
  const foodtype= "[CUISINE TYPE]";
  const websiteurl= "[WEBSITE URL]";
  const foodtruckflick= "../assets/Food_trucks_Pitt_09.jpg";
  const foodtruckfacebook= "https://www.facebook.com/Cristiano/"

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

  const [loaded] = useFonts({
    Lato: require('../assets/fonts/Lato-Regular.ttf'),
    
  });
  if(!loaded) {
    return null;
  }

  const openFacebookPage = () => {
    const url = foodtruckfacebook
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
  };

  const openWebsite = () => {
    Linking.openURL(websiteurl).catch(err => console.error("An error occurred", err))
  }

  const openDirections = () => {
    const data = {
     destination: {
       latitude: route.params.truck.coords.lat,
       longitude: route.params.truck.coords.lng
     },
     params: [
       {
         key: "travelmode",
         value: "driving"        // may be "walking", "bicycling" or "transit" as well
       },
       {
         key: "dir_action",
         value: "navigate"       // this instantly initializes navigation using the given travel mode
       }
     ],
    }
    getDirections(data)
  }

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowleft" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headername}>Wheel’s & Meals UIUC</Text>
      </View>
      <View style={styles.images}>
        <ImageBackground 
          style={styles.imageBackground}
          source={require(foodtruckflick)} 
          resizeMode="cover" 
        >
          <View style={styles.translucentOverlay} />
          <Text style={styles.foodtrucknameedit}>{foodtruckname}</Text>
          <MaterialIcons style={styles.clock} name="access-time" size={24} color="#000" />
          <Text style={styles.timeedits}>{time}</Text>
          <MaterialCommunityIcons style={styles.sliverware} name="silverware" size={24} color="#000" />
          <Text style= {styles.foodtypeedit}> {foodtype}</Text>
        </ImageBackground>
      </View>
      <View style={styles.map}>
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: route.params.truck.coords.lat, // Latitude for Green St, Urbana, IL
            longitude: route.params.truck.coords.lng, // Longitude for Green St, Urbana, IL
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          <Marker
            coordinate={{
              latitude: route.params.truck.coords.lat, // Latitude for Green St, Urbana, IL
              longitude: route.params.truck.coords.lng, // Longitude for Green St, Urbana, IL
            }}
            title={foodtruckname}
            pinColor="#FF5F05" // Use any color you prefer
            onPress={() => {openDirections()}}
          />
        </MapView>
      </View>
      <View style={styles.aboutus}>
      <View style={styles.separatorLineone} />
          <Text style={styles.aboutusedit}>About Us</Text>
          
          <Text style={styles.descpition}>Indulge in the savory delights of the Rolling Bistro, a gourmet food truck specializing in a fusion of classic American and exotic Mediterranean flavors.</Text>
          <View style={styles.separatorLinetwo} />
      <Text style={styles.contact}>Contact</Text>
      <FontAwesome style={styles.house} name="home" size={20} color='#13294B'/>
      <TouchableOpacity onPress={() => {
        openDirections()
      }}>
      <Text style={styles.locoedit}>{route.params.truck.location}</Text>
      </TouchableOpacity>
      <FontAwesome style={styles.globe} name="globe" size={20} color='#13294B' />
        <TouchableOpacity onPress={async () => {
          const supported = await Linking.canOpenURL(foodtruckurl);
          if (supported) {
          await Linking.openURL(foodtruckurl);
          } else {
          console.log("Don't know how to open this URL: " + foodtruckurl);
          }
          }}>
          <Text style={styles.webbuttonstyle}>
          Website
          </Text>
        </TouchableOpacity>
        <View style={styles.separatorLinethree} />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13294B',
  },
  header: {
    flex: 0.4,
    backgroundColor: '#13294B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  images: {
    flex: 1.4,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1.7,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',

  },
  aboutus: {
    flex:1.6,
    backgroundColor: 'white',
  },

  headername: {
    fontSize: 20,
    fontFamily: "Lato",
    justifyContent: 'center',
    alignItems: 'center',
    top: 4,
    fontWeight: 'bold',
    color: 'white',
  },
  timeedits: {
    fontSize: 20,
    fontFamily: 'Lato',
    justifyContent: 'center',
    alignItems: 'center',
    top: 91,
    left: 31,
    color: '#13294B',
  },
  clock: {
    top:116,
    color: '#13294B',
    left: 4,
  },
  foodtypeedit: {
    fontSize: 20,
    fontFamily: 'Lato',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 21,
    color: '#13294B',
    top:67,
    left:29,
  },
  sliverware: {
    color: '#13294B',
    top:93,
    left:4,

  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FF5F05",
    right: isTablet ? 540 : 160, // Adjust positioning for tablets
    top: 30,
  },
  imageBackground: {
    width: '100%', // Ensure the width covers the parent
    height: '100%', // Ensure the height covers the parent
  },
  translucentOverlay: {
    ...StyleSheet.absoluteFillObject, // This will cover the entire parent view
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the opacity to your liking
  },
  foodtrucknameedit: {
    fontSize: 40,
    fontFamily: 'Lato',
    fontWeight: 'bold',
    color: '#13294B',
    top:116,
    left:4,
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  descpition: {
    fontSize:15,
    fontFamily: 'Lato',
    color: '#13294B',
    bottom:8,
    left: 8,
  },
  aboutusedit: {
    fontSize:22,
    fontFamily: 'Lato',
    color: '#13294B',
    bottom:12,
    left:8,
  },
  contact: {
    fontSize:22,
    fontFamily: 'Lato',
    color: '#13294B',
    bottom:26,
    left:8,
  },
  webbuttonstyle: {
    fontSize: 15,
    fontFamily: 'Lato',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#13294B',
    textDecorationLine: 'underline',
    bottom:49,
    left:32,
    
  },
  locoedit: {
    fontSize:15,
    fontFamily: 'Lato',
    color: '#13294B',
    left:32,
    bottom:38,
    textDecorationLine: 'underline',

  }, 
  house: {
    left:8,
    bottom:19,
  },
  globe: {
    left:8,
    bottom:28,
  },
  
  separatorLineone: {
    height: 1, // Thin line
    backgroundColor: 'grey', // Grey color
    marginTop: 15, // Adjust spacing above the line
    marginBottom: 15, // Adjust spacing below the line
    marginLeft: 7, // Adds space on the left side
    marginRight: 7,
    
  },
  separatorLinethree: {
    height: 1, // Thin line
    backgroundColor: 'grey', // Grey color
    marginTop: 15, // Adjust spacing above the line
    marginBottom: 15, // Adjust spacing below the line
    marginLeft: 7, // Adds space on the left side
    marginRight: 7,
    bottom:50,
  },
  separatorLinetwo: {
    height: 1, // Thin line
    backgroundColor: 'grey', // Grey color
    marginTop: 15, // Adjust spacing above the line
    marginBottom: 15, // Adjust spacing below the line
    marginLeft: 7, // Adds space on the left side
    marginRight: 7,
    bottom:13,
  },
});