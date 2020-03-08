import React, {Component} from 'react'
import {View, TouchableOpacity, StatusBar,YellowBox} from 'react-native'
import Pdf from 'react-native-pdf'
import { RNToasty } from 'react-native-toasty'
import { AppText } from '../common'
import strings from '../assets/strings'
import * as color from '../assets/colors'
import { heightPercentageToDP  as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { responsiveHeight, responsiveWidth, moderateScale, responsiveFontSize } from "../utils/responsiveDimensions";
import { CheckBox } from 'native-base'
import Header from '../components/Header'
import { Actions } from 'react-native-router-flux'



export default class TermsAndConditions extends Component {
    constructor() {
        super()
        this.state={
            PageNum: 1,
            check: false
        }
    }
    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: Async Storage has been extracted'
          ]);
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <StatusBar hidden/>
                <Header headerText={Strings.term2} showMenu leftComponent/>
                    <Pdf
                        source={require('../assets/promoDocumentation.pdf')}
                        style={{flex: 1,width:responsiveWidth(100),height:responsiveHeight(90)}}
                        fitWidth
                        onPageChanged={(page)=>{
                            console.log('PageNumber:'+ page)
                            this.setState({
                                PageNum: page
                            })
                        }}
                        onError={(error)=>{
                            RNToasty.Error({title: error})
                        }}
                    />

               <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',position:'absolute', left:0, right:0, bottom:0, backgroundColor: 'lightgray', height:hp(7)}}>
                    <CheckBox
                            color="green"
                            checked={this.state.check}
                            onPress={()=> {
                                this.setState({check: true})
                                RNToasty.Success({title: Strings.AgreementDone})
                                Actions.pop()
                            }}
                            style={{marginRight:wp(5)}}
                    />
                      <AppText text={strings.term1} color='black' fontSize={wp(4)} alignSelf='center' />
               </View>
               

            </View>
        )
    }
}

/*
 <TouchableOpacity  onPress={()=> alert('You agree')}
                            style={{position:'absolute', left:0, right:0, bottom:0, backgroundColor: 'lightgray', height:hp(7)}}>
                    <AppText text={strings.term1} color='black' fontSize={wp(4)} alignSelf='center' marginTop={hp(1)}/>
                </TouchableOpacity>*/