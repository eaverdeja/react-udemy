import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import qs from 'query-string'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }

    componentDidMount () {
        const query = qs.parse(this.props.location.search)
        const { salad, meat, bacon, cheese, totalPrice } = query

        this.setState({
            ingredients: {
                salad, meat, bacon, cheese
            },
            totalPrice
        })
        
        /* Suggested by Max, the teacher. It's native!
        const ingredients = {}
        const query = new URLSearchParams(this.props.location.search)
        for(let param of query.entries()) {
            // ['bacon', '2']
            if(param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = param[1]
            }
        }
        this.setState({ ingredients, totalPrice })
        */
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients} 
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => <ContactData
                        ingredients={this.state.ingredients} 
                        totalPrice={this.state.totalPrice} 
                        {...props} /> 
                    } />
            </div>
        ) 
    }
}

export default Checkout
