import {
    INCREMENT,
    DECREMENT,
    ADD,
    SUBTRACT
} from '../actions/actionTypes'

const initialState = {
    value: 0
}

const counter = (state = initialState, action) => {
    switch(action.type) {
        case INCREMENT:
            return {
                ...state,
                value: state.value + 1
            }
        case DECREMENT:
            return {
                ...state,
                value: state.value - 1
            }
        case ADD:
            return {
                ...state,
                value: state.value + action.value
            }
        case SUBTRACT:
            return {
                ...state,
                value: state.value - action.value
            }
        default:
            return state
    }
}

export default counter
