const redux = require('redux')

const initialState = {
    counter: 0
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.value
            }
        default:
            return state
    }
    state
}

const store = redux.createStore(rootReducer)
console.log(store.getState())

store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'ADD', value: 10})
console.log(store.getState())
