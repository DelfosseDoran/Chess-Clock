import { View, Pressable, Text, Dimensions, Alert } from 'react-native'
import { StyleSheet } from 'react-native'
import { useAtom } from 'jotai'
import { activeAtom, timeAtom, pauseAtom } from '../jodai'
import { useEffect, useState } from 'react'

export default ({ player }: { player: string }) => {
  // console.log(active)
  const [active, setActive] = useAtom(activeAtom)
  const [time, setTime] = useAtom(timeAtom)
  const [pauze, setPauze] = useAtom(pauseAtom)
  const winingPlayer = () => {
    if (active === 'Top') {
      return 'zwart'
    } else {
      return 'wit'
    }
  }
  const button = () => {
    if (active === '') {
      return 'Start'
    } else {
      return 'Switch'
    }
  }

  const winnaar = () => {
    Alert.alert('Game Over', `Winner: ${winingPlayer()}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setTime({ Top: 60 * 10, Bot: 60 * 10 })
          setActive('')
          setPauze('play')
        },
      },
    ])
  }
  useEffect(() => {
    let c = 0
    console.log(pauze)
    if (active !== player && active !== '' && pauze === 'play') {
      const test1 = setInterval(() => {
        c++
        // console.log(player)
        const timeCopy = { ...time }
        timeCopy[player] -= c
        setTime(timeCopy)
        if (timeCopy[player] <= 0) {
          setActive('')
          winnaar()
          clearInterval(test1)
        }
        console.log(timeCopy)
      }, 1000)
      return () => {
        clearInterval(test1)
      }
    }
  }, [active, pauze])
  const prested = function () {
    // console.log(player)
    setActive(player)
    // console.log(Player)
  }
  if (player === 'Top') {
    return (
      <View style={[styles.container, styles.dark, styles.reverse]}>
        <Text style={[styles.dark,styles.text]}>{time.Top}</Text>
        <Text style={[styles.dark, styles.time, styles.text]}>
          {Math.floor(time.Top / 60)}:{time.Top % 60}
        </Text>
        <View style={[styles.position]}>
          <Pressable
            onPress={prested}
            style={[
              styles.button,
              styles.light,
              active === 'Top' ? styles.notShow : styles.show,
            ]}
          >
            <Text style={styles.text}>{button()}</Text>
          </Pressable>
        </View>
      </View>
    )
  } else {
    return (
      <View style={[styles.container, styles.light]}>
        <Text style={styles.text}>{time.Bot}</Text>
        <Text style={[styles.light, styles.time,styles.text]}>
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
            <Text style={[styles.dark,styles.text]}>{button()}</Text>
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
  },
  text: {
    fontFamily: 'Inter-Black',
  },
  light: {
    backgroundColor: '#E8DED1',
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
