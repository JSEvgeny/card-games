export enum StackTypes {
    SMALL = "small",
    FULL = "full",
    //FULL_WITH_JOKERS = "full_with_jokers"
}

type Suit = "♠️" | "♣️" | "♥️" | "♦️"
type Court = "J" |"Q" |"K" |"A"
type Card = [Suit, number]

type Stack = {
    suits: Suit[],
    courts: Court[],
    [Symbol.iterator]: () => Generator<(number | Suit)[], void, unknown>
}

export const getCardStack = (type: StackTypes): Card[] => {
    const stack: Stack = {
        suits: ["♠️", "♣️", "♥️", "♦️"],
        courts: ["J", "Q", "K", "A"],
        [Symbol.iterator]: function* () {
            for (let suit of this.suits) {
                for (let i = STACK_SIZE_LOOKUP[type]; i <= 10; i++) yield [suit, i]
                for (let court of this.courts) yield [suit, COURT_WEIGHT_LOOKUP[court as Court] as number]
            }
        }
    }

    return [...stack] as unknown as Card[]
}

const STACK_SIZE_LOOKUP: Record<StackTypes, number> = {
    [StackTypes.SMALL]: 6,
    [StackTypes.FULL]: 2,
}

const COURT_WEIGHT_LOOKUP: Record<Court, number> = {
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

const WEIGHT_COURT_LOOKUP: Record<number, Court> = {
    11: "J",
    12: "Q",
    13: "K",
    14: "A"
}

const courtToWeight = (court: Court): number => COURT_WEIGHT_LOOKUP[court]
const weightToCourt = (weight: number): Court => WEIGHT_COURT_LOOKUP[weight]

export const shuffle = (cards: Card[]) => cards
  .map(card => ({ card, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ card }) => card)