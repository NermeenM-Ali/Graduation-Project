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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const MyTouchableOpacity =  withPreventDoubleClick(TouchableOpacity);




class NotificationCard extends Component {
    
    state = {
        ground: 0,
    }
    
    constructor(props){
        super(props)
        moment.locale(this.props.isRTL?'ar':'en');
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
            console.log("notification is red")
            console.log(Response)
        }).catch(error=>{
            console.log(error.response)
        })
    }

    render(){
        const {noti,isRTL,navigator} = this.props;
        //const dateToFormat = () => <Moment date={date} />,
        return(
            <MyTouchableOpacity style={{
             alignSelf:'center',      
            width: wp(98),
            backgroundColor:noti.read||this.state.ground>0? 'rgba(250,250,250,0.8)' : '#E8ECFF',
            elevation:2,
            shadowOffset:{width:1,height:2},
            }}
            onPress={()=>{
                this.setState({ground:1});
                this.readNotification(noti.id)
                if(                   
                    noti.description.toLowerCase().includes('is Full'.toLocaleLowerCase())
                    //notDescription.toLowerCase().includes('reply on your search order')
                    ){
                    navigator.push({
                        screen: 'NotificatioDetails',
                        animated: true,
                        passProps:{
                            description: noti.description,
                            subject: noti.subject,
                        }
                    })
                    
                }
                /*else if(             
                    notDescription.toLowerCase().includes('accept your Product'.toLocaleLowerCase())|| 
                    notDescription.toLowerCase().includes('Product Top'.toLocaleLowerCase())||
                    notDescription.toLowerCase().includes('Product Low'.toLocaleLowerCase())
                    ){
                    navigator.push({
                        screen: 'NotificationProductDetails',
                        animated: true,
                        passProps:{
                            source: 'orders',
                            subject: subject,
                        }
                    })
                }else if(notDescription.toLowerCase().includes('accept your rigister'.toLocaleLowerCase())){
                    navigator.push({
                        screen: 'Accept',
                        animated: true,
                    })
                }else if(notDescription.toLowerCase().includes('someone search about this product'.toLocaleLowerCase())){
                    navigator.push({
                        screen: 'NotificationSearchedProductResponse',
                        animated: true,
                        passProps:{
                            subject: subject,
                        }
                    })
                }*/               
            }}
            >
               <View style={{alignItems:'center',marginHorizontal:wp(3), marginTop:hp(1), flexDirection:isRTL?'row-reverse':'row'}}>
                    <Thumbnail style={{borderWidth:1}} small source={require('../assets/imgs/sg2.png')} />
                    <View style={{marginHorizontal:wp(3.5)}}>
                        <AppText text={noti.description} fontSize={wp(4)} color={colors.buttonColor} />
                    </View>
               </View>
               
               <View style={{marginHorizontal:wp(3), alignSelf:isRTL?'flex-start':'flex-end'}}>
                    <AppText text={moment(noti.createdAt).fromNow()} color='gray' />
               </View>

            </MyTouchableOpacity>
        );
    }
}


const mapStateToProps = state => ({
    isRTL: state.lang.RTL,
    currentUser: state.auth.currentUser,
});



export default connect(mapStateToProps)(NotificationCard);
