import React from 'react';
import ListScreen from './Components/ListScreen';
import MapScreen from './Components/MapScreen';
import Description from './Components/Description';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MapScreen"
        screenOptions={{
          headerShown: false,       // Hide the header globally
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, // Fade in effect
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 400 // Duration for opening
              }
            },
            close: {
              animation: 'timing',
              config: {
                duration: 400 // Duration for closing
              }
            }
          }
        }}
      >
        <Stack.Screen 
          name="Description"
          component={Description}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
