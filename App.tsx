import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import AppStack from './screens'
import 'react-native-gesture-handler'
import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'


export default function App() {
  
  return (
    <NavigationContainer >
      <StatusBar/>
      <AppStack />
    </NavigationContainer>
  )
}
