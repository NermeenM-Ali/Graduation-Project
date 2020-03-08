import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import { Icon, Button } from 'native-base';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import AppTitle from '../common/AppTitle';
import { moderateScale, responsiveWidth, responsiveHeight, responsiveFontSize } from '../utils/responsiveDimensions';
import allStrings from '../assets/strings';
import * as allColors from '../assets/colors';
import AppText from '../common/AppText';
import {goToBack} from '../actions/SignupAction';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

class ChangeableHeader extends Component {

  renderHamburger(navigator) {
    return (
      <View>
        <TouchableOpacity
          style={{ ...styles.button }}
          onPress={() =>
            navigator.toggleDrawer({
              side: this.props.isRTL ? 'right' : 'left',
            })
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
      <TouchableOpacity style={{ justifyContent: 'center', marginHorizontal: 5, alignItems: 'center' }} onPress={() => this.props.navigator.push({ screen: 'ClientShoppingCart' })}>


        <View style={{ position: "absolute", zIndex: 1000, top: responsiveHeight(1.5), right: this.props.isRTL ? 0 : null, left: this.props.isRTL ? null : 0, justifyContent: 'center', alignItems: 'center', width: responsiveHeight(3), height: responsiveHeight(3), borderRadius: responsiveHeight(1.5), backgroundColor: allColors.colorButtons }} >
          <AppText text={this.props.unseenCount} fontSize={responsiveFontSize(2)} color={allColors.textButtonColor} />
        </View>
        <Icon name="cart" type="MaterialCommunityIcons" style={{ ...styles.icon }} />
      </TouchableOpacity>

    )
  }

  renderFilter() {
    return (
      <View style={{ justifyContent: 'center', marginHorizontal: 5, alignItems: 'center' }} >
        <TouchableOpacity
          onPress={() => this.props.navigator.push({ screen: 'FilterScreen' })}
        >
          <Icon name="filter" type="MaterialCommunityIcons" style={{ ...styles.icon }} />
        </TouchableOpacity>
      </View>
    )
  }
  renderBackButton(navigation) {
    const { navigator, modal, backAction, isRTL } = this.props;

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          this.props.goToBack()
        }}
      // md-arrow-round-forward
      >
        <Icon name={isRTL ? "md-arrow-round-forward" : "md-arrow-round-back"} type="Ionicons" style={styles.icon} />
      </TouchableOpacity>
    );
  }

  render() {
    const { title, leftComponent, rightComponent, showLoginStuff, showBurger, showBack, showCart, showFilter, navigator, isClient, isRTL } = this.props;
    return (
      <View style={{ ...styles.header, backgroundColor: allColors.primaryColor, flexDirection: isRTL ? 'row' : 'row-reverse', }}>
        <View style={{ marginHorizontal:moderateScale(4), justifyContent:'center',alignItems:'center',flexDirection: isRTL ? 'row' : 'row-reverse' }} >
          {isClient && showCart && this.renderCart()}
          {leftComponent}
          {/* {isClient && showFilter && this.renderFilter()} */}
        </View>
       
        <View style={{ ...styles.centerContainer,flex:title?4:2, justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
          <AppTitle text={title} />
        </View>
        
        <View style={{ ...styles.rightContainer, alignItems: 'center', justifyContent: 'center', flexDirection: isRTL ? 'row' : 'row-reverse'}}>
          {showBurger && this.renderHamburger(navigator)}
          {showBack && this.renderBackButton(navigator)}
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
  isRTL: state.lang.RTL
});

const mapDispatchToProps = {
  goToBack,
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangeableHeader);
