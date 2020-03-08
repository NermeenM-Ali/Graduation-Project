import React, { Component } from "react";
import { View, Image, Text, ActivityIndicator, Platform } from "react-native";
import { Icon } from "native-base";
import { AppText } from "../common/index";
import * as colors from '../assets/colors';
import Strings from '../assets/strings';
import { responsiveHeight, responsiveWidth, moderateScale,responsiveFontSize } from "../utils/responsiveDimensions";
import { connect } from 'react-redux';
import Animation from 'lottie-react-native';
import anim from '../assets/animations/loading.json';

export default class ListFooter extends Component {

    componentDidMount(){
        this.animation.play();
    }

    render() {
        return (
            <View>
            <Animation
                
                ref={animation => {
                this.animation = animation;
                }}
                style={{
                  
                width: 140,
                height: 100
                }}
                loop={true}
                source={anim}
            />
        </View>
            );
    }
}
