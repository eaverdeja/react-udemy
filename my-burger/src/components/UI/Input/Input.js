import React from 'react'

import classes from './Input.css'

const input = (props) => {
    let inputElement = null
    switch(props.type) {
        case 'input':
            inputElement = <input
                className={classes.InputElement}
                onChange={props.changed}
                value={props.value}
                {...props.config} />
            break
        case 'textarea':
            inputElement = <textarea
                className={classes.InputElement}
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
