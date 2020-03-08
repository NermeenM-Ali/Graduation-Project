import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Platform,Text,
  StyleSheet,
} from 'react-native';
import { Icon, Button,Badge } from 'native-base';
//import { Navigation } from 'react-native-navigation';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import AppTitle from './AppTitle';
import { moderateScale, responsiveWidth, responsiveHeight, responsiveFontSize } from '../utils/responsiveDimensions';
import allStrings from '../assets/strings';
import * as allColors from '../assets/colors';
import AppText from './AppText';
import { RNToasty } from 'react-native-toasty';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

class AppHeader extends Component {
//kant wa5da prameter esmo navigator
  renderHamburger() {
    return (
      <View>
        <TouchableOpacity
          style={{ ...styles.button }}
          onPress={() =>
            Actions.drawerOpen()
            /*navigator.toggleDrawer({
              side: this.props.isRTL ? 'right' : 'left',
            })*/
          }
        >
          <Icon name="ios-menu" style={{ ...styles.icon }} />
        </TouchableOpacity>
      </View>
    );
  }


  renderCart() {
    return (

      // <View style={{ justifyContent: 'center', alignItems: 'center' }} >

      //   <TouchableOpacity
      //     onPress={() => this.props.navigator.push({ screen: 'ClientShoppingCart' })}
      //   > <Icon name="cart-plus" type="MaterialCommunityIcons" style={{ ...styles.icon }} />
      //   </TouchableOpacity>
      // </View>
      <TouchableOpacity
       onPress={()=>{
        if(this.props.currentUser){
         /* this.props.navigator.push({
            screen:'CustomerShoppingBacket',
            animated:true,
          })*/
        }else{
          RNToasty.Warn({title:allStrings.checkUser}) 
        }
        
       }}
       style={{ justifyContent: 'center', marginHorizontal: 5, alignItems: 'center' }} /*onPress={() => this.props.navigator.push({ screen: 'ClientShoppingCart' })}*/>


        {/*<View style={{ position: "absolute", zIndex: 1000, top: responsiveHeight(1.5), right: this.props.isRTL ? 0 : null, left: this.props.isRTL ? null : 0, justifyContent: 'center', alignItems: 'center', width: responsiveHeight(3), height: responsiveHeight(3), borderRadius: responsiveHeight(1.5), backgroundColor: allColors.colorButtons }} >
          <AppText text={this.props.unseenCount} fontSize={responsiveFontSize(2)} color={allColors.textButtonColor} />
    </View>*/}
     <Badge danger style={{elevation:2, height:20, justifyContent:'center',alignItems:'center'}}>
            <Text style={{alignSelf:'center', fontSize:10, color:'white'}}>{this.props.orders.productOrders.length}</Text>
      </Badge>
        <Icon name="cart" type="MaterialCommunityIcons" style={{ ...styles.badge }} />
      </TouchableOpacity>

    )
  }

  renderFilter() {
    return (
      <View style={{ justifyContent: 'center', marginHorizontal: 5, alignItems: 'center' }} >
        <TouchableOpacity
         /* onPress={() => this.props.navigator.push({ screen: 'FilterScreen' })}*/
        >
          <Icon name="filter" type="MaterialCommunityIcons" style={{ ...styles.icon }} />
        </TouchableOpacity>
      </View>
    )
  }
  //kant wa5da navigation parameter
  renderBackButton() {
    const { navigator, modal, backAction, isRTL } = this.props;

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (backAction) {
            Actions.pop()
           //backAction();    
            return;
          }
          if (modal) {
           // Navigation.dismissModal();
          } else {
            Actions.pop()
           /* navigator.pop({
              animated: true,
            });*/
          }
        }}
      // md-arrow-round-forward
      >
        <Icon name={isRTL ? "md-arrow-round-forward" : "md-arrow-round-back"} type="Ionicons" style={styles.icon} />
      </TouchableOpacity>
    );
  }

  render() {
    const { menu, title, leftComponent, rightComponent, showLoginStuff, showBurger, showBack, showCart, showFilter, navigator, isClient, isRTL } = this.props;
    return (
      <View style={{ ...styles.header, backgroundColor: allColors.primaryColor, flexDirection: isRTL ? 'row' : 'row-reverse', }}>
        <View style={{ marginHorizontal:moderateScale(4), justifyContent:'center',alignItems:'center',flexDirection: isRTL ? 'row' : 'row-reverse' }} >
          {isClient && showCart && this.renderCart()}
          {leftComponent}
          {/* {isClient && showFilter && this.renderFilter()} */}
        </View>
       
        <View style={{ ...styles.centerContainer, justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
          <AppTitle text={title}  color='white'/>
          { 
          menu && 
          menu()
          }
        </View>
        
        <View style={{ ...styles.rightContainer, alignItems: 'center', justifyContent: 'center', flexDirection: isRTL ? 'row' : 'row-reverse'}}>
          {showBurger && this.renderHamburger()}
          {showBack && this.renderBackButton()}
          {rightComponent}
        </View>
      </View>
    );
  }
}

const styles = {
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
  rightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: Platform.OS == 'android' ? 'flex-end' : 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 15,
  },
  icon: {
    color: '#fff',
    fontSize: responsiveFontSize(3.2),
  },
  badge: {
    color: '#fff',
    fontSize: responsiveFontSize(4),
    marginTop:-13,
  },
  icon1: {
    color: '#fff',
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
};


const mapStateToProps = state => ({
  //unseenCount: state.cart.unseenCount,
  isClient: state.auth.currentUser?state.auth.currentUser.user.type === "CLIENT" ? true : false:{},
  isRTL: state.lang.RTL,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(AppHeader);
