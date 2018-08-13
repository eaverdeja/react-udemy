import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.createInput({
                elementType: 'input',
                config: { placeholder: 'Your Name'},
                validation: { required: true },
            }),
            street: this.createInput({
                elementType: 'input',
                config: { placeholder: 'Street'},
                validation: { required: true },
            }),
            zipCode: this.createInput({
                elementType: 'input',
                config: { placeholder: 'ZIP Code'},
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
            }),
            country: this.createInput({
                elementType: 'input',
                config: { placeholder: 'Country'},
                validation: { required: true },
            }),
            email: this.createInput({
                elementType: 'email',
                config: { placeholder: 'Email'},
                validation: { required: true },
            }),
            deliveryMethod: this.createInput({
                elementType: 'select',
                config: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                }
            }),
        },
        loading: false
    }

    //This short (but kinda hard to read - meh) factory function
    //makes our state declaration much shorter and our dynamic
    //form manipulation easier to enhance
    createInput(options) {
        //Receiving an options object as the only parameter and
        //destructuring it let's us pass the necessary
        //properties in any order while assigning
        //default values for the optional properties
        const {
            elementType,
            config,
            value = '',
            validation = {},
            valid = false,
            touched = false
        } = options
        //If no type is given for the config,
        //we use 'text' by default by destructuring config
        //i.e. that's how i dealt with nested default properties
        const { type = 'text' } = config
        return {
            elementType,
            //We spread out config and then
            //we overwrite the type property
            config: { ...config, type },
            value,
            validation,
            valid,
            touched
        }
    }
    
    orderHandler = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        const orderData = {}
        map(this.state.orderForm, ( input, key ) => {
            orderData[key] = input.value
        })
        axios.post('/orders.json', {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData
        }).then(() => {
            this.setState({ loading: false })
            this.props.history.push('/')
        })
        .catch(() => this.setState({ loading: false }))
    }

    checkValidity(value, rules) {
        if(isEmpty(rules)) return

        let isValid = true

        if(rules.required) {
            isValid = isValid && value.trim() !== ''
        }

        if(rules.minLength) {
            isValid = isValid && value.length >= rules.minLength
        }
        
        if(rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength
        }

        return isValid
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
            value,
            valid: this.checkValidity(value, previousInput.validation),
            touched: true
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
        const inputs = map(
            this.state.orderForm,
            (options, key) => {
                const { valid, validation } = options
                return (
                    <Input
                        key={key}
                        {...options}
                        invalid={!valid}
                        shouldValidate={!isEmpty(validation)}
                        changed={(event) => this.inputChangedHandler(event, key)} />
                )
            }
        )

        let form = (
            <form onSubmit={this.orderHandler}>
                { inputs }
                <Button btnType="Success">ORDER</Button>
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
