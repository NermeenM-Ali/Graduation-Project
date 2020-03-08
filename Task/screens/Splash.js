import React, { Component } from 'react'
import { YellowBox, StatusBar, View , Image, Dimensions} from 'react-native'
import { Spinner } from 'native-base'
import {widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { Actions } from 'react-native-router-flux'

const WIDTH = Dimensions.get('screen').width 
export default class Splash extends Component {
    switch=() =>{
        setTimeout(()=>{
            Actions.info()
        }, 1000)
    }
    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: Async Storage has been extracted'
          ]);
        return(
            <View style={{flex:1, backgroundColor:'#FF5C5C', justifyContent:'center', alignItems:'center'}}>
                <StatusBar hidden/>
                <Image source={require('../imgs/fm.png')} style={{width:WIDTH, height:hp(23)}}/>
                <Spinner size='large' color='white'>
                    {this.switch()}
                </Spinner>
            </View>
        )
    }
}