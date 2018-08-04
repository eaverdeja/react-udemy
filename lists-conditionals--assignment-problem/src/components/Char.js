import React from 'react'

const styles = {
    'display': 'inline-block',
    'padding': '6px',
    'textAlign': 'center',
    'margin': '6px',
    'border': '1px solid'
}

const char = ({ letter, onClick }) => (
    <span
        style={ {...styles} }
        onClick={onClick}
    >
    {letter}
    </span>
)

export default char
