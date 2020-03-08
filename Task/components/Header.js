import React, {Component} from 'react'
import {Text, View, StatusBar, StyleSheet, Platform} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as color from '../assets/colors'
import {Icon, Button, Badge} from 'native-base'
import { moderateScale, responsiveWidth, responsiveHeight, responsiveFontSize } from '../utils/responsiveDimensions';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import AppText from '../common/AppText'

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export default class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {textStyle, viewStyle} = styles
        const {headerText, showMenu, backColor,backAction, leftComponent, rightComponent, showNotifications, showCart , showSearch} = this.props
        return (
            <View style={{ ...styles.header, backgroundColor: backColor, flexDirection: this.props.isRtl ? 'row' : 'row-reverse', }}>
                <StatusBar hidden/>
               
                <View style={{ marginHorizontal:moderateScale(4), justifyContent:'center',alignItems:'center',flexDirection: this.props.isRtl ? 'row' : 'row-reverse' }} >
                   

                    {
                        showNotifications && rightComponent?
                        <Button transparent onPress={()=> Actions.notifications()}  >
                           <Icon name='ios-notifications' type='Ionicons' style={{...styles.icon, marginRight:wp(-1), marginLeft:wp(-1)}} />
                                <Badge style={{ backgroundColor: 'white' }}>
                                   <Text style={{ color: color.primaryColor }}>0</Text>
                                    </Badge>
                              </Button>
                        :
                        <AppText text=''/>
                    }

                    {
                      showCart && rightComponent?
                      <Button transparent >
                      <Icon name={this.props.isRtl ? "ios-cart" : "ios-cart"} type='Ionicons' style={styles.icon} />
                      </Button>
                      :
                      <AppText text=''/>

                    }

                    {
                      showSearch ?
                      <Button transparent >
                            <Icon name={this.props.isRtl ? "ios-search" : "ios-search"} type='Ionicons' style={styles.icon} />
                        </Button>
                        :
                        <AppText text=''/>
                    }

                    

                </View>
               
                <View style={{ ...styles.centerContainer, justifyContent: this.props.isRtl ? 'flex-end' : 'flex-start', marginLeft:wp(5),  }}>
                    <Text style={textStyle}>{headerText}</Text>
                </View> 

                <View style={{ ...styles.rightContainer, alignItems: 'center', justifyContent: 'center', flexDirection: this.props.isRtl ? 'row' : 'row-reverse'}}>
                    {
                        showMenu ?
                        <Button transparent style={{justifyContent:'center', alignItems:'center', marginLeft:wp(2)}} >
                              <Icon name='ios-menu' type='Ionicons' style={styles.icon} />  
                        </Button>
                        
                        :
                        <AppText text=''/>
                    }

                    {
                        backAction &&leftComponent?
                        <Button transparent onPress={()=> Actions.pop()}>
                            <Icon name={this.props.isRtl ? "md-arrow-round-forward" : "md-arrow-round-back"} type='Ionicons' style={styles.icon} />
                        </Button>
                        :
                        <AppText text=''/>
                    }

                    

                    
                </View>   
            </View>
        )
    }
}
/*
const mapStateToProps  = state=> ({
    isRtl: state.lang.isRtl,
    countNum: state.count.counter,
})
export default connect(mapStateToProps)(Header)
*/
const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: color.primaryColor,
        //justifyContent: 'center',
        //alignItems: 'center',
        height: hp(8),
        padding:hp(2),
        shadowColor:'#000',
        shadowOffset: {width:0, height: 5},
        shadowOpacity: 0.9,
        elevation: 3,
        position: 'relative'
    },
    header: {
        paddingTop: STATUSBAR_HEIGHT,
        height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
          height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
        zIndex: 7000,
      },
    textStyle: {
        fontSize: wp(4),
        color:'black',
        
        
    },
    centerContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: Platform.OS == 'android' ? 'flex-end' : 'center',
        alignItems: 'center',
        marginHorizontal:wp(4)
      },
      
      rightContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal:wp(-4)
      },
      button: {
        marginHorizontal: 15,
      },
      icon: {
        color: 'black',
        fontSize: responsiveFontSize(3.2),
    
        
      },
      badge: {
        color: '#fff',
        fontSize: responsiveFontSize(4),
        marginTop:-13,
      },
      icon1: {
        color: 'black',
        fontSize: responsiveFontSize(3.2),
      },
      unseenCountPadge: {
        backgroundColor: '#DCC000',
        position: 'absolute',
        width: responsiveWidth(5),
        height: responsiveWidth(5),
        top: moderateScale(-3),
        right: moderateScale(-3),
        borderRadius: responsiveWidth(2.5),
        alignItems: 'center',
        justifyContent: 'center',
      },
      unseenCountPadgeText: {
        color: '#000',
        fontSize: responsiveFontSize(1.5),
        fontWeight: 'bold',
      },
})
