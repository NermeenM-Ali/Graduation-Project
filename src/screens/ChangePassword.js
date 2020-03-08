import React, {Component} from 'react'
import {View, Text, YellowBox, StatusBar, Keyboard, ActivityIndicator} from 'react-native'
import { CardItem, Card, Item, Input ,Button, Label} from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Field, reduxForm} from 'redux-form'
import axios from 'axios'
import { connect } from 'react-redux'
import Strings from '../assets/strings'
import Header from '../components/Header'
import AppText from '../common/AppText'
import AppInput from '../common/AppInput'
import * as color from '../assets/colors'
import {BASE_END_POINT} from '../AppConfig';
import { RNToasty } from 'react-native-toasty';

const validate = (values)=>{
    const errors = {}

    if(!values.oldPassword) {
        errors.oldPassword = Strings.require
    }
    if(!values.newPassword) {
        errors.newPassword = Strings.require
    }
    if(!values.confirmPassword) {
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

class ChangePassword extends Component {
    state={
        loading: false,
        oldPassword: '',
        insertNewPassword: '',
        confirmPassword: ''
    }

    onChangePassword(values) {
        this.setState({loading: true})
        axios.put(`${BASE_END_POINT}user/updatePassword`, {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        },
        {
            headers: {
                'Content-Type': 'application/json',
               // 'Authorization': `Bearer ${this.props.currentUser.token}`
            }
        }
        ).then(response=> {
            this.setState({loading: false})
            RNToasty.Success({title:Strings.sendSuccessfully})
            this.props.navigation.navigate('Home')
        }).catch(error=> {
            RNToasty.Error({title: Strings.errorConfirmPassword})
            this.setState({loading: false})
        });
        
    }
    renderContent=()=> {
        const {handleSubmit} = this.props
        return(
            <View style={{flex:1, width:wp(80), marginTop:hp(5),marginBottom:wp(7), alignSelf:'center'}}>
                <Field
                       component={InputComponent} 
                       isRTL={this.props.isRtl} 
                       label={Strings.oldPassword}
                       name='oldPassword'
                       keyboardType='default'
                       returnKeyType='done'
                       onSubmit={()=> Keyboard.dismiss()}
                       textColor={color.darkPrimaryColor}
                       borderColor= 'gray'
                       password
                />
                 

                <Field
                       component={InputComponent} 
                       isRTL={this.props.isRtl} 
                       label={Strings.insertNewPassword}
                       name='newPassword'
                       keyboardType='default'
                       returnKeyType='done'
                       onSubmit={()=> Keyboard.dismiss()}
                       textColor={color.darkPrimaryColor}
                       borderColor= 'gray'
                       password
                      // onChangeText={(insertNewPassword)=> this.setState({insertNewPassword})}
                />
                

                <Field
                       component={InputComponent} 
                       isRTL={this.props.isRtl} 
                       label={Strings.confirmPassword}
                       name='confirmPassword'
                       keyboardType='default'
                       returnKeyType='done'
                       onSubmit={()=> Keyboard.dismiss()}
                       textColor={color.darkPrimaryColor}
                       borderColor= 'gray'
                       password
                //       onChangeText={(confirmPassword)=> this.setState({confirmPassword})}
                />
                
        {
            this.state.loading?
            <ActivityIndicator size='large' color={color.primaryColor}/>
            :
            <Button 
                rounded 
                style={{width:wp(58),height:hp(8), alignItems:'center', justifyContent:'center',backgroundColor: color.primaryColor, alignSelf:'center', marginVertical:hp(8)}}
                onPress={handleSubmit(this.onChangePassword.bind(this))}
                >
            
            <AppText text={Strings.confirm} fontSize={wp(4)} color='white' />
        </Button>
        } 
            </View>
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
                <Header headerText={Strings.changePassword} backAction leftComponent
                />
                {this.renderContent()}
            </View>
        )
    }
}

const ChangePasswordForm = reduxForm({
    form:'CHANGE',
    validate
})(ChangePassword)

const mapStateToProps= state=> ({
    isRtl: state.lang.isRtl
})
    
export default connect(mapStateToProps)(ChangePasswordForm)