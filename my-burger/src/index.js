import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { SET_INGREDIENTS, ADD_INGREDIENT, REMOVE_INGREDIENT } from './store/actions'
import rootReducer from './store/rootReducer';

const store = createStore(rootReducer);

/**
 * Our actions get dispatched to the reducer,
 * which updates the state just fine :)
 * In the next commits we will use react-redux's
 * connect() to inject the ingredients and actions
 * as props to the BurgerBuilder container
 * The code block below will be removed, together
 * with lot's of BurgerBuilder code
 */
store.dispatch({type: SET_INGREDIENTS})
console.log(store.getState())
store.dispatch({type: ADD_INGREDIENT, ingredientType: 'salad'})
console.log(store.getState())
store.dispatch({type: REMOVE_INGREDIENT, ingredientType: 'bacon'})
console.log(store.getState())

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
