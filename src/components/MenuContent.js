import React, { Component } from 'react';
import {
  View,
  Text,Alert,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Content, Icon,Thumbnail } from 'native-base';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/MenuActions';
import logout from "../actions/LogoutActions";
import { AppText, MenuItem } from '../common';
import { responsiveHeight, responsiveWidth, moderateScale,responsiveFontSize } from "../utils/responsiveDimensions";
import * as colors from '../assets/colors';
import { rootNavigator } from '../screens/Login';
import Strings from '../assets/strings';
import selectMenu from '../actions/MenuActions';
import strings from '../assets/strings';
import { RNToasty } from 'react-native-toasty';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



class MenuContent extends Component {

  state = {
    v: false,
  }

  render() {
    const {item,currentUser} = this.props;
    if(this.props.isRTL){
      Strings.setLanguage('ar')
    }else{
      Strings.setLanguage('en')
    }
    console.log("menu Content item =>   "+item);
    return (
      <View style={styles.container}>
        {currentUser&&
        <View style={{marginTop:hp(5), alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
          <AppText fontWeight='500' text={`${currentUser.user.firstname} ${currentUser.user.lastname}`} fontSize={wp(5.5)} />
          <AppText fontWeight='500' text={`${currentUser.user.phone}`} fontSize={wp(5)} />
        </View>
        }

        <View style={{marginTop:hp(5), alignSelf:'center',justifyContent:'center',alignItems:'center'}}>
          <Thumbnail
           style={{borderWidth:wp(1.5),borderColor:colors.buttonColor}} large
            source={currentUser&&currentUser.user.img?{uri:currentUser.user.img}:require('../assets/imgs/profileicon.png')} />
        </View> 

             
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{marginTop:hp(4)}}>
          <View style={{ marginBottom: hp(3)}}>
          <MenuItem
              onPress={()=>{
                console.log("main 1 =>   "+item);
                if(item == "MAIN"){
                  this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
                }else{
                  this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
                  this.props.selectMenu('MAIN');
                  this.props.navigator.resetTo({
                    screen:'Home',
                    animated: true
                  })
                }
              }}
             focused={item == 'MAIN'} iconName='home' text={Strings.home}
             />

               <MenuItem
             onPress={()=>{
             if(this.props.currentUser){
                if(item=="UPDATEPROFILE"){
                  this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
                }else{
                   this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
                  this.props.selectMenu('UPDATEPROFILE');
                  this.props.navigator.push({
                    screen:'UpdateProfile',
                    animated:true,
                  })
                }
             }else{
              RNToasty.Warn({title:Strings.checkUser})
             }
              
            }}
            focused={item == 'UPDATEPROFILE'}
            iconName='user' text={Strings.profile}/>

             
            <MenuItem
             onPress={()=>{
             if(this.props.currentUser){
                if(item=="SETTINGS"){
                  this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
                }else{
                  this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
                  this.props.selectMenu('SETTINGS');
                  this.props.navigator.push({
                    screen:'SelectLanguage',
                    animated:true,
                  })
                }
             }else{
              RNToasty.Warn({title:Strings.checkUser})
             }
              
            }}
            focused={item == 'SETTINGS'}
             iconName='cog' text={Strings.settings}/>

          
            <MenuItem
            onPress={()=>{
             
              if(this.props.currentUser){
                if(item=="CONTACTUS"){
                  this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
                }else{
                  this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
                  this.props.selectMenu('CONTACTUS');
                  this.props.navigator.push({
                    screen:'ContactUs',
                    animated:true,
                  })
                }              
              }else{
                  RNToasty.Warn({title:Strings.checkUser})
              }
             
            }}
            focused={item == 'CONTACTUS'}
             iconName='map-marker-alt' text={Strings.contactUS}/>

            <MenuItem
            onPress={()=>{
              if(item=="ABOUT"){
                this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
              }else{
                this.props.navigator.toggleDrawer({ side: this.props.isRTL ? 'right' : 'left' });
                this.props.selectMenu('ABOUT');
                this.props.navigator.push({
                  screen: 'About',
                  animated: true
                }); 
              }
              }}
            focused={item == 'ABOUT'}
             iconName='info-circle' text={Strings.aboutUS}/>

           <Button 
           onPress={()=>{
             this.props.logout(this.props.userToken,this.props.currentUser.token,this.props.navigator)
           }}
           style={{marginTop:hp(5), backgroundColor:colors.buttonColor, alignSelf:'center',width:wp(50),justifyContent:'center',alignItems:'center',borderRadius:wp(3) }}>
                <AppText text={Strings.logout} color='white' fontSize={wp(5)}/>
           </Button>

          </View>
        </ScrollView>
       
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: responsiveWidth(82),
    

  },

  linksContainer: {
    flex: 1,
    marginBottom: moderateScale(15),
  },
  linksContainerScroll: {
    flex: 1,
    marginTop: moderateScale(50)
  },

};

const mapStateToProps = state => ({
  item: state.menu.item,
  isRTL: state.lang.RTL,
  currentUser : state.auth.currentUser,
  userToken: state.auth.userToken,

});

const mapDispatchToProps = {
  selectMenu,
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps, )(MenuContent);
