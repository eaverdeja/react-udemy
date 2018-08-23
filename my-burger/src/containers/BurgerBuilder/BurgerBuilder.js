import React, { Component } from 'react'
import { connect } from 'react-redux'

import reduce from 'lodash/reduce'
import axios from '../../axios-orders'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }
 
    //This method stays here! It's just an UI validation
    //No silly redux for you >:|
    updatePurchasableState () {
        const totalIngredients = reduce(this.props.ingredients,
            (sum, ingredientCount) => sum + ingredientCount,
            0
        )

        return totalIngredients > 0
    }

    purchasingHandler = () => this.setState({ purchasing: true })

    cancelPurchaseHandler = () => this.setState({ purchasing: false })

    purchaseHandler = () => this.props.history.push('/checkout')

    render() {
        //As I see it, disabledControls is defined here since it's strictly
        //an inference of some UI state (disabled "LESS" buttons in this case)
        //based on the current state
        //i.e it's not an event handler like the arrow functions above
        //nor an utility method the BurgerBuilder uses for state update logic
        const disabledControls = reduce(this.props.ingredients,
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
        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        addIngredient={this.props.addIngredientHandler} 
                        removeIngredient={this.props.removeIngredientHandler}
                        disabledControls={disabledControls} 
                        price={this.props.totalPrice} 
                        purchasable={this.updatePurchasableState()}
                        onPurchase={this.purchasingHandler} />
                </Aux>
            )

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
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

const mapStateToProps = ({ burger }) => ({
    ingredients: burger.ingredients,
    totalPrice: burger.totalPrice
})

const mapDispatchToProps = dispatch => ({
    addIngredientHandler: (ingredientType) => dispatch({type: ADD_INGREDIENT, ingredientType}),
    removeIngredientHandler: (ingredientType) => dispatch({type: REMOVE_INGREDIENT, ingredientType})
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
