import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED
} from "./actionTypes"
import axios from "../../axios-orders"

export const addIngredient = ingredientType => (
    { type: ADD_INGREDIENT, ingredientType }
)

export const removeIngredient = ingredientType => (
    { type: REMOVE_INGREDIENT, ingredientType }
)

export const setIngredients = ingredients => ({
    type: SET_INGREDIENTS,
    ingredients
})

export const fetchIngredientsFailed = () => ({
    type: FETCH_INGREDIENTS_FAILED
})

export const initIngredients = () =>
    dispatch => axios.get('ingredients.json')
        .then(res => dispatch(setIngredients(res.data)))
        .catch(error => dispatch(fetchIngredientsFailed()))
