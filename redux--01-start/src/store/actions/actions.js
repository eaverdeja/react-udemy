export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const ADD = 'ADD'
export const SUBTRACT = 'SUBTRACT'
export const STORE_RESULT = 'STORE_RESULT'
export const DELETE_RESULT = 'DELETE_RESULT'

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })
export const add = value => ({ type: ADD, value})
export const subtract = value => ({ type: SUBTRACT, value })

export const saveResult = value => ({ type: STORE_RESULT, value })

export const storeResult = value => {
    return dispatch =>
        setTimeout(() => dispatch(saveResult(value)), 2000)
}

export const deleteResult = id => ({ type: DELETE_RESULT, id })
