import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./actionTypes"

export const addIngredient = ingredientType => (
    { type: ADD_INGREDIENT, ingredientType }
)

export const removeIngredient = ingredientType => (
    { type: REMOVE_INGREDIENT, ingredientType }
)
