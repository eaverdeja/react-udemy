import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from "../actions/actionTypes";
import reduce from 'lodash/reduce'
import { createReducer } from '../utils'

const INGREDIENT_PRICES = {
    'salad': 0.5,
    'bacon': 0.7,
    'meat': 0.6,
    'cheese': 0.4
}

const initialState = {
    ingredients: null,
    totalPrice: null,
    error: false
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

const burgerReducer = createReducer(initialState, {
    [ADD_INGREDIENT]: (state, action) => buildUpdatedState({
        state,
        ingredientType: action.ingredientType,
        operation: (a, b) => a + b
    }),
    [REMOVE_INGREDIENT]: (state, action) => buildUpdatedState({
        state,
        ingredientType: action.ingredientType,
        operation: (a, b) => a - b
    }),
    [SET_INGREDIENTS]: (state, action) => {
        const { ingredients } = action
        const totalPrice = reduce(
            ingredients,
            (acc, count, ingredient) => {
                return acc + INGREDIENT_PRICES[ingredient] * count
            }, 4
        )

        const { salad, bacon, cheese, meat } = ingredients
        return {
            ...state,
            ingredients: { salad, bacon, cheese, meat },
            totalPrice,
            error: false
        }
    },
    [FETCH_INGREDIENTS_FAILED]: (state, action) => ({ ...state, error: true }),
})

export default burgerReducer
