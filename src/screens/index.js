import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from '../store'
import RootNavigator from './RootNavigator'
/*
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
import { connect } from 'react-redux'
*/

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
          <RootNavigator/>
      </Provider>
    )
  }
}
/*
const mapStateToprops= state=>({
    isRtl: state.lang.isRtl
})

export default connect(mapStateToprops)(App)
*/











































/*import React from 'react'
import {View, Text} from 'react-native'
import {Thumbnail, List, ListItem, Icon} from 'native-base'
import AppText from '../common/AppText'
import { widthPercentageToDP as wp} from 'react-native-responsive-screen'
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
*/
/*
const RootNavigator = StackNavigator({
    UpdateProfile: {
        screen: UpdateProfile,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
    
     
    SelectLanguage: {
        screen: SelectLanguage,
        navigationOptions: {
            header: null,
            headerLeft: null 
            
       }
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
 

    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
    
    
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
  
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
    
    ContactUs: {
        screen: ContactUs,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
    
    TermsAndConditions: {
        screen: TermsAndConditions,
        navigationOptions: {
            header: null,
            headerLeft: null 
         
        }
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
   
    ForgetPassword: {
        screen: ForgetPassword,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
    
    
    Notifications: {
        screen: Notifications,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
    NotificationDetails: {
        screen: NotificationDetails,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },
    AddTask: {
        screen: AddTask,
        navigationOptions: {
            header: null,
            headerLeft: null 
        }
    },

    
    
})*/
/*
const RootNavigator = DrawerNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (
                <Icon name="ios-home" type='Ionicons' style={{ color: color.primaryColor , fontSize:wp(7), width:wp(8)}}  />
            ),
            drawerLabel: "Home"
          }
        
    },
    UpdateProfile: {
        screen: UpdateProfile,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (
                <Icon name="person-outline" type='MaterialIcons' style={{ color: color.primaryColor, fontSize:wp(7), width:wp(8) }}  />
            ),
            drawerLabel: "UpdateProfile"
            
          }
       
    },
    ContactUs: {
        screen: ContactUs,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (
                <Icon name='perm-phone-msg' type='MaterialIcons' style={{ color: color.primaryColor, fontSize:wp(7), width:wp(8)}}  />
            ),
            drawerLabel: "Contact-Us"
            
          }
          
        
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (
                <Icon name='book' type='FontAwesome' style={{ color: color.primaryColor, fontSize:wp(7), width:wp(8) }}  />
            ),
            drawerLabel: "About-Us",
           
          },
         
       
    }
}, {
    drawerBackgroundColor:'white',
    drawerPosition:'left',
    drawerWidth:wp(80),
    contentComponent: DrawerItems,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    
})


const CustomDrawerItems = (props)=> (

        
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <DrawerItems style={{flex:1}}
                            activeBackgroundColor='black'
                            activeTintColor={color.primaryColor}
                            labelStyle={{fontSize:wp(4), marginLeft:wp(2)}}
                            {...props}
                />  
            </View>
           
        
    )
*/

//export default RootNavigator