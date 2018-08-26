import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILURE, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from "../actions/actionTypes"

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case PURCHASE_BURGER_FAILURE:
            return {
                ...state,
                loading: false
            }
        case PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case FETCH_ORDERS_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default orderReducer
