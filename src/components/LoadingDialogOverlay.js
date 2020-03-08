import React, { Component } from "react";
import { View, Image, Text, ActivityIndicator, Platform } from "react-native";
import { Icon } from "native-base";
import { AppText } from "../common/index";
import * as colors from '../assets/colors';
import Strings from '../assets/strings';
import { responsiveHeight, responsiveWidth, moderateScale,responsiveFontSize } from "../utils/responsiveDimensions";
import { connect } from 'react-redux';
import Animation from 'lottie-react-native';
import anim from '../assets/animations/preloader.json';

class LoadingDialogOverlay extends Component {

    render() {
        const { isRTL,title } = this.props
        return (
            <View style={{elevation:5, zIndex: 10000, position: 'absolute', bottom: 0, left: 0, right: 0, top: 0,backgroundColor: 'rgba(0,0,0,0.4)', alignItems:'center', justifyContent: 'center' }} >
                <View style={{alignItems:'center', height:responsiveHeight(10), elevation: 90,backgroundColor: 'white', width: '80%', borderRadius: 10, flexDirection:isRTL?"row-reverse":'row'}}>
                    <ActivityIndicator style={{marginHorizontal:moderateScale(8)}} color='black'/>
                   <View>
                   <AppText text={title} color='black' fontSize={responsiveFontSize(2)}/>
                   </View>
                </View>
            </View>
            );
    }
}


const mapToStateProps = state => {
    return {
        isRTL: state.lang.RTL
    }
}
export default connect(mapToStateProps)(LoadingDialogOverlay);