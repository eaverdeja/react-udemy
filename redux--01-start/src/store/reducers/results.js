import {
    STORE_RESULT,
    DELETE_RESULT
} from '../actions/actions'

const initialState = {
    values: []
}

const results = (state = initialState, action) => {
    switch(action.type) {
        case STORE_RESULT:
            const now = new Date()
            return {
                values: [
                    ...state.values,
                    {
                        id: now.getTime(),
                        value: action.value
                    }
                ]
            }
        case DELETE_RESULT:
            const newResults = state
                .values
                .filter(result => result.id !== action.id)

            return { values: newResults }
        default:
            return state
    }
}

export default results
