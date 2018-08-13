import React from 'react'

import classes from './Input.css'

const input = (props) => {
    let inputElement = null
    const inputClasses = [classes.InputElement]

    if(props.shouldValidate && props.invalid && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType) {
        case 'input':
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.changed}
                value={props.value}
                {...props.config} />
            break
        case 'textarea':
            inputElement = <textarea
                className={inputClasses.join(' ')}
                onChange={props.changed}
                value={props.value} 
                {...props.config} />
            break
        case 'select':
            const options = props.config
                .options.map( option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))

            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    value={props.value}>
                    { options }
                </select>
            )
            break
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.changed}
                value={props.value}
                {...props.config} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            { inputElement }
        </div>
    )
}

export default input
