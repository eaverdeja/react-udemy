import React, { Component } from 'react'

import reduce from 'lodash/reduce'
import axios from '../../axios-orders'
import qs from 'query-string'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    'salad': 0.5,
    'bacon': 0.7,
    'meat': 0.6,
    'cheese': 0.4
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    //The update* methods can be defined as such because
    //they are called strictly from within this class
    //i.e we don't have to worry about `this` 
    updatePurchasableState () {
        const totalIngredients = reduce(this.state.ingredients,
            (sum, ingredientCount) => sum + ingredientCount,
            0
        )

        this.setState({
            purchasable: totalIngredients > 0
        })
    }

    updateIngredient (type, op) {
        const oldCount = this.state.ingredients[type]
        const oldPrice = this.state.totalPrice
        
        const newCount = op(oldCount, 1)
        if(newCount < 0) return

        const newPrice = op(oldPrice, INGREDIENT_PRICES[type])

        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: newCount
            },
            totalPrice: newPrice
        }, this.updatePurchasableState)
    }

    //Handlers are defined as arrow functions
    //so that `this` is preserved when calling these guys
    //from child components
    addIngredientHandler = (type) =>
        this.updateIngredient(type, (a, b) => a + b)

    removeIngredientHandler = (type) =>
        this.updateIngredient(type, (a, b) => a - b)

    purchasingHandler = () => this.setState({ purchasing: true })

    cancelPurchaseHandler = () => this.setState({ purchasing: false })

    purchaseHandler = () => {
        const query = qs.stringify({
            totalPrice: this.state.totalPrice,
            ...this.state.ingredients
        })
        this.props.history.push(`/checkout?${query}`)
    }

    componentDidMount () {
        //We call setTimeout just so that we can see the spinner
        setTimeout(() => 
            axios.get('/ingredients.json')
                .then(response => this.setState({ ingredients: response.data }))
                .catch(error => this.setState({ error: true }))
        , 500)
    }

    render() {
        //As I see it, disabledControls is defined here since it's strictly
        //an inference of some UI state (disabled "LESS" buttons in this case)
        //based on the current state
        //i.e it's not an event handler like the arrow functions above
        //nor an utility method the BurgerBuilder uses for state update logic
        const disabledControls = reduce(this.state.ingredients,
            (acc, count, ingredient) => ({
                ...acc,
                [ingredient]: count <= 0
            }), {})
        
        let burger = <p>Something went wrong!</p>
        if(this.state.error === false) {
            burger = (
                <div style={{marginTop: '200px'}}>
                    <Spinner />
                </div>
            )
        }
        
        let orderSummary = null
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        addIngredient={this.addIngredientHandler} 
                        removeIngredient={this.removeIngredientHandler}
                        disabledControls={disabledControls} 
                        price={this.state.totalPrice} 
                        purchasable={this.state.purchasable}
                        onPurchase={this.purchasingHandler} />
                </Aux>
            )

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                cancelPurchase={this.cancelPurchaseHandler} 
                purchase={this.purchaseHandler}
            />
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    visible={this.state.purchasing}
                    closeModal={this.cancelPurchaseHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )        
    }
}

export default withErrorHandler(BurgerBuilder, axios)
