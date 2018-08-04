import React, { Component } from 'react'
import * as qs from 'query-string'

const course = (props) => {
    const search = qs.parse(props.location.search)
    const id = props.match.params.id
    return (
        <div>
            <h1>{search.title}</h1>
            <p>You selected the Course with ID: {id}</p>
        </div>
    )
}

export default course;
