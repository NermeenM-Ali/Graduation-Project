import React,{Component} from 'react';
import {View,Alert,TouchableOpacity} from 'react-native';
import { moderateScale, responsiveWidth, responsiveHeight, responsiveFontSize } from '../utils/responsiveDimensions';
import { connect } from "react-redux";
import AppText from '../common/AppText';
import * as colors from '../assets/colors'
import Strings from '../assets/strings';
import { Thumbnail } from 'native-base';
import moment from 'moment'
import "moment/locale/ar"
import axios from 'axios';
import { BASE_END_POINT} from '../AppConfig';
import withPreventDoubleClick from './withPreventDoubleClick';

const MyTouchableOpacity =  withPreventDoubleClick(TouchableOpacity);




class CommentsCard extends Component {
    
    state = {
        ground: 0,
    }
    
    componentDidMount(){
       // moment.locale(this.props.isRTL ? 'ar' : 'en');
    }

    readNotification = (notID) => {
          console.log(notID)
        axios.put(`${BASE_END_POINT}notif/${notID}/read`,{}, {
            headers: {
              'Content-Type': 'application/json',
              //this.props.currentUser.token
              'Authorization': `Bearer ${this.props.currentUser.token}`
            },
        }).then(Response=>{
            console.log(Response)
        }).catch(error=>{
            console.log(error.response)
        })
    } 
    render(){
        const {data,isRTL,navigator} = this.props;
        //const dateToFormat = () => <Moment date={date} />,
        return(
            <MyTouchableOpacity style={{
            height:responsiveHeight(10),
             borderRadius:moderateScale(3), 
             alignSelf:'center',      
            width: responsiveWidth(95),
            backgroundColor:'rgba(237, 232, 232,0.6)',
            elevation:2,
            shadowOffset:{width:1,height:2},
            }}
            onPress={()=>{
                    
            }}
            >
              <View style={{alignItems:'center',marginHorizontal:moderateScale(6), marginTop:moderateScale(4), flexDirection:isRTL?'row-reverse':'row'}}>
                    <Thumbnail
                     small
                     source={data.user.img?{uri:data.user.img}:require('../assets/imgs/profileicon.png')} />
                    <View>

                        <View style={{width:responsiveWidth(72), alignItems:'center', marginHorizontal: moderateScale(6),flexDirection:isRTL?'row-reverse':'row',justifyContent:'space-between' }}>
                            <View style={{flexDirection:isRTL?'row-reverse':'row' }}>
                                <AppText text={`${data.user.firstname} ${data.user.lastname}`} fontSize={responsiveFontSize(2.5)} fontWeight='400' color='black' />
                                <AppText text=' . ' fontSize={responsiveFontSize(2.5)} fontWeight='400' color='gray' />
                                <AppText text={moment(data.createdAt).fromNow()} fontSize={responsiveFontSize(2)}  />
                            </View>
                           
                            <AppText text={data.price} fontSize={responsiveFontSize(2.5)} fontWeight='400' color='red' />
                           
                        </View>

                        <View style={{marginHorizontal: moderateScale(6)}}>
                           <AppText text={data.comment}fontSize={responsiveFontSize(2.2)} fontWeight='400' color='gray' />
                        </View>
                        
                    </View>
                                                              

             
               </View>

            </MyTouchableOpacity>
        );
    }
}


const mapStateToProps = state => ({
    isRTL: state.lang.RTL,
    currentUser: state.auth.currentUser,
});



export default connect(mapStateToProps)(CommentsCard);
