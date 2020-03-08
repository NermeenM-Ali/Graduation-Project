
import React, { Component } from "react";
import { Text, Platform, View, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import { connect } from "react-redux";
import { responsiveHeight, responsiveWidth, moderateScale } from "../utils/responsiveDimensions";
import * as colors from '../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import withPreventDoubleClick from '../components/withPreventDoubleClick';
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP} from 'react-native-responsive-screen';

const MyTouchableOpacity =  withPreventDoubleClick(TouchableOpacity);

class MenuItem extends Component {

    renderNormal() {
        const { text, focused, onPress, userType, isRTL,iconName } = this.props;

        return (
            <MyTouchableOpacity style={{ backgroundColor:"transparent",height:hp(8),alignItems:'center',justifyContent:'center'}} onPress={onPress}>
                <View style={{width:wp(40), alignSelf:'center',flexDirection: isRTL ? "row-reverse" : 'row',alignItems:'center'}} >
                   <Icon  name={iconName} color={focused? colors.darkPrimaryColor : colors.buttonColor} size={wp(5.5)}  />
                   <AppText marginHorizontal={wp(5)} fontWeight='600' text={text} textAlign="center" fontSize={wp(5)} color={focused? colors.darkPrimaryColor : colors.buttonColor} />
                </View>
            </MyTouchableOpacity>
        )
    }
    render() {
        return this.renderNormal();
    }
}


const styles = {
    container: {
        borderWidth:2,
        alignItems:'center',
        height: responsiveHeight(8),
        width: "100%",
        marginBottom: moderateScale(2),
       // paddingRight: moderateScale(10)
    },
}

const mapStateToProps = state => ({
    isRTL: state.lang.RTL,
});

export default connect(mapStateToProps)(MenuItem);
