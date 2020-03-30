import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Containers/Home/HomeScreen'

const Stack = createStackNavigator();

function AppNavigator() {
  
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;

