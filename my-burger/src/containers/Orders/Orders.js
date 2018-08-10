import React, { Component } from 'react'

import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

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
        return (
            <div>
            </div>
        )
    }
}

export default withErrorHandler(Orders)
