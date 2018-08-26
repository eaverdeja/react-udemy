import { combineReducers } from 'redux'
import burger from './reducers/burgerBuilder'
import order from './reducers/order'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    burger,
    order,
    form: formReducer
})

export default rootReducer
