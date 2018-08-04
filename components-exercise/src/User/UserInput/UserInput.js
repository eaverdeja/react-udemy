import React from 'react'
import styles from './UserInput.css'

const UserInput = (props) => {
    return (
        <div className="wrapper">
            <input
                className={styles.input}
                onChange={(e) => props.changeHandler(e.currentTarget.value)}
                value={props.value}
            />
        </div>
    )
}

export default UserInput
