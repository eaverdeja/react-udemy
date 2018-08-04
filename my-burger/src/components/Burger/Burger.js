import React from 'react'
import map from 'lodash/map'
import times from 'lodash/times'
import uniqueId from 'lodash/uniqueId'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let ingredients = []
    
    /* This was my first lazy and imperative approach
    I just wanted to see the burger
    
    let index = 0
    for(let ingredient in props.ingredients) {
        const ingredientCount = props.ingredients[ingredient]
        for(let i = 1; i <= ingredientCount; i++) {
            ingredients.push(
                <BurgerIngredient
                    key={index++}
                    type={ingredient} />
            )
        }
    }
    */

    /* This was the one suggested by Max, the teacher.
        I find it less readable, but it has no dependencies...
        The trick for the key is dead simple and pretty cool

    let ingredients = Object.keys(props.ingredients)
        .map(ingredientName =>
            [...Array(props.ingredients[ingredientName])].map(_, i =>
                <BurgerIngredient type={ingredientName} key={ingredientName + i} />
            )
        )
    */

    /* I prefer this approach as I find it more readable
        It uses 3 lodash utilities for something
        kinda simple, but I want readability

        The trick for the key doesn't work here :(
     */
    ingredients = map(props.ingredients, (ingredientCount, ingredient) =>
        times(ingredientCount, () =>
            <BurgerIngredient
                type={ingredient}
                key={uniqueId()}
            />
        )
    )

    //Flattening
    ingredients = ingredients.reduce((arr, el) => arr.concat(el))

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding some ingredients!</p>
    }

    return (
        <div className={classes.Burger}>

            <BurgerIngredient type="bread-top" />
                {ingredients}
            <BurgerIngredient type="bread-bottom" />
            
        </div>
    )
}

export default burger
