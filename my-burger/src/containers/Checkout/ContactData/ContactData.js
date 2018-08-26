import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class ContactData extends Component {
    required = value => typeof(value) !== 'undefined' && value.trim() !== ''
        ? undefined
        : 'Required'
    maxLength = max => value =>
        value && value.length > max ? `Must be ${max} characters or less` : undefined
    minLength = min => value =>
        value && value.length < min ? `Must be ${min} characters or more` : undefined
    minLength1 = this.minLength(1)
    minLength5 = this.minLength(5)
    maxLength5 = this.maxLength(5)
    
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        let form = (
            <form onSubmit={handleSubmit}>
                <Field
                    type="text"
                    name="name"
                    component={Input}
                    label="Name"
                    validate={[this.required, this.minLength1]} />
                <Field
                    type="text"
                    name="street"
                    component={Input}
                    label="Street"
                    validate={[this.required, this.minLength1]} />
                <Field
                    type="text"
                    name="country"
                    component={Input}
                    label="Country"
                    validate={[this.required, this.minLength1]} />
                <Field
                    type="text"
                    name="zip"
                    component={Input}
                    label="ZIP Code"
                    validate={[this.required, this.minLength5, this.maxLength5]} />
                <div>
                    <Button
                        type="submit"
                        btnType="Success"
                        disabled={submitting}>
                        PURCHASE
                    </Button>
                    <Button
                        type="button"
                        disabled={pristine || submitting}
                        onClick={reset}>
                        CLEAR VALUES
                    </Button>
                </div>
            </form>
        )
        if(this.props.loading) {
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

const mapStateToProps = ({ burger, order }) => ({
    ingredients: burger.ingredients,
    totalPrice: burger.totalPrice,
    loading: order.loading
})

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'contactData' })
)(withErrorHandler(ContactData, axios))
