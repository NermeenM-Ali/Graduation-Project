import * as types from '../actions/ActionTypes'

const initialState= {

        data:[],
        title:'',
        id: -1
    

}

const notificationReducer = (state=initialState, action)=> {
    switch(action.type) {
        case types.NOTIFICATION_RECIEVED:
            console.log(state)
            return {...state.data, data: [...state.data,action.payloadData], title: action.payloadTitle, id: Object.assign({}, state, {
                id: state.id+1
            })}
        default: 
            return state    
    }
}

export default notificationReducer