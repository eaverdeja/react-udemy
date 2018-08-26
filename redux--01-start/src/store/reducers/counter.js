import {
    INCREMENT,
    DECREMENT,
    ADD,
    SUBTRACT
} from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    value: 0
}

const counter = (state = initialState, action) => {
    switch(action.type) {
        case INCREMENT:
            return updateObject(state, { value: state.value + 1 })
        case DECREMENT:
            return updateObject(state, { value: state.value - 1 })
        case ADD:
            return updateObject(state, { value: state.value + action.value })
        case SUBTRACT:
            return updateObject(state, { value: state.value - action.value })
        default:
            return state
    }
}

export default counter
