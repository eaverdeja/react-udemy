import { INCREMENT, DECREMENT, ADD, SUBTRACT } from "./actionTypes"

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })
export const add = value => ({ type: ADD, value})
export const subtract = value => ({ type: SUBTRACT, value })
