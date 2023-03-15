import React, { useState } from 'react'
import { View, Text, Dimensions, Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import Player from '../Component/Player'
import { useAtom } from 'jotai'
import { activeAtom, timeAtom } from '../jodai'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'

const screenOptions: StackNavigationOptions = { headerShown: false }

export default () => {
  const [active, setActive] = useAtom(activeAtom)
  const [time, setTime] = useAtom(timeAtom)
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./../assets/fonts/Inter-Black.otf'),
  })
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  return (
    <View >
      <Player player={'Top'} />
      <Player player={'Bot'} />
      <View style={styles.containerSvg}>
        <Pressable style={styles.circlesvg} onPress={()=>{setActive('')}}>
          <Svg
            style={styles.svg}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <Rect x="6" y="4" width="4" height="16"></Rect>
            <Rect x="14" y="4" width="4" height="16"></Rect>
          </Svg>
        </Pressable>
        <Pressable
          onPress={() => {
            setTime({ Top: 60 * 10, Bot: 60 * 10 })
            setActive('')
          }}
          style={styles.circlesvg}
        >
          <Svg
            style={styles.svg}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="square"
            strokeLinejoin="round"
          >
            <Path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" />
          </Svg>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  svg: {
    width: 30,
    height: 30,
    fill: '#000',
  },
  containerSvg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 20,
    width: Dimensions.get('window').width,
  },
  circlesvg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    fill: '#000',
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
})
