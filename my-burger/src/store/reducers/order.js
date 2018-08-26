import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILURE, PURCHASE_BURGER_START } from "../actions/actionTypes"

const initialState = {
    orders: [],
    loading: false
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
                orders: state.orders.concat(newOrder)
            }
        case PURCHASE_BURGER_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default orderReducer
