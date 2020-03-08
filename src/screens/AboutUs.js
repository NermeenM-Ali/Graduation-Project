import React, {Component} from 'react'
import {View,YellowBox, StyleSheet, StatusBar, Image} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { AppText} from '../common'
import Strings from '../assets/strings'
import * as color from '../assets/colors'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { Actions } from 'react-native-router-flux'
 class AboutUs extends Component {
    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: Async Storage has been extracted'
          ]);
        return(
            <View style={styles.container}>
                <StatusBar hidden/>
                <Header headerText={Strings.aboutUS} showMenu
                />

                <View style={{alignItems:'center', marginTop:hp(3),direction: this.props.isRtl? 'rtl': 'ltr' }}>
                    <Image source={require('../assets/imgs/smartTrach2.jpg')} style={styles.img}/>
                    <AppText text={Strings.version} fontSize={wp(3)} marginTop={hp(-5)} />
                    
                </View>

                <View style={{marginTop: hp(10), marginHorizontal:wp(3)}}>
                    <AppText text={Strings.appName} fontSize={wp(4)} fontWeight='500' color={color.buttonColor} style={{marginTop:hp(3)}}/>
                </View>

                <View style={{  marginLeft:wp(1),flexDirection:this.props.isRtl? 'row-reverse': 'row', }}>
                    <AppText text={Strings.aboutTitle} fontSize={wp(3.5)}  marginHorizontal={wp(2)}/>
                </View>

                <View style={{flexDirection:this.props.isRtl? 'row-reverse': 'row',position:'absolute', bottom:0, left:0, right:0, backgroundColor:'#D7DBDD', alignItems:'center',justifyContent:'center', height:hp(7)}}>
                    
                    <AppText text={Strings.thisAppDesigned} fontSize={wp(4)} color='black' marginLeft={wp(2)}  marginTop={wp(2.5)} />
                    <AppText text={Strings.firmName} fontSize={wp(4)} color='black' marginTop={wp(2)}/>
                    <Image source={require('../assets/imgs/drawer.jpg')} style={{width:wp(9), height:hp(6), marginLeft:wp(2)}}/>
                    <AppText/>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isRtl: state.lang.isRtl
})
export default connect(mapStateToProps)(AboutUs)

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    img: {
        width:wp(80),
        height:hp(20),
        marginVertical:hp(3)
    }
})