import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    
    orderHandler = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        axios.post('/orders.json', {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customer: {
                name: "Eduardo Verdeja",
                address: {
                    street: "No name Street",
                    zipCode: '12345'
                },
                email: 'eduardo.verdeja@gmail.com'
            },
            deliveryMethod: 'fastest'
        }).then(() => {
            this.setState({ loading: false })
            this.props.history.push('/')
        })
        .catch(() => this.setState({ loading: false }))
    }

    render() {
        let form = (
            <form>
                <Input
                    inputtype="input"
                    type="text"
                    name="name"
                    placeholder="Your name"/>
                <Input
                    inputtype="input"
                    type="email"
                    name="email"
                    placeholder="Your email"/>
                <Input
                    inputtype="input"
                    type="text"
                    name="street"
                    placeholder="Street"/>
                <Input
                    inputtype="input"
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"/>
                <Button
                    btnType="Success"
                    clicked={this.orderHandler}
                    >ORDER</Button>
            </form>
        )
        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                { form }
            </div>
        )
    }
}

export default ContactData
