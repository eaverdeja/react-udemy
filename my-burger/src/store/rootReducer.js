import { combineReducers } from 'redux'
import burger from './reducers/burgerBuilder'
import order from './reducers/order'

const rootReducer = combineReducers({
    burger,
    order
})

export default rootReducer
