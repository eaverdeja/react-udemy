import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS } from "../actions";

const initialState = {
    ingredients: null
}

function updateIngredient (state, ingredientType, op) {
    const oldCount = state.ingredients[ingredientType]
    
    const newCount = op(oldCount, 1)
    if(newCount < 0) return

    return newCount
}

const burgerReducer = (state = initialState, action) => {
    let newCount = null
    switch(action.type) {
        case SET_INGREDIENTS: 
            return {
                ...state,
                ingredients: {
                    salad: 1,
                    meat: 1,
                    bacon: 2,
                    cheese: 1
                }
            }
        case ADD_INGREDIENT:
            newCount = updateIngredient(state, action.ingredientType, (a, b) => a + b)
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: newCount
                }
            }
        case REMOVE_INGREDIENT:
            newCount = updateIngredient(state, action.ingredientType, (a, b) => a - b)
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: newCount
                }
            }
        default:
            return state
    }
}

export default burgerReducer
