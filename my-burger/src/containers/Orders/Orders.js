import React, { Component } from 'react'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import map from 'lodash/map'

class Orders extends Component {
    state = {
        orders: null,
        loading: false
    }

    componentDidMount () {
        this.setState({ loading: true })
        axios.get('/orders.json')
            .then(res => {
                this.setState({
                    orders: res.data,
                    loading: false 
                })
            }).catch(err => this.setState({ loading: false }))
    }

    render() {
        let orders = <p>Something went wrong!</p>
        if(this.state.orders) {
            orders = map(
                this.state.orders,
                (order, id) =>
                    <Order
                        key={id}
                        price={order.totalPrice}
                        ingredients={order.ingredients} />
            )
        }

        if(this.state.loading) {
            orders = <Spinner />
        }

        return (
            <div>
                { orders }
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)
