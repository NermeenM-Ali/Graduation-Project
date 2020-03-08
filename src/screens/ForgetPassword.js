import React, {Component} from 'react'
import {YellowBox, StatusBar, View, Text, Keyboard} from 'react-native'
import Header from '../components/Header'
import Strings from '../assets/strings'
import * as color from '../assets/colors'
import { CardItem, Card, Item, Input ,Button, Label} from 'native-base';
import { responsiveHeight, responsiveWidth, moderateScale, responsiveFontSize } from "../utils/responsiveDimensions";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import StepIndicator from 'react-native-step-indicator'
import Swiper from 'react-native-swiper'
import {Field, reduxForm} from 'redux-form'
import AppInput from '../common/AppInput'
import { connect } from 'react-redux'
import {BASE_END_POINT} from '../AppConfig';
import AppText from '../common/AppText'
import axios from 'axios'
import { RNToasty } from 'react-native-toasty'
import CodeInput from 'react-native-confirmation-code-input'
import { Actions } from 'react-native-router-flux'

const customStyles = {
    stepIndicatorSize: 35,
    currentStepIndicatorSize:40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: color.primaryColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: color.primaryColor,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: color.primaryColor,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: color.primaryColor,
    stepIndicatorUnFinishedColor: 'white',
    stepIndicatorCurrentColor: 'white',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: color.primaryColor,
    stepIndicatorLabelFinishedColor: 'white',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 15,
    currentStepLabelColor: color.primaryColor
  }

  
const validate = (values)=>{
    const errors = {}

    if(!values.phone) {
        errors.phone = Strings.require

    }
    if(!values.newPassword){
        errors.newPassword = Strings.require
    }
    if(!values.confirmPassword){
        errors.confirmPassword = Strings.require
    }
    return errors
}
class InputComponent extends Component {
    render() {
        const {
            inputRef,returnKeyType,onSubmit,onChange,input,label,borderColor,
            type,password, numeric,textColor,icon,iconType,marginBottom,
            isRTL,iconColor,editable,isRequired,meta: { touched, error, warning },
        } = this.props;

        let hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <AppInput
                onEndEditing={() => input.onBlur(input.value)}
                onBlur={() => input.onBlur(input.value)}
                onChange={onChange}
                ref={inputRef}
                icon={icon}
                iconType={iconType}
                textColor={textColor}
                marginBottom={marginBottom}
                hasError={hasError && touched}
                error={error}
                input={input}
                label={label}
                type={type}
                isRTL={this.props.isRtl}
                password={password}
                numeric={numeric}
                editable={editable}
                borderColor={borderColor}
                iconColor={iconColor}
                onSubmit={onSubmit}
                blurOnSubmit={false}
                returnKeyType={returnKeyType}
                isRequired={isRequired}
            />
        );
    }
}

class ForgetPassword extends Component {
    constructor(props) {
        super(props)
    }
    state={
        currentPosition:0,
        error: null,
        loading: false,
        NewPass:'',
        ConfirmPass: '',
        
    }

    renderInsertPhone=()=>{
        const {handleSubmit} = this.props
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <View style={{ width:wp(80), marginTop: hp(7), alignSelf:'center'}}>
                <Field
                    name='phone' label={Strings.mobileNumber} component={InputComponent}
                    returnKeyType='done'
                    onSubmit={()=> Keyboard.dismiss()}
                    isRTL={this.props.isRtl}
                    textColor={color.darkPrimaryColor}
                    borderColor= 'gray'
                    numeric
                   // onChangeText={(mobileNumber)=> this.setState({mobileNumber})}
                   
                />
                
                 
                
            </View>
            <View style={{backgroundColor:'white', alignItems:'center', justifyContent:'center', marginTop:hp(7)}}>
                    <Button onPress={()=> {                    
                    handleSubmit(this.onInsertPhone.bind(this))
                }}
                transparent rounded style={{width:wp(50), alignItems:'center', justifyContent:'center',height: hp(7), borderWidth:wp(0.3), borderColor: color.primaryColor, marginVertical:hp(7)}}>
                <AppText text={Strings.next} fontSize={wp(4)} color={color.primaryColor} />
                </Button>
            </View>

           {/* <View style={{marginTop:hp(15)}}>
            <Button onPress={()=>{ handleSubmit(this.onInsertPhone.bind(this))    
            }}
                    transparent style={{alignSelf:this.props.isRtl?'flex-start':'flex-end',position:'absolute', bottom:0, marginTop:hp(15)}}>
                <Text style={{fontSize:wp(6), marginHorizontal:moderateScale(10)}}>{Strings.next}</Text>
            </Button>
        </View>*/}
            </View>
        )
    }

    onInsertPhone(values) {
        this.setState({loading: true, error:null})
        axios.post(`${BASE_END_POINT}forget-password`, JSON.stringify({
            phone: values.phone
        }),{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response=> {
            this.setState({
                loading: false, error: null, currentPosition:1
            })
            this.swiper.scrollBy(0)
        }).catch(error=> {
            this.setState({error: error.message, loading: false})
            RNToasty.Error({title: Strings.errorPhoneFormat})
            if(!error.response){
                RNToasty.Error({title: Strings.noConnection})
            }
            
        })
    }

    _onFinishCheckingCode=()=>{
        this.setState({currentPosition:2})
        this.swiper.scrollBy(2)
    }
    renderInsertCode=()=>{
        return(
            <View style={{flex:1}}>
                 <CodeInput
                            ref='codeInput1'
                            keyboardType='numeric'
                            codeLength={4}
                            secureTextEntry
                            className='border-circle'
                            compareWithCode='1234'
                            autoFocus={false}
                            inputPosition='center'
                            size={50}
                            containerStyle={{ alignSelf: 'center', marginTop: hp(15) }}
                            codeInputStyle={{ borderWidth: wp(0.5) , borderColor:color.primaryColor}}
                            activeColor={color.primaryColor}
                            onFulfill={(isValid, code)=> this._onFinishCheckingCode(isValid, code)}
                            

                />
            </View>
        )
    }

    renderInsertNewPassword=()=> {
        
        return(
           <View style={{flex:1, backgroundColor:'white'}}>
                <View style={{width:wp(80), marginTop: hp(7), alignSelf:'center'}}>
                <Field
                    name='newPassword' label={Strings.insertNewPassword} component={InputComponent}
                    returnKeyType='done'
                    onSubmit={()=> Keyboard.dismiss()}
                    isRTL={this.props.isRtl}
                    textColor={color.darkPrimaryColor}
                    borderColor= 'gray'
                    onChangeText={(NewPass)=> this.setState({NewPass})}
                />



                <Field
                    name='confirmPassword' label={Strings.confirmPassword} component={InputComponent}
                    returnKeyType='done'
                    onSubmit={()=> Keyboard.dismiss()}
                    isRTL={this.props.isRtl}
                    textColor={color.darkPrimaryColor}
                    borderColor= 'gray'
                    onChangeText={(ConfirmPass)=> this.setState({ConfirmPass})}
                />
                 
              
              </View>
             
                {this.renderButton()}
              
            
           </View>
        )
    }

    renderButton=()=> {
        const {handleSubmit} = this.props
        return( 
           

            <View style={{backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
                    <Button onPress={()=> {                    
                    handleSubmit(this.requestNewPassword.bind(this))
                }}
                transparent rounded style={{width:wp(50), alignItems:'center', justifyContent:'center',height: hp(7), borderWidth:wp(0.3), borderColor: color.primaryColor, marginVertical:hp(7)}}>
                <AppText text={Strings.next} fontSize={wp(4)} color={color.primaryColor} />
                </Button>
            </View>

        )
    }
    requestNewPassword=() =>{
        if(this.state.NewPass.length == 0) {
            RNToasty.Error({title: Strings.enterPassword})
        }
        else if(this.state.ConfirmPass.length == 0) {
            RNToasty.Error({title:Strings.errorConfirmPassword})
        }
        else if(this.state.NewPass !== this.state.ConfirmPass) {
            RNToasty.Error({title:Strings.errorConfirmPassword})
        }
        else {
            this.onInsertNewPassword()
        }
    }

    onInsertNewPassword(values) {
        this.setState({loading:true})
        axios.post(`${BASE_END_POINT}reset-password`, JSON.stringify({
            phone: values.phone,
            newPassword: values.newPassword
        }),{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(response=> {
            RNToasty.Success({title: Strings.sendSuccessfully})
            Actions.pop()
        }).catch(error=>{
            RNToasty.Error({title: Strings.errorConfirmPassword})
        })
    }
    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: Async Storage has been extracted',
            'Warning: ViewPagerAndroid has been extracted'
          ]);
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <StatusBar hidden/>
                <Header headerText={Strings.forgetPassword} backAction leftComponent
                />
                <View style={{height:hp(15), marginTop:hp(2),backgroundColor:'white',justifyContent:'center' }}>
                    <StepIndicator
                            currentPosition={this.state.currentPosition}
                            customStyles={customStyles}
                            labels={[Strings.insertPhone, Strings.insertCode, Strings.insertNewPassword]}
                            stepCount={3}
                    />
                </View>
                <View style={{position:'absolute',bottom:0, left:0, right:0, backgroundColor:'white', height:hp(70)}}>
                    <Swiper style={{flex:1}}
                            loop={false}
                            autoplay={false}
                            scrollEnabled={false}
                            showsButtons={false}
                            showsPagination={false}
                            ref={(s) => this.swiper = s}
                            index={this.state.currentPage} 
                    >
                    {this.renderInsertPhone()}
                    {this.renderInsertCode()}
                    {this.renderInsertNewPassword()}
                    </Swiper>
                </View>
            </View>
        )
    }
}

const ForgetForm = reduxForm({
    form:'FORGET',
    validate
})(ForgetPassword)

export default connect()(ForgetForm)