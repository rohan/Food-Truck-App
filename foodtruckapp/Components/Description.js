import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet,ImageBackground, Text, View, SafeAreaView , titles, Image, TouchableOpacity, Button, Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFonts} from 'expo-font'
import MapView, { Marker } from 'react-native-maps';


const time ='9:00 AM to 5:00 PM';
const foodtruckname= "FOOD TRUCK";
const foodtype= "Mexican";
const foodtruckurl= "https://www.reddit.com/r/UIUC/comments/u6tvw8/list_of_food_trucks_on_campus/";
const foodtruckflick= "../assets/Food_trucks_Pitt_09.jpg";
const foodtruckfacebook= "https://www.facebook.com/Cristiano/"


const Description = ({ navigation }) => {
  const [loaded] = useFonts({
    Lato: require('../assets/fonts/Lato-Regular.ttf'),
    
  });
  if(!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
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
          
          initialRegion={{
            latitude: 40.110588, // Latitude for Green St, Urbana, IL
            longitude: -88.233296, // Longitude for Green St, Urbana, IL
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          <Marker
            coordinate={{
              latitude: 40.110588, // Latitude for Green St, Urbana, IL
              longitude: -88.233296, // Longitude for Green St, Urbana, IL
            }}
            title={foodtruckname}
            pinColor="#FF5F05" // Use any color you prefer
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
      <Text style={styles.locoedit}>Urbana</Text>
      <FontAwesome style={styles.globe} name="globe" size={20} color='#13294B' />
        <TouchableOpacity onPress={async () => {
          const supported = await Linking.canOpenURL(foodtruckurl);
          if (supported) {
          await Linking.openURL(foodtruckurl);
          } else {
          console.log("Don't know how to open this URL: " + foodtruckurl);
          }
          }}>
        <Text style={styles.webbuttonstyle}>Website</Text>
        </TouchableOpacity>
        <View style={styles.separatorLinethree} />
        <TouchableOpacity 
        style={styles.facebookButton} 
        onPress={openFacebookPage}
        >
        <FontAwesome name="facebook" size={24} color="#FFFFFF" />
        </TouchableOpacity>
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
    width: 30, // Diameter of the circle
    height: 30, // Diameter of the circle
    borderRadius: 20,
    justifyContent: 'center', // Center the icon horizontally
    alignItems: 'center',  // Half the diameter to make it a perfect circle
    backgroundColor: "#FF5F05",
    right: 160,
    top:30,
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
  facebookButton: {
    position: 'absolute',
    right: 19,
    bottom: 55,
    backgroundColor: '#3b5998', // Facebook blue color
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
const openFacebookPage = () => {
    const url = foodtruckfacebook
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
  };
export default Description;