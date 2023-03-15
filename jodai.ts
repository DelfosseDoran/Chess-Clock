import { atom } from 'jotai'

export const activeAtom=atom('')

export const timeAtom=atom(
    {'Top': 60*10,
    'Bot': 60*10})