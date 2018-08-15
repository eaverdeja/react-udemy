import {
    INCREMENT,
    DECREMENT,
    ADD,
    SUBTRACT,
    STORE_RESULT,
    DELETE_RESULT
} from './actions'

const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }
        case DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        case SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }
        case STORE_RESULT:
            const now = new Date()
            return {
                ...state,
                results: [
                    ...state.results,
                    {
                        id: now.getTime(),
                        value: action.value
                    }
                ]
            }
        case DELETE_RESULT:
            const newResults = state
                .results
                .filter(result => result.id !== action.id)

            return {
                ...state,
                results: newResults
            }
        default:
            return state
    }
}

export default reducer
