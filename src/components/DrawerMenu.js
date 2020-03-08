import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Button, Content, Left, Right, Thumbnail, Body,List, ListItem,Icon} from 'native-base'
//import {createDrawerNavigator, createAppContainer} from 'react-navigation'

import { Actions } from 'react-native-router-flux';
import Strings from '../assets/strings';
import {changeLanguage} from '../actions/changeLanguage'
import {logout} from '../actions/logOut'
import { RNToasty } from 'react-native-toasty';
import {connect} from 'react-redux';
import * as color from '../assets/colors'
//import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppText from '../common/AppText'

class DrawerMenu extends Component {
    render() {
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center',backgroundColor:'white'}}>

                    <Thumbnail large 
                               source={require('../assets/imgs/drawer.jpg')} 
                               style={{width:wp(30), height:wp(30), borderRadius:wp(25)}}
                    />
                    <AppText  text= {Strings.Personalname} style={{fontSize:wp(3), fontWeight:'bold',  marginTop: hp(5)}} color={color.primaryColor}/>
                    <AppText text= {Strings.personalProfile} style={{fontSize:wp(2.5), fontWeight:'bold',  marginTop: hp(1)}} color={color.primaryColor}/>
                </View>

                <View style={{flex:2  }}>
                    <Content  >
                        <List >
                            <ListItem  style={{flexDirection: this.props.isRtl? 'row-reverse' : 'row'}} onPress={()=>Actions.home()}>
                                <Icon name='ios-home' type='Ionicons' style={{fontSize:wp(6), color:color.primaryColor}} />
                                <AppText text= {Strings.home} color={color.primaryColor}  marginHorizontal= {wp(2)} onPress={()=> Actions.home()}/>
                            </ListItem>

                            <ListItem   style={{flexDirection: this.props.isRtl? 'row-reverse' : 'row'}} onPress={()=>Actions.updateProfile()}>
                                <Icon name='person' type='MaterialIcons' style={{fontSize:wp(6), color:color.primaryColor}} />
                                <AppText text= {Strings.updateProfile} color={color.primaryColor}  marginHorizontal= {wp(2)} onPress={()=> Actions.splash()}/>
                            </ListItem>

                            <ListItem   style={{flexDirection: this.props.isRtl? 'row-reverse' : 'row'}} onPress={()=>Actions.aboutUs()}>
                                <Icon name='book' type='FontAwesome' style={{fontSize:wp(6), color:color.primaryColor}}/>
                                <AppText text= {Strings.aboutUS} color={color.primaryColor}  marginHorizontal= {wp(2)} onPress={()=> Actions.aboutUs()}/>
                            </ListItem>

                            <ListItem   style={{flexDirection: this.props.isRtl? 'row-reverse' : 'row'}} onPress={()=>Actions.contactUs()}>
                                <Icon name='perm-phone-msg' type='MaterialIcons' style={{fontSize:wp(6), color:color.primaryColor}} />
                                <AppText text= {Strings.contactUS} color={color.primaryColor}  marginHorizontal= {wp(2)} onPress={()=> Actions.contactUs()}/>
                            </ListItem>

                            <ListItem   style={{flexDirection: this.props.isRtl? 'row-reverse' : 'row'}} onPress={()=>Actions.termsAndConditions()}>
                                <Icon name='file-contract' type='FontAwesome5' style={{fontSize:wp(6), color:color.primaryColor}} />
                                <AppText text= {Strings.term2} color={color.primaryColor}  marginHorizontal= {wp(2)} onPress={()=> Actions.contactUs()}/>
                            </ListItem>

                            <ListItem   style={{flexDirection: this.props.isRtl? 'row-reverse' : 'row'}}
                             onPress={()=>{
                                this.props.logout()
                                Actions.splash()}}>
                                <Icon name='logout' type='SimpleLineIcons' style={{fontSize:wp(6), color:color.primaryColor}} />
                                <AppText text= {Strings.logout} color={color.primaryColor}  marginHorizontal= {wp(2)} onPress={()=> Actions.contactUs()}/>
                            </ListItem>

                            
                        </List>
                    </Content>
                </View>       
            </View>
        )
    }
}

const mapDispatchToProps = {
    changeLanguage,
    logout
 }
 const mapStateToProps = state => ({
     isRtl: state.lang.isRtl,
    
 })
export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu)



























