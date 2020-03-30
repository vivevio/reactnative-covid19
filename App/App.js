import 'react-native-gesture-handler';
import React from "react";
import { StatusBar, AppState } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Navigators/AppNavigator'

export default function App() {

  const updateStatusBar = () => {
    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor('transparent')
  }

  const handleAppStateChange = (nextAppState) => {
    if( nextAppState == 'active' )  {
      updateStatusBar()
    }
  }
  
  AppState.addEventListener('change', handleAppStateChange);
  updateStatusBar()

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}