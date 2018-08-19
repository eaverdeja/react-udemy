import { ADD_PERSON, DELETE_PERSON } from './actions'

const initialState = {
    persons: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PERSON:
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            return {
                ...state,
                persons: [
                    ...state.persons,
                    newPerson
                ]
            }
        case DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(p => p.id !== action.id)
            }
        default:
            return state
    }
}

export default rootReducer
