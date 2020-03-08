import React, {Component} from 'react'
import {View,YellowBox, StatusBar,Keyboard, ActivityIndicator} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CardItem, Card, Item, Input ,Button, Label} from 'native-base';
import {Field, reduxForm} from 'redux-form'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AppText , AppInput} from '../common';
import Strings from '../assets/strings';
import * as color from '../assets/colors'
import axios from 'axios'
import { RNToasty } from 'react-native-toasty';
import {BASE_END_POINT } from '../AppConfig';
import { connect } from 'react-redux';
import Header from '../components/Header'
import { Actions } from 'react-native-router-flux';

const validate = (values)=>{
    const errors = {}

    if(!values.phone) {
        errors.phone = Strings.require
    }
    if(!values.password) {
        errors.password = Strings.require
    }
    if(!values.name) {
        errors.name = Strings.require
    }
    if(!values.message) {
        errors.message = Strings.require
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

class ContactUs extends Component {
 
    state={
        loading: false,
        errorMessage: null,
        name: '',
        mobileNumber: '',
        password: '',
        message:''
    }

    onSend(values) {
        this.setState({loading: true})
       axios.post(`${BASE_END_POINT}contact-us`, JSON.stringify({
          name: values.name,
          phone: values.phone,
          password: values.password,
          message: values.message
       }),{
           headers:{
               'Content-Type': 'application/json'
           }
       }).then(response=> {
           this.setState({loading: false})
           RNToasty.Success({title: Strings.sendSuccessfully})
       }).catch(error=> {
           this.setState({loading: false, errorMessage: error})
           RNToasty.Error({title: Strings.errorMessage}) 
           if(!error.response){
            this.setState({errorText:Strings.noConnection});
        }
       })
    }
    renderContent =()=> {
        const {handleSubmit} = this.props
        return(
            <Card style={{height:hp(59.5)}}>
               <View style={{flex:1, height:hp(58), width:wp(88),alignSelf:'center', marginTop:hp(1.5)}}>
                <Field
                        component={InputComponent} label={Strings.name}
                        name= 'name' 
                        onSubmit={()=> Keyboard.dismiss()}
                        returnKeyType='done'
                        isRTL={this.props.isRtl}
                        textColor={color.darkPrimaryColor}
                        borderColor= 'gray'
                      //  onChangeText={(name)=> this.setState({name})}
                            
                    />
                    

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
                

                <Field
                    name='password' label={Strings.enterPassword} component={InputComponent}
                    returnKeyType='done'
                    onSubmit={()=> Keyboard.dismiss()}
                    isRTL={this.props.isRtl}
                    textColor={color.darkPrimaryColor}
                    borderColor= 'gray'
                    password
                  //  onChangeText={(enterPassword)=> this.setState({enterPassword})}
                />       

               

                <Field
                        component={InputComponent} label={Strings.message}
                        name= 'message' 
                        onSubmit={()=> Keyboard.dismiss()}
                        returnKeyType='done'
                        isRTL={this.props.isRtl}
                        textColor={color.darkPrimaryColor}
                        borderColor= 'gray' 
                       // onChangeText={(message)=> this.setState({message})}
                    />

                

                   {
                       this.state.loading?
                       <ActivityIndicator size='large' color={color.primaryColor}/>
                       :
                       <Button 
                           rounded 
                           style={{width:wp(55),height:hp(7), backgroundColor: color.primaryColor, alignSelf:'center', marginVertical:hp(3)}}
                           onPress={handleSubmit(this.onSend.bind(this))}
                           >
                       
                       <AppText text={Strings.send} fontSize={wp(5)} color='white' marginHorizontal={wp(20)}/>
                   </Button>
                   }        
               </View>
            </Card>
        )
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
                <Header headerText={Strings.contactUS} showMenu rightComponent 
                />
                <Card style={{height:hp(30)}}>
                    <CardItem style={{marginTop: hp(1) ,flexDirection: this.props.isRtl? 'row-reverse': 'row'}}>
                        <Icon name='phone' style={{fontSize:wp(6)}} />
                        <AppText text= ':'  fontSize={wp(6)} marginHorizontal={wp(3)}/>
                        <AppText text= '01009028282 - 0224950783'  fontSize={wp(4)}/>
                    </CardItem>

                    <CardItem style={{marginTop: hp(1) ,flexDirection: this.props.isRtl? 'row-reverse': 'row'}}>
                        <Icon name='email-outline' style={{fontSize:wp(6)}} />
                        <AppText text= ':'  fontSize={wp(6)} marginHorizontal={wp(3)}/>
                        <AppText text= 'info@stockat.com'  fontSize={wp(4)}/>
                    </CardItem>

                    <CardItem style={{marginTop: hp(1) ,flexDirection: this.props.isRtl? 'row-reverse': 'row'}}>
                        <Icon name='map-marker' style={{fontSize:wp(6)}} />
                        <AppText text= ':'  fontSize={wp(6)} marginHorizontal={wp(3)}/>
                        <AppText text= '01009028282 - 0224950783'  fontSize={wp(4)}/>
                    </CardItem>
                </Card>

                {this.renderContent()}
            </View>
        )
    }
}

const ContactForm =reduxForm({
    form: "ContactUs",
    validate
})(ContactUs)

const mapStateToProps= state=> ({
    isRtl: state.lang.isRtl
})



export default connect(mapStateToProps)(ContactForm)