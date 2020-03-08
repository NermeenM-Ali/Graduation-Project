import React, {Component} from 'react';
import { AsyncStorage, View, Text ,YellowBox, Alert} from 'react-native';
import firebase from 'react-native-firebase';

export default class App extends Component {

async componentDidMount() {
  this.checkPermission();
  this.createNotificationListeners(); //add this line

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
      const { title, body } = notification;
      alert("Title:" +title+ 'Body:' + body)
      //this.showAlert(title, body);
  })

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification()
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    console.log(JSON.stringify(message));
  });
}

showAlert(title, body) {
  console.log(
    title, body,
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
     this.getToken();
     console.log('enabled')
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
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
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}



  render() {
    YellowBox.ignoreWarnings([
      'Async Storage has been extracted from react-native core'
    ])
    return (
      <View style={{flex: 1}}>
        <Text>Welcome to React Native!</Text>
      </View>
    );
  }
}