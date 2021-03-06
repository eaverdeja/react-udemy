import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { purchaseBurger } from '../../store/actions'

class Checkout extends Component {
    checkoutCanceledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }

    orderHandler = values => {
        this.props.onOrderBurger({
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            formData: values
        })
    }
    
    render() {
        let summary = <Redirect to="/" />
        const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
        if(this.props.ingredients) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients} 
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        render={() => <ContactData onSubmit={this.orderHandler} />} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = ({ burger, order }) => ({
    ingredients: burger.ingredients,
    totalPrice: burger.totalPrice,
    purchased: order.purchased
})

const mapDispatchToProps = dispatch => ({
    onOrderBurger: orderData => dispatch(purchaseBurger(orderData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
