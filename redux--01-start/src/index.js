import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import reducer from './store/reducer'
import registerServiceWorker from './registerServiceWorker';

const logger = store => next => action => {
    console.log('[LoggerMiddleware] Dispatching', action)
    const result = next(action)
    console.log('[LoggerMiddleware] Next state', store.getState())
    return result
} 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(logger)
))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
