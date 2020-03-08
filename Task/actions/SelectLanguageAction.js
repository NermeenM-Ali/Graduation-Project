import * as types from './ActionTypes'

export const changeLanguage = (change)=> {
    return (dispatch)=> {
        disptach({type: types.CHANGE_LANGUAGE, payload: change})
    }
}