import { StackTypes } from "../enums"


export type Suit = "♠️" | "♣️" | "♥️" | "♦️"
export type Court = "J" |"Q" |"K" |"A"
export type Card = [Suit, number]
export type CardStack = Card[]

export type Stack = {
    suits: Suit[],
    courts: Court[],
    [Symbol.iterator]: () => Generator<(number | Suit)[], void, unknown>
}

export type CardStackService = {
    getCardStack: (type: StackTypes) => CardStack
    shuffle: (stack: CardStack) => CardStack
    weightToCourt: (weight: number) => Court
    courtToWeight: (court: Court) => number
}
