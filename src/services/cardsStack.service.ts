import { CardStack, CardStackService, Court, Stack } from "types/cardStack"
import { COURT_WEIGHT_LOOKUP } from "../constants"
import { WEIGHT_COURT_LOOKUP } from "../constants"
import { STACK_SIZE_LOOKUP } from "../constants"
import { StackTypes } from "../enums"


const getCardStack = (type: StackTypes): CardStack => {
    const stack: Stack = {
        suits: ['♠️', '♣️', '♥️', '♦️'],
        courts: ['J', 'Q', 'K', 'A'],
        [Symbol.iterator]: function* () {
            for (let suit of this.suits) {
                for (let i = STACK_SIZE_LOOKUP[type]; i <= 10; i++) yield [suit, i]
                for (let court of this.courts)
                    yield [suit, COURT_WEIGHT_LOOKUP[court as Court] as number]
            }
        },
    }

    return [...stack] as unknown as CardStack
}

const shuffle = (cards: CardStack) =>
    cards
        .map((card) => ({ card, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ card }) => card)

const weightToCourt = (weight: number): Court => WEIGHT_COURT_LOOKUP[weight]
const courtToWeight = (court: Court): number => COURT_WEIGHT_LOOKUP[court]

export const createCardStackService = (): CardStackService => ({
    getCardStack,
    shuffle,
    weightToCourt,
    courtToWeight,
})
