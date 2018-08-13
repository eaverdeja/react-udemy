const redux = require('redux')

const initialState = {
    counter: 0
}

const rootReducer = (state = initialState, action) => state

const store = redux.createStore(rootReducer)
console.log(store.getState())
