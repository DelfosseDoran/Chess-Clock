import React, { useState } from 'react'
import { View, Text, Dimensions, Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
// import Svg, { Circle, Path, Rect } from 'react-native-svg'
import Player from '../Component/Player'
import { useAtom } from 'jotai'
import { activeAtom, pauseAtom, timeAtom } from '../jodai'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { Pause, Play, RefreshCcw } from 'lucide-react-native'

const screenOptions: StackNavigationOptions = { headerShown: false }

export default () => {
  const [pauze, setPauze] = useAtom(pauseAtom)
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

  const Playing = () => {
    if (pauze === 'play') 
    {return <Pause color='black'/>}
    else {return <Play color='black'/>}
  }
  return (
    <View>
      <Player player={'Top'} />
      <Player player={'Bot'} />
      <View style={styles.containerSvg}>
        <Pressable
          style={styles.circlesvg}
          onPress={() => {
            if (pauze === 'play') setPauze('pauze')
            else setPauze('play')
          }}
        >
          <Playing />
        </Pressable>
        <Pressable
          onPress={() => {
            setTime({ Top: 60 * 10, Bot: 60 * 10 })
            setActive('')
            setPauze('play')
          }}
          style={styles.circlesvg}
        >
          <RefreshCcw color='black'/>
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
