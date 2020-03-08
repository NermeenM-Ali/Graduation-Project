/*import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from './src/store'
//import RootNavigator from './src/screens'

import { widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {Router, Scene, Stack} from 'react-native-router-flux'
import DrawerMenu from '../components/DrawerMenu'
//import Icon from 'react-native-vector-icons/Ionicons'
import Splash from './Splash'
import SelectLanguage from './SelectLanguage'
import Home from './Home'
import Login from './Login'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import TermsAndConditions from './TermsAndConditions'
import ForgetPassword from './ForgetPassword'
import ChangePassword from './ChangePassword'
import AddTask from './AddTask'
import Notifications from './Notifications'
import NotificationDetails from './NotificationDetails'
import UpdateProfile from './UpdateProfile'
import * as color from '../assets/colors'
import Strings from '../assets/strings'

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
          <Router>
                        <Stack key='root'>
                            <Scene key='splash' component={Splash} hideNavBar initial />
                            <Scene key='selectLanguage' component={SelectLanguage} hideNavBar />

                            <Scene  key='drawer'
                                drawer
                                contentComponent={DrawerMenu}
                                drawerWidth={wp(60)}
                                drawerPosition='left'
                                hideNavBar
                                
                            >
                            <Scene key='home'  component={Home}  hideNavBar /> 
                            <Scene key='updateProfile'  component={UpdateProfile}  hideNavBar />
                            <Scene key='aboutUs' component = {AboutUs}  hideNavBar/>
                            <Scene key='contactUs' component = {ContactUs}  hideNavBar/>
                            <Scene key='termsAndConditions' component = {TermsAndConditions}  hideNavBar/>
                          </Scene>

                          <Scene key='login'  component={Login}  hideNavBar />
                          <Scene key='notifications'  component={Notifications}  hideNavBar />
                          <Scene key='notificationDetails' component = {NotificationDetails}  hideNavBar/>
                          <Scene key='forgetPassword'  component={ForgetPassword}  hideNavBar />
                          <Scene key='changePassword'  component={ChangePassword}  hideNavBar />
                          <Scene key='addTask'  component={AddTask}  hideNavBar />

                         

                        </Stack>

                </Router>
        
      </Provider>
    )
  }
}
*/