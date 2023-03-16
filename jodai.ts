import { atom } from 'jotai'

export const activeAtom=atom('')

export const timeAtom=atom(
    {'Top': 1*10,
    'Bot': 1*10})

export const pauseAtom=atom('play')