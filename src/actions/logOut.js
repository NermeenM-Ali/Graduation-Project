import {LOGOUT} from '../actions/ActionTypes'

export const logout = ()=> {
    return (dispatch)=> {
        dispatch({type: LOGOUT})
    }
}