import { combineReducers } from 'redux'
import burger from './reducers/burgerBuilder'

const rootReducer = combineReducers({
    burger
})

export default rootReducer
