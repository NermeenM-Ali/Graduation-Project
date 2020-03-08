import {AsyncStorage} from 'react-native'
import axios from 'axios'
import {BASE_END_POINT } from '../AppConfig';
import * as types from './ActionTypes'
import Strings from '../assets/strings';
import { RNToasty } from 'react-native-toasty';
import { Actions } from 'react-native-router-flux';

export const userToken =(token)=> {
    return (dispatch)=> {
        dispatch({type: types.USER_TOKEN, payload: token})
    }
}

export const currentUser = (user)=> {
    return (dispatch) => {
        dispatch({type: types.CURRENT_USER, payload: user})
    }
}

export const login =(phone, password, token)=> {
    return (dispatch)=>{
        dispatch({type: types.LOGIN_REQUSIT})
        axios.post(`${BASE_END_POINT}signin`, JSON.stringify({
            phone: phone,
            password: password
        }),{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res=> {
                axios.post(`${BASE_END_POINT}addToken`, JSON.stringify({
                    token: token
                }),{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Barear ${res.data.token}`
                    }
                })
            .then(response=> {
                AsyncStorage.setItem('@currentUser', Json.stringify(res.data))
                dispatch({type: types.LOGIN_SUCCESS, payload: res.data})
                RNToasty.Error({title: Strings.sendSuccessfully})
                Actions.home()
            }).catch((error)=> {
                if(! error.response){
                    dispatch({type: types.LOGIN_FAIL, payload: Strings.noConnection})
                }
            })
        }).catch(error=> {
            if(! error.response){
                dispatch({type: types.LOGIN_FAIL, payload: Strings.noConnection})
            }
            RNToasty.Error({title: Strings.loginError})
        })
    
    }

}
