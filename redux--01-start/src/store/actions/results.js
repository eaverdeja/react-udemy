import { STORE_RESULT, DELETE_RESULT } from "./actionTypes"

export const saveResult = value => ({ type: STORE_RESULT, value })

export const storeResult = value => {
    return dispatch =>
        setTimeout(() => dispatch(saveResult(value)), 2000)
}

export const deleteResult = id => ({ type: DELETE_RESULT, id })
