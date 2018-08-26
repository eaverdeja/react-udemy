import {
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAILURE,
    PURCHASE_BURGER_START,
    PURCHASE_INIT,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
    FETCH_ORDERS_START
} from "./actionTypes"
import axios from "../../axios-orders"

export const purchaseBurgerSuccess = (id, orderData) => (
    { type: PURCHASE_BURGER_SUCCESS, id, orderData }
)
export const purchaseBurgerFailure = error => ({ type: PURCHASE_BURGER_FAILURE, error })
export const purchaseBurgerStart = () => ({ type: PURCHASE_BURGER_START })
export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        return axios.post('/orders.json', { orderData })
            .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
            .catch(error => dispatch(purchaseBurgerFailure(error)))
    }
}

export const purchaseInit = () => ({ type: PURCHASE_INIT })

export const fetchOrdersSuccess = orders => ({ type: FETCH_ORDERS_SUCCESS, orders })
export const fetchOrdersFailure = error => ({ type: FETCH_ORDERS_FAILURE, error })
export const fetchOrdersStart = () => ({ type: FETCH_ORDERS_START })
export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
            .then(res => dispatch(fetchOrdersSuccess(res.data))) 
            .catch(err => dispatch(fetchOrdersFailure(err)))
    }
}
