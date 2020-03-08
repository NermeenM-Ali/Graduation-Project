import * as types from '../actions/ActionTypes'


const initialState = {
    error:'',
    loading: false,
    userToken: null,
    currentUser: null
}

const AuthReducer = (state= initialState, action)=> {

    switch(action.type) {
        case types.LOGIN_REQUIST:
            return {...state, loading: true, error:''}
        case types.LOGIN_SUCCESS:
            return {...state, currentUser: action.payload, error: '', loading: false}    
        case types.LOGIN_FAIL:
            return {...state, error: action.payload, loading: false }
        case types.USER_TOKEN: 
            return {...state, userToken: action.payload}
        case types.CURRENT_USER:
            return {...state, currentUser: action.payload}
        case types.LOGOUT: 
            return {...state, currentUser: null, userToken: null}        
        default:
            return state    
    }
}

export default AuthReducer