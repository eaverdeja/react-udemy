import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    checkoutCanceledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }
    
    render() {
        return this.props.ingredients
        ? (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients} 
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
        : <Redirect to="/" />
    }
}

const mapStateToProps = ({ burger }) => ({
    ingredients: burger.ingredients,
    totalPrice: burger.totalPrice
})

export default connect(mapStateToProps)(Checkout)
