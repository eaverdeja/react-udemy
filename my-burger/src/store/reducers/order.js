import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAILURE,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE
} from "../actions/actionTypes"
import { createReducer } from '../utils'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const orderReducer = createReducer(initialState, {
    [PURCHASE_BURGER_START]: (state, action) => ({ ...state, loading: true}),
    [PURCHASE_BURGER_SUCCESS]: (state, action) => ({
        ...state,
        loading: false,
        orders: [
            ...state.orders,
            {
                orderData: {...action.orderData},
                id: action.id
            }
        ],
        purchased: true
    }),
    [PURCHASE_BURGER_FAILURE]: (state, action) => ({ ...state, loading: false }),

    [PURCHASE_INIT]: (state, action) => ({ ...state, purchased: false }),

    [FETCH_ORDERS_START]: (state, action) => ({ ...state, loading: true }),
    [FETCH_ORDERS_SUCCESS]: (state, action) => ({
        ...state,
        orders: action.orders,
        loading: false
    }),
    [FETCH_ORDERS_FAILURE]: (state, action) => ({ ...state, loading: false })
})

export default orderReducer
