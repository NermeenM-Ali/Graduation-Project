import * as types from '../actions/ActionTypes'

const initialState= {
    counter:0
}

const counterReducer = (state=initialState, action)=> {
    switch(action.type) {
        case types.INCREMENT_COUNTER:
                return Object.assign({}, state, {
                    counter: state.counter+1
                })
            case types.DECREMENT_COUNTER: 
                return Object.assign({}, state, {
                    counter: state.counter-1
                })
            default:
                return state        
    }
}

export default counterReducer