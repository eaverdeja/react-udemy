import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
import Spinner from '../../UI/Spinner/Spinner';

const checkoutSummary = (props) => {
    let burger = (
        <div style={{marginTop: '200px'}}>
            <Spinner />
        </div>
    )

    if(props.ingredients) {
        burger = <Burger ingredients={props.ingredients} />
    }

    return (
        <div className={classes.CheckoutSummary} >
            <h1>We hope it tastes good!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                { burger }
                <Button
                    btnType="Danger"
                    clicked={props.checkoutCanceled}>CANCEL</Button>
                <Button
                    btnType="Success"
                    clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    )
}

export default checkoutSummary
