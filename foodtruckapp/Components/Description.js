import * as React from "react";
import {
  Dimensions,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import getDirections from "react-native-google-maps-directions";
import foodTruckAttributeMap from "./FoodTruckAttributes";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const windowWidth = Dimensions.get("window").width;
const isTablet = windowWidth > 768;

export default function Description({ navigation, route }) {
  const startTime = getTime(route.params.truck.startTime) + " to ";
  const endTime = getTime(route.params.truck.endTime);
  const foodtruckname = route.params.truck.name;
  const foodtype = foodTruckAttributeMap().get(foodtruckname).cuisineType;
  const websiteurl = foodTruckAttributeMap().get(foodtruckname).websiteURL;
  const foodtruckflick = foodTruckAttributeMap().get(foodtruckname).image;
  const foodtruckdescription =
    foodTruckAttributeMap().get(foodtruckname).description;

  function getTime(date) {
    let timeStr = "";
    timeStr += date.split("T")[0] + ", ";
    const time = date.split("T")[1];
    const hours = time.split(":")[0];
    const minutes = time.split(":")[1];
    if (hours > 12) {
      timeStr += (hours % 12) + ":" + minutes + "PM";
    } else {
      timeStr += time + "AM";
    }

    return timeStr;
  }

  const openDirections = () => {
    const data = {
      destination: {
        latitude: route.params.truck.coords.lat,
        longitude: route.params.truck.coords.lng,
      },
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };
    getDirections(data);
  };

  const mapStyle = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [
        {
          color: "#202c3e",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [
        {
          gamma: 0.01,
        },
        {
          lightness: 20,
        },
        {
          weight: "1.39",
        },
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [
        {
          weight: "0.96",
        },
        {
          saturation: "9",
        },
        {
          visibility: "on",
        },
        {
          color: "#000000",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          lightness: 30,
        },
        {
          saturation: "9",
        },
        {
          color: "#29446b",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          saturation: 20,
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          lightness: 20,
        },
        {
          saturation: -20,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 10,
        },
        {
          saturation: -30,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#193a55",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          saturation: 25,
        },
        {
          lightness: 25,
        },
        {
          weight: "0.01",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          lightness: -20,
        },
      ],
    },
  ];

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Description" },
    { key: "second", title: "Location" },
  ]);

  const [loaded] = useFonts({
    Lato: require("../assets/fonts/Lato-Regular.ttf"),
    QuickSand: require("../assets/fonts/Quicksand-Regular.ttf"),
    QuickSandBold: require("../assets/fonts/Quicksand-Bold.ttf"),
    QuickSandMedium: require("../assets/fonts/Quicksand-Medium.ttf"),
    QuickSandSemiBold: require("../assets/fonts/Quicksand-SemiBold.ttf"),
    PlayfairDisplay: require("../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf"),
    UberMove: require("../assets/fonts/UberMoveMedium.otf"),
    UberMoveBold: require("../assets/fonts/UberMoveBold.otf"),
  });
  if (!loaded) {
    return null;
  }

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={styles.aboutUsContainer}>
        <Text style={styles.aboutUsHeader}>About Us</Text>
        
        <Text style={styles.aboutUsText}>{foodtruckdescription}</Text>
      </View> 

      <View style={styles.contactContainer}>
        <Text style={styles.contactHeader}>Contact</Text>
        <FontAwesome style={styles.house} name="home" size={20} color="white" />
        <TouchableOpacity
          onPress={() => {
            openDirections();
          }}
        >
          <Text style={styles.locationOfTruck}>
            {route.params.truck.location}
          </Text>
        </TouchableOpacity>
        <FontAwesome
          style={styles.globe}
          name="globe"
          size={20}
          color="white"
        />
        <TouchableOpacity
          onPress={async () => {
            const supported = await Linking.canOpenURL(websiteurl);
            if (supported) {
              await Linking.openURL(websiteurl);
            } else {
              console.log("Don't know how to open this URL: " + websiteurl);
            }
          }}
        >
          <Text style={styles.websiteLink}>Website</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
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
            onPress={() => {
              openDirections();
            }}
          />
        </MapView>
      </View>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrowleft" size={45} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", width: "100%", marginTop: "5%" }}>
        <View style={styles.imageContainer}>
          <Image source={foodtruckflick} style={styles.bgImage} />
        </View>
        <View>
          <Text style={styles.foodTruckName}>{foodtruckname}</Text>
          <Text style={styles.timeText}>{startTime}</Text>
          <Text style={styles.timeText}>{endTime}</Text>

          <Text style={styles.foodTypeText}>{foodtype}</Text>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
        renderTabBar={(props) => (
          <TabBar {...props} style={{ backgroundColor: "#161629" }} />
        )}
        style={{ marginTop: "5%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161629",
  },
  header: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: "10%",
  },
  imageContainer: {},
  bgImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: "cover",
    marginLeft: 20,
  },
  map: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  timeedits: {
    fontSize: 20,
    fontFamily: "UberMove",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    flexDirection: "row",
  },
  foodtypeedit: {
    fontSize: 20,
    fontFamily: "UberMove",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    color: "white",
    flexDirection: "row",
    marginLeft: 5,
  },
  backButton: {
    width: "50%",
    height: "50%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    right: isTablet ? 540 : 160, // Adjust positioning for tablets
  },
  foodTruckName: {
    fontSize: 40,
    fontFamily: "UberMoveBold",
    color: "white",
    position: "relative",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    fontFamily: "UberMove",
    color: "white",
    position: "relative",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  foodTypeText: {
    fontSize: 16,
    fontFamily: "UberMove",
    color: "white",
    position: "relative",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mapStyle: {
    width: "100%", // Adjust width to half of the parent minus padding
    height: "100%",
    flex: 1, // Fixed height to match the image
    overflow: "hidden",
    postion: "relative",
    // marginTop: 10,
    // bottom: '56%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  aboutUsContainer: {
    bottom: "10%",
    marginLeft: "4%",
    marginRight: "4%",
  },
  aboutUsHeader: {
    marginTop: "25%",
    fontSize: 24,
    fontFamily: "QuickSandMedium",
    color: "white",
  },
  aboutUsText: {
    fontSize: 16,
    fontFamily: "QuickSandMedium",
    color: "white",
  },
  contactContainer: {
    bottom: "7.5%",
    marginLeft: "4%",
  },
  contactHeader: {
    fontSize: 24,
    fontFamily: "QuickSandMedium",
    color: "white",
    position: "relative",
    top: "0%",
  },
  websiteLink: {
    fontSize: 16,
    fontFamily: "QuickSandMedium",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textDecorationLine: "underline",
    bottom: "100%",
    left: "10%",
    position: "relative",
  },
  locationOfTruck: {
    fontSize: 16,
    fontFamily: "QuickSandMedium",
    color: "white",
    textDecorationLine: "underline",
    position: "relative",
    bottom: "20%",
    left: "10%",
    width: "80%",
  },
  house: {
    top: "10%",
  },
  globe: {
    position: "relative",
    bottom: "1%",
  },
  // aboutus: {
  //   flex: 1.6,
  //   backgroundColor: 'white', // White background
  //   // borderRadius: 20, // Rounded corners
  //   padding: 10, // Padding for content inside
  //   margin: 15, // Margin from the edges of the screen
  //   postion: 'relative',
  //   bottom: '3%',
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,

  // },
  // timeAndTypeContainer: {
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 10,
  //   margin: 15,
  //   postion: 'relative',
  //   width: '45%',
  //   height: '14%',
  //   top: '4%',
  //   flexDirection: 'column',
  //   flexDirection: 'column',
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  // },
});

// Header Temporary Removed//
