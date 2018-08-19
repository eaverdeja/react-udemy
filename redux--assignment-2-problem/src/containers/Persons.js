import React, { Component } from 'react';
import { connect } from 'react-redux'

import { ADD_PERSON, DELETE_PERSON } from '../store/actions';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({ persons }) => ({
    persons
})

const mapDispatchToProps = dispatch => ({
    personAddedHandler: () => dispatch({type: ADD_PERSON}),
    personDeletedHandler: (id) => dispatch({type: DELETE_PERSON, id})
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Persons);
