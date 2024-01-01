import {Dimensions, StyleSheet, Image, Text, View, TouchableOpacity, Linking} from 'react-native';
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
    QuickSand: require('../assets/fonts/Quicksand-Regular.ttf'),
    QuickSandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
    QuickSandMedium: require('../assets/fonts/Quicksand-Medium.ttf'),
    QuickSandSemiBold: require('../assets/fonts/Quicksand-SemiBold.ttf'),
  });
  if(!loaded) {
    return null;
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
          <Icon name="arrowleft" size={25} color="black" />
        </TouchableOpacity>
      
      </View>
      <Text style={styles.foodtrucknameedit}>{foodtruckname}</Text>
      <View style={styles.timeAndTypeContainer}>
        <MaterialIcons name="access-time" size={24} color="black" />
        <Text style={styles.timeText}>{time}</Text>
        <MaterialCommunityIcons name="silverware" size={24} color="black" />
        <Text style={styles.foodTypeText}>{foodtype}</Text>
      </View>
      
      
      <View style={styles.images}>
        <Image 
          style={styles.imageBackground}
          source={require(foodtruckflick)} // Replace with the correct image path
        />
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
      <FontAwesome style={styles.house} name="home" size={20} color='black'/>
      <TouchableOpacity onPress={() => {
        openDirections()
      }}>
      <Text style={styles.locoedit}>{route.params.truck.location}</Text>
      </TouchableOpacity>
      <FontAwesome style={styles.globe} name="globe" size={20} color='black' />
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
       
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f9',
    

  },
  header: {
    flex: 0.4,
    backgroundColor: '#f3f4f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  images: {
    // Reduced from 1.4 for a smaller size
    flex: 1, // Adjust flex to control the size
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageBackground: {
    width: '45%',
    height: '88%',
    borderRadius: 20,
    overflow: 'hidden',
    bottom: '90%',
    left: '24%',
    position: 'relative',
  },
  map: {
    flex: 1,
    backgroundColor: '#f3f4f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeedits: {
    fontSize: 20,
    fontFamily: 'Lato',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    flexDirection: 'row',
  },
  clock: {
    color: 'black',
    left: 4,
    flexDirection: 'row',
  },
  foodtypeedit: {
    fontSize: 20,
    fontFamily: 'Lato',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    color: 'black',
    flexDirection: 'row',
    marginLeft: 5,


  },
  sliverware: {
    color: 'black',
    flexDirection: 'row',
    marginLeft: 5,

  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    right: isTablet ? 540 : 160, // Adjust positioning for tablets
    top: 30,
  },
  foodtrucknameedit: {
    fontSize: 55,
    fontFamily: 'QuickSandSemiBold',
    color: 'black',
    position: 'relative',
    top:'3%',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapStyle: {
    width: '90%', // Adjust width to half of the parent minus padding
    height: 200, // Fixed height to match the image
    borderRadius: 20, // Rounded corners
    overflow: 'hidden',
    postion: 'relative',
    bottom: '56%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  
  },
  descpition: {
    fontSize:14,
    fontFamily: 'QuickSandMedium',
    color: 'black',
   
  },
  aboutusedit: {
    fontSize:22,
    fontFamily: 'QuickSandMedium',
    color: 'black',
    
  },
  contact: {
    fontSize:22,
    fontFamily: 'QuickSandMedium',
    color: 'black',
    position: 'relative', 
    top: '2%', 
    
  },
  webbuttonstyle: {
    fontSize: 13,
    fontFamily: 'QuickSandMedium',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textDecorationLine: 'underline',
    bottom: '120%',
    left: '10%',
    position: 'relative',
    
  },
  locoedit: {
    fontSize:13,
    fontFamily: 'QuickSandMedium',
    color: 'black',
    textDecorationLine: 'underline',
    position: 'relative',
    bottom: '25%',
    left: '10%',
    width: '80%',

  }, 
  house: {
    top: '6%',
     
  },
  globe: {
    position: 'relative',
    bottom: '1%',
     
  },
  aboutus: {
    flex: 1.6,
    backgroundColor: 'white', // White background
    borderRadius: 20, // Rounded corners
    padding: 10, // Padding for content inside
    margin: 15, // Margin from the edges of the screen
    postion: 'relative',
    bottom: '3%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  },
  timeAndTypeContainer: {
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 10, 
    margin: 15, 
    postion: 'relative',
    width: '45%',
    height: '14%',
    top: '4%',
    flexDirection: 'column',
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },


});

// Header Temporary Removed//