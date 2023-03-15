import { StackNavigationEventMap, StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types'
import { NativeComponentType } from 'react-native/Libraries/Utilities/codegenNativeComponent'
import { createStackNavigator } from '@react-navigation/stack'
import { ParamListBase, StackNavigationState, TypedNavigator } from "@react-navigation/core"
import Clock from './Clock'
import Setings from './Setings'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'

// SplashScreen.preventAutoHideAsync()

const Stack : TypedNavigator< ParamListBase, StackNavigationState<ParamListBase>, StackNavigationOptions, StackNavigationEventMap, NativeComponentType<any>>= createStackNavigator()



export default () => {
  
  return (
    <Stack.Navigator
    //   onLayout={onLayoutRootView}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Clock" component={Clock} />
      <Stack.Screen name="Setings" component={Setings} />
    </Stack.Navigator>
  )
}
