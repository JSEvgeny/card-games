import { Card, CardStack } from 'types/cardStack'

/**
 * Initial state of the Durak game,
 * when two (or more) players get initial hand of six cards randomly selected cards.
 *
 * Does not modify original stack
 *
 * @param stack - card stack to deduct random cards from
 * @returns {[Cards[], CardStack]} - return tuple where at 0 index is an array of 6 randomly selected cards, and at index 1 the rest of the cards from initial stack
 */
const getSixRandomCards = (stack: CardStack) => {
    const randomSixIndexes = _getRandomUniqueIndexesFromRange(0, stack.length, 6)
    const randomSixCards = stack
        .map((card: Card, index: number) => (randomSixIndexes.includes(index) ? card : undefined))
        .filter((value: Card | undefined) => value !== undefined)
    const filteredStack = stack.filter((stackCard: Card) => !randomSixCards.includes(stackCard))

    return [randomSixCards, filteredStack]
}

const _getRandomUniqueIndexesFromRange = (start: number, end: number, count: number): number[] => {
    let lookupArray = new Array(end - start).fill(undefined).map((_, index) => start + index)
    let randomIndexes: number[] = []

    for (let i = 0; i < count; i++) {
        const randomNumber = _getRandomNumber(lookupArray.length)
        // Getting random index value
        const randomIndex: number = lookupArray[randomNumber]
        // Mutating array to prevent duplicates
        lookupArray = lookupArray.filter((value) => value != randomIndex)

        randomIndexes = [...randomIndexes, randomIndex]
    }

    return randomIndexes
}

const _getRandomNumber = (max: number) => Math.floor(Math.random() * max)

export const createDurakService = () => ({
    getSixRandomCards,
})
