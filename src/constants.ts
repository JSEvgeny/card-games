
import { Court } from "./types/cardStack"
import { StackTypes } from "./enums"

export const STACK_SIZE_LOOKUP: Record<StackTypes, number> = {
    [StackTypes.SMALL]: 6,
    [StackTypes.FULL]: 2,
}

export const COURT_WEIGHT_LOOKUP: Record<Court, number> = {
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
}

export const WEIGHT_COURT_LOOKUP: Record<number, Court> = {
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A',
}
