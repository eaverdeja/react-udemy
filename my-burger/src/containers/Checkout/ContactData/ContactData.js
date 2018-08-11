import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import map from 'lodash/map'

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.createInput('input', { placeholder: 'Your Name'}),
            street: this.createInput('input', { placeholder: 'Street'}),
            zipCode: this.createInput('input', { placeholder: 'ZIP Code'}),
            country: this.createInput('input', { placeholder: 'Country'}),
            email: this.createInput('email', { placeholder: 'Email'}),
            deliveryMethod: this.createInput('select',
            {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest'}
                ]
            }),
        },
        loading: false
    }

    createInput(elementType, elementConfig, value = '') {
        //If no type is given for the elementConfig,
        //we use 'text' by default by destructuring elementConfig
        const { type = 'text' } = elementConfig
        return {
            elementType,
            //We spread out elementConfig and then
            //we overwrite the type property
            elementConfig: { ...elementConfig, type },
            value
        }
    }
    
    orderHandler = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        axios.post('/orders.json', {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
        }).then(() => {
            this.setState({ loading: false })
            this.props.history.push('/')
        })
        .catch(() => this.setState({ loading: false }))
    }

    //Here we use destructuring twice. Once for getting the target
    //from the event object, then a second time for getting the value
    //from the target
    inputChangedHandler = ({ target: { value } }, key) => {
        //The array syntax let's us use the key
        //for retrieving the previous input dynamically
        const previousInput = this.state.orderForm[key]
        const newInput = {
            ...previousInput,
            value
        }
        //We create a clone of the order form by desructuring it
        //Computed property names leverage the key
        //for setting the state on the correct input
        //from the orderForm
        const updatedOrderForm = {
            ...this.state.orderForm,
            [key]: newInput
        }
        //Cloning the ordemForm keeps the state changes immutable
        this.setState({ orderForm: updatedOrderForm })
    }

    render() {
        const inputs = map(this.state.orderForm,
            ({ elementType, elementConfig, value }, key) => (
                <Input
                    key={key}
                    elementType={elementType}
                    elementConfig={elementConfig}
                    value={value}
                    changed={(event) => this.inputChangedHandler(event, key)} />
            )
        )

        let form = (
            <form>
                { inputs }
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
