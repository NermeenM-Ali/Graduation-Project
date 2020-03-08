import React, {Component} from 'react'
import {View,StatusBar, StyleSheet, Image, YellowBox, AsyncStorage} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import * as Progress from 'react-native-progress'
import {connect} from 'react-redux'
import firebase from 'react-native-firebase'
import {changeLanguage} from '../actions/changeLanguage'
import {notificationRecieved} from '../actions/NotificationAction'
import { IncrementCounter } from '../actions/counterAction'
import {userToken, currentUser} from '../actions/AuthAction'
import * as color from '../assets/colors'
import Strings from '../assets/strings'
import { Actions } from 'react-native-router-flux'



class Splash extends Component {
    checkLogin = async ()=> {
        const user = await AsyncStorage.getItem('@currentUser')
        if(user) {
            this.props.currentUser(user)
            Actions.home()
        }else {
            AsyncStorage.setItem('@currentUser', user)
            this.props.currentUser(user)
            Actions.selectLanguage()
        }
    }
    checkToken = async (token)=> {
        const t = await AsyncStorage.getItem('@userToken')
        if(t) {
            this.props.userToken(token)
        }else {
            AsyncStorage.setItem('@userToken', t)
            this.props.userToken(t)
        }
    }

    checkLanguage= async ()=> {
        const lang = await AsyncStorage.getItem('@lang')
        if(lang == 'ar') {
            this.props.changeLanguage(true)
            Strings.setLanguage('ar')
        }

        if(lang == 'en') {
            this.props.changeLanguage(false)
            Strings.setLanguage('en')
        }    
    }

   async componentDidMount() {
        this.checkLanguage()
        this.checkLogin()
        this.checkPermission();
        this.createNotificationListeners(); //add this line

        firebase.messaging().getToken()
        .then(token=> {
            console.log("Token:" + token)
            this.checkToken(token)
        })
    }

    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

   
async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
  
    this.notificationListener =  firebase.notifications().onNotification((notification) => {
        console.log(notification)
        const { body,title} = notification;
        console.log( 'Body:' + body)
        this.props.notificationRecieved( body, title)
        this.props.IncrementCounter()
    
    })
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { body, title } = notificationOpen.notification;
        console.log( 'Body:' + body)
        this.props.notificationRecieved( body, title)
        this.props.IncrementCounter()
       // Actions.notificationDetails({data: body})
        
    
        //this.showAlert(title,body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification()
    if (notificationOpen) {
            const { body,title} = notificationOpen.notification;
          //  this.showAlert(title,body);
          this.props.notificationRecieved( body, title)
            this.props.IncrementCounter()
       //   Actions.notificationDetails({data: body})
          console.log( 'Body:' + body)
        
    
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(message);
      console.log( 'Body:' + body)
        this.props.notificationRecieved( body, title)
        this.props.IncrementCounter()
        //Actions.notificationDetails({data: body})

    });
  }
  
  showAlert( body) {
    console.log(
       title,body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  
  
  
    //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // this.getToken();
       console.log('enabled')
    } else {
        this.requestPermission();
    }
  }
  
    //3
 /* async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('stored token: '+fcmToken)
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
            console.log('generated Token: '+fcmToken)
        }
    }
  }*/
  
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        console.log('permission authorized');
        // User has authorised
      //  this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }
  
  
   

    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: Async Storage has been extracted'
          ]);
        return(
            <View style={styles.container}>
                <StatusBar hidden />
                <Image source={require('../assets/imgs/smartTrach2.jpg')} style={styles.img}/>
                <Progress.Bar indeterminate={true} color={color.primaryColor} width={wp(70)} progress={0.3}/>
            </View>
        )
    }
}


const mapDispatchToProps = {
    changeLanguage,
    userToken,
    currentUser,
    notificationRecieved,
    IncrementCounter
}

const mapStateToProps = state =>({
    notifTitle: state.notif.title,
    notifData: state.notif.data
})

export default connect(mapStateToProps, mapDispatchToProps)(Splash)

const styles= StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    img: {
        width:wp(80),
        height:hp(20),
        marginVertical:hp(3)
    }
})