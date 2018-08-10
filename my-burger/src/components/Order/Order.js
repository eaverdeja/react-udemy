import React from 'react'

import classes from './Order.css'
import map from 'lodash/map'

const order = (props) => {
    const ingredients = map(
        props.ingredients,
        (amount, name) => (
            <span key={name}>{name} ({amount})</span>  
        )
    )

    return (
        <div className={classes.Order}>
            <h3>Ingredients:</h3>
            { ingredients }
            <p>Price: <strong>USD { Number.parseFloat(props.price).toFixed(2) }</strong></p>
        </div>
    )
}


export default order
