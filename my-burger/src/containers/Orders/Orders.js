import React, { Component } from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import map from 'lodash/map'
import { fetchOrders } from '../../store/actions'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders()
    }

    render() {
        let orders = <p>Something went wrong!</p>
        if(this.props.orders) {
            orders = map(
                this.props.orders,
                (order, id) =>
                    <Order
                        key={id}
                        price={order.orderData.totalPrice}
                        ingredients={order.orderData.ingredients} />
            )
        }

        if(this.props.loading) {
            orders = <Spinner />
        }

        return (
            <div>
                { orders }
            </div>
        )
    }
}

const mapStateToProps = ({ order }) => ({
    orders: order.orders,
    loading: order.loading
})

const mapDispatchToProps = dispatch => ({
    onFetchOrders: () => dispatch(fetchOrders())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios))
