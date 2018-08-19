import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../actions";

const initialState = {}

const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
        case REMOVE_INGREDIENT:
        default:
            return state
    }
}

export default burgerReducer
