import { View, Pressable, Text, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import { useAtom } from 'jotai'
import { activeAtom, timeAtom } from '../jodai'
import { useEffect, useState } from 'react'

export default ({ player }: { player: string }) => {
  // console.log(active)
  const [active, setActive] = useAtom(activeAtom)
  const [time, setTime] = useAtom(timeAtom)
  const timer = 0
  useEffect(() => {
    let c = 0
    if (active !== player && active !== '') {
      const test1 = setInterval(() => {
        c++
        // console.log(player)
        const timeCopy = { ...time }
        timeCopy[player] -= c
        setTime(timeCopy)
        console.log(timeCopy)
      }, 1000)
      return () => {
        clearInterval(test1)
      }
    }
  }, [active])
  const prested = function () {
    // console.log(player)
    setActive(player)
    // console.log(Player)
  }
  if (player === 'Top') {
    return (
      <View style={[styles.container, styles.dark, styles.reverse]}>
        <Text style={styles.dark}>{time.Top}</Text>
        <Text style={[styles.dark, styles.time]}>
          {Math.floor(time.Top / 60)}:{time.Top % 60}
        </Text>
        <View style={styles.position}>
          <Pressable
            onPress={prested}
            style={[
              styles.button,
              styles.light,
              active === 'Top' ? styles.notShow : styles.show,
            ]}
          >
            <Text>start</Text>
          </Pressable>
        </View>
      </View>
    )
  } else {
    return (
      <View style={[styles.container, styles.light]}>
        <Text>{time.Bot}</Text>
        <Text style={[styles.light, styles.time]}>
          {Math.floor(time.Bot / 60)}:{time.Bot % 60}
        </Text>
        <View style={styles.position}>
          <Pressable
            onPress={prested}
            style={[
              styles.button,
              styles.dark,
              active === 'Bot' ? styles.notShow : styles.show,
            ]}
          >
            <Text style={styles.dark}>start</Text>
          </Pressable>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // fontFamily: 'Inter',
    height: Dimensions.get('window').height / 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    width: 100,
    height: 100,
  },
  dark: {
    backgroundColor: '#000',
    color: '#E8DED1',
    fontFamily: 'Inter-Black'
  },
  light: {
    backgroundColor: '#E8DED1',
    fontFamily: 'Inter-Black'
  },
  reverse: {
    transform: [{ rotate: '180deg' }],
  },
  time: {
    fontSize: 30,
    fontWeight: '700',
  },
  notShow: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
})
