import React from 'react'

import classes from './Input.css'

const input = (props) => {
    let inputElement = null
    switch(props.elementType) {
        case 'input':
            inputElement = <input
                className={classes.InputElement}
                onChange={props.changed}
                value={props.value} 
                {...props.elementConfig} />
            break
        case 'textarea':
            inputElement = <textarea
                className={classes.InputElement}
                onChange={props.changed}
                value={props.value} 
                {...props.elementConfig} />
            break
        case 'select':
            const options = props.elementConfig
                .options.map( option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))

            inputElement = (
                <select
                    className={classes.InputElement}
                    onChange={props.changed}
                    value={props.value}>
                    { options }
                </select>
            )
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                onChange={props.changed}
                value={props.value} 
                {...props.elementConfig} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            { inputElement }
        </div>
    )
}

export default input
