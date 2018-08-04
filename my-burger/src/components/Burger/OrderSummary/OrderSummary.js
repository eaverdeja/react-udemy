import React, { Component } from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    //This could be a functional component
    //We use the lifecycle hook to demonstrate
    //render optimization on Modal.js
    componentWillUpdate() {
        console.log('[OrderSummary] willUpdate')
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingredient => 
                <li key={ingredient}>
                    <span>{ingredient}: </span>{this.props.ingredients[ingredient]}
                </li>
            )
        
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>TotalPrice: {this.props.price.toFixed(2)}</strong></p>
                <p>Proceed to checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchase}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary
