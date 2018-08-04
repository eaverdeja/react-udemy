import React from 'react'

const validation = ({ length }) => (
    <div>{
        (length < 5) ? "Text too short" : "Text long enough"
    }</div>
)

export default validation
