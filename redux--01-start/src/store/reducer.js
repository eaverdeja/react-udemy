import { combineReducers } from 'redux'
import counter from './reducers/counter'
import results from './reducers/results'

const rootReducer = combineReducers({
    counter,
    results
})

export default rootReducer
