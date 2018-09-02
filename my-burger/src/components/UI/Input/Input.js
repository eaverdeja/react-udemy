import React from 'react'

import classes from './Input.css'

const input = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
}) => {
    const inputClasses = [classes.InputElement]
    
    if(error && touched) {
        inputClasses.push(classes.Invalid)
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>    
            <input
                {...input}
                placeholder={label}
                type={type}
                className={inputClasses.join(' ')} />
        </div>
    )
}

export default input
