import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILURE, PURCHASE_BURGER_START } from "./actionTypes"
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

export const purchaseBurgerStart = () => ({ type: PURCHASE_BURGER_START })

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        return axios.post('/orders.json', { orderData })
            .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
            .catch(error => dispatch(purchaseBurgerFailure(error)))
    }
}
