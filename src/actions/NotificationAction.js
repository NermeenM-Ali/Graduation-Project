import * as types from './ActionTypes'


export const notificationRecieved = ( data, title)=> {
    return (dispatch)=> {
        dispatch({
            type: types.NOTIFICATION_RECIEVED,
            payloadData: data,
            payloadTitle: title
        })
    }
}