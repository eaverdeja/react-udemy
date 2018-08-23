import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../actions";

const INGREDIENT_PRICES = {
    'salad': 0.5,
    'bacon': 0.7,
    'meat': 0.6,
    'cheese': 0.4
}

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 4
}

//These helper functions help in keeping our
//burger reducer DRY for the moment, seeing as ADD_IGREDIENT
//and REMOVE_INGREDIENT only differ in the operation type (+/-)
function updateIngredient (state, ingredientType, operation) {
    const oldCount = state.ingredients[ingredientType]
    const newCount = operation(oldCount, 1)

    if(newCount < 0) return false

    const newPrice = operation(state.totalPrice, INGREDIENT_PRICES[ingredientType])
        
    return { newCount, newPrice }
}

function buildUpdatedState ({state, ingredientType, operation}) {
    const { newCount, newPrice } = updateIngredient(state, ingredientType, operation)
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [ingredientType]: newCount
        },
        totalPrice: newPrice
    }
}

const burgerReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            return buildUpdatedState({
                state,
                ingredientType: action.ingredientType,
                operation: (a, b) => a + b
            })
        case REMOVE_INGREDIENT:
            return buildUpdatedState({
                state,
                ingredientType: action.ingredientType,
                operation: (a, b) => a - b
            })
        default:
            return state
    }
}

export default burgerReducer
