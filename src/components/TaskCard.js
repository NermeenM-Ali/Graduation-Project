import React,{Component} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import { moderateScale, responsiveWidth, responsiveHeight, responsiveFontSize } from '../utils/responsiveDimensions';
import { connect } from "react-redux";
import FastImage from 'react-native-fast-image'
import {Card,Thumbnail,Badge} from 'native-base';
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import strings from '../assets/strings';
import * as colors from '../assets/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class TaskCard extends Component {
   
    constructor(props){
        super(props);
        moment.locale(this.props.isRTL?'ar':'en');
    }
    render(){
        const {isRTL,data} = this.props;
        return(
           <Card style={{alignSelf:'center',borderRadius:wp(5), width:wp(95),height:hp(27)}}>
               <View style={{alignItems:'center', alignSelf:isRTL? 'flex-end':'flex-start', marginVertical:hp(2),marginHorizontal:wp(3),flexDirection:isRTL?'row-reverse':'row'}}>
                    <Thumbnail large source={{uri:data.worker.img}} />
                    
                    <View style={{marginHorizontal:wp(5)}}>
                        <Text style={{marginBottom:hp(1),fontSize:wp(5.5)}}>{data.worker.firstname} {data.worker.lastname}</Text>
                        <Text style={{ color:colors.darkPrimaryColor, fontSize:wp(4)}}>{moment(data.createdAt).fromNow()}</Text>
                    </View>
               </View>

               <View style={{marginTop:hp(1), alignItems:'center'}}>
                    <View style={{flexDirection:isRTL?'row-reverse':'row'}}>
                        <Text style={{ width:wp(30),textAlign:'center', fontSize:wp(5), color:colors.buttonColor}}>{strings.binNum}</Text>
                        <Text  style={{width:wp(25),textAlign:'center', fontSize:wp(5),color:colors.darkPrimaryColor,marginHorizontal:wp(5)}}>{strings.color}</Text>
                        <Text style={{width:wp(20),textAlign:'center',fontSize:wp(5),color:colors.buttonColor}}>{strings.firm}</Text>
                    </View>
                    <View style={{flexDirection:isRTL?'row-reverse':'row'}}>
                        <Text style={{width:wp(30),textAlign:'center'}}>{data.trash.number}</Text>
                        <Text  style={{width:wp(25),textAlign:'center',marginHorizontal:wp(5)}}>{data.trash.color}</Text>
                        <Text style={{width:wp(20),textAlign:'center'}}>FCI</Text>
                    </View>
               </View>

           </Card>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        justifyContent:'center',
        alignItems:'center',
        height:responsiveHeight(16),
        width: responsiveWidth(25),
        borderRadius: moderateScale(1.5),
        backgroundColor:'white',
        elevation:2,
        shadowOffset:{width:1,height:2},
        marginHorizontal: moderateScale(5),
    },
    img: {
        width: responsiveWidth(18),
        height: responsiveHeight(11)
    }
})

const mapStateToProps = state => ({
    isRTL: state.lang.RTL,
});

export default connect(mapStateToProps)(TaskCard);
