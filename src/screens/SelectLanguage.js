import React, {Component} from 'react'
import {View, AsyncStorage, YellowBox, StatusBar, StyleSheet, Image, Text} from 'react-native'
import {Button, } from 'native-base'
import {connect} from 'react-redux'
import {changeLanguage} from '../actions/changeLanguage'
import AppText from '../common/AppText'
import * as color from '../assets/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Strings from '../assets/strings'
import Header from '../components/Header'
import withPreventDoubleClick from '../components/withPreventDoubleClick'
import { Actions } from 'react-native-router-flux'

const MyButton = withPreventDoubleClick(Button)
class SelectLanguage extends Component {
    /*componentDidMount(){
        Actions.refresh({key: 'drawer', ref: this.refs.navigation})
    }*/
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
                <Header  headerText={Strings.selectLanguage} showMenu />
                <View style={{alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                
                <Image source={require('../assets/imgs/smartTrach2.jpg')} style={styles.img}/>
                <MyButton style={styles.Ebtn}
                    onPress={()=> {
                        this.props.changeLanguage(false)
                        console.log('lang: ' + this.props.isRtl)
                        Strings.setLanguage('en')
                        AsyncStorage.setItem('@lang', 'en')
                        Actions.login()
                    }}
                >
                    <AppText text='English' color='white' fontSize={wp(4)} marginHorizontal={wp(19.5)} marginVertical={hp(0.5)}/>
                </MyButton>

                <MyButton style={styles.Abtn}
                      onPress={()=> {
                        this.props.changeLanguage(true)
                        console.log('lang: ' + this.props.isRtl)
                        Strings.setLanguage('ar')
                        AsyncStorage.setItem('@lang', 'ar')
                        Actions.login()
                    }}   
                >
                    <AppText text='العربية' color='white' fontSize={wp(5)} marginHorizontal={wp(20)} marginVertical={hp(0.5)}/>
                </MyButton>
                </View>

                
            </View>
        )
    }
}

const mapStateToProps = state=> ({
    isRtl: state.lang.isRtl,
  //  notifData: state.notif.data,
   // notifTitle: state.notif.title
})

const mapDispatchToPros = {
    changeLanguage
}
export default connect(mapStateToProps, mapDispatchToPros)(SelectLanguage)

const styles= StyleSheet.create({
    container: {
        flex:1,
       // justifyContent:'center',
       // alignItems:'center',
        backgroundColor:'white'
    },
    Ebtn: {
        backgroundColor: color.primaryColor,
        width: wp(55),
        height: hp(8),
        borderRadius:wp(40),
        
    },
    Abtn: {
        backgroundColor: color.buttonColor,
        width: wp(55),
        height: hp(8),
        borderRadius:wp(40),
        marginTop:hp(5),
    },
    img: {
        width:wp(80),
        height:hp(20),
        marginVertical:hp(10)
    }
   
})
/*
  <AppHeader text={Strings.selectLanguage} Licon='ios-menu'
                    onPressLeft={()=>Actions.drawerOpen()}
                />*/