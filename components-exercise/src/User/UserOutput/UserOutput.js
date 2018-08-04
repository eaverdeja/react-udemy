import React from 'react'
import styles from './UserOutput.css'

const UserOutput = (props) => {
    const classes = `wrapper ${styles.output}`
    return (
        <div className={classes}>
            <p>Hello</p><p>{ props.username }</p>
        </div>
    )
}

export default UserOutput
