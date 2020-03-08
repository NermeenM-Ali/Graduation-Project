import {combineReducers} from 'redux'
import changeLanguageReducer from './changeLanguageReducer'
import AuthReducer from './AuthReducer'
import notificationReducer from './NotificationReducer'
import counterReducer from './counterReducer'
import {reducer as formReducer} from 'redux-form'

const allReducers = combineReducers({
    lang: changeLanguageReducer,
    auth: AuthReducer,
    notif: notificationReducer,
    count: counterReducer,
    form: formReducer

})

export default allReducers