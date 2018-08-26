import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILURE } from "./actionTypes"
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: PURCHASE_BURGER_SUCCESS,
    id,
    orderData
})

export const purchaseBurgerFailure = error => ({
    type: PURCHASE_BURGER_FAILURE,
    error
})

export const purchaseBurgerStart = orderData => {
    return dispatch => {
        axios.post('/orders.json', { orderData })
            .then(res => dispatch(purchaseBurgerSuccess(res.data, orderData)))
            .catch(error => dispatch(purchaseBurgerFailure(error)))
    }
}
