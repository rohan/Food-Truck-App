import React from 'react';
import ListScreen from './Components/ListScreen';
import MapScreen from './Components/MapScreen';
import Description from './Components/Description';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapScreen">
        <Stack.Screen 
          name="Description"
          component={Description}
          options={{headerShown: false}} 
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MapScreen"
          component={MapScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ListScreen"
          component={ListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
