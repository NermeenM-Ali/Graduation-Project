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

class LoadingOverlay extends Component {



    componentDidMount(){
        this.animation.play();
    }

    render() {
        const { isRTL } = this.props
        return (
            <View style={{zIndex: 10000, position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }} >

                <View style={{ elevation: 10, justifyContent: 'center',  alignItems: 'center', backgroundColor: 'white', width: '80%', borderRadius: 10, padding: 20 }} >
                    
                <View>
                    <Animation
                        
                        ref={animation => {
                        this.animation = animation;
                        }}
                        style={{
                          
                        width: 120,
                        height: 80
                        }}
                        loop={true}
                        source={anim}
                    />
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
export default connect(mapToStateProps)(LoadingOverlay);