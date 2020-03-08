import React, {Component} from 'react'
import {View, StatusBar,YellowBox, StyleSheet, Image, Keyboard, TouchableOpacity, Text} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { responsiveHeight, responsiveWidth, moderateScale, responsiveFontSize } from "../utils/responsiveDimensions";
import { Container, Header, Content, Item, Input, Icon ,Button, Label, } from 'native-base';
import {changeLanguage} from '../actions/changeLanguage'
import {login} from '../actions/AuthAction'
import {Field, reduxForm} from 'redux-form'
import {AppText, AppInput} from '../common'
import Strings from '../assets/strings'
import * as color from '../assets/colors'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


const validate = values => {
    const errors = {};

    const phone = values.phone
    const password = values.password;

    if (phone == null) {
        errors.phone = Strings.require;
    }
    if (password == null) {
        errors.password = Strings.require;
    }

    return errors;
};



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

 class Login extends Component {
     constructor() {
         super()
      
     }

    onLoginPressed(values){
        this.props.login(
            values.phone,
            values.password,
            this.props.userToken,

        );
    }

    renderButton = ()=>{
        const { handleSubmit } = this.props
        return(
            <Button style={styles.btn}
            onPress={handleSubmit(this.onLoginPressed.bind(this))}
            >
                <AppText text={Strings.login} fontSize={wp(4)} alignSelf='center' color='white'/>
            </Button>
        )
    }

    renderForgetPassword =()=> {
        return(
            <TouchableOpacity style={styles.Fbtn}
            onPress={()=> Actions.forgetPassword()}
            >
                <AppText text={Strings.forgetPassword} fontSize={wp(4.5)} alignSelf='center' color='black'
                    
                />
            </TouchableOpacity>
        )
    }

    renderContent=()=> {
        return(
            <View style={{marginTop:hp(5) ,width:wp(80), marginHorizontal:wp(8)}} >
                <Field borderColor='gray' style={{ width: responsiveHeight(80) }} textColor={color.darkPrimaryColor} name="phone" isRTL={this.props.isRTL} numeric marginBottom={moderateScale(3)} label={Strings.mobileNumber} component={InputComponent}
                 returnKeyType="done"
                    onSubmit={() => {
                       Keyboard.dismiss()
                    }}
                />

                <Field borderColor='gray' textColor={color.darkPrimaryColor} name="password" isRTL={this.props.isRTL} type="password" password={true} label={Strings.enterPassword} component={InputComponent}
                    returnKeyType="done"
                    inputRef={el => this.passwordField = el }
                    onSubmit={() => {
                        Keyboard.dismiss()
                    }}
                />

               
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
            <View style={styles.container}>
                <StatusBar hidden/>
                <Image source={require('../assets/imgs/smartTrach2.jpg')} style={styles.img}/>
                        {this.renderContent()}
                        {this.renderButton()}
                       {this.renderForgetPassword()}

            </View>
        )
    }
}

const form = reduxForm({
    form:'LOGIN',
    validate
})(Login)

const mapStateToProps= state=> ({
    isRtl: state.lang.isRtl,
    userToken: state.auth.userToken
})

const mapDispatchToProps ={
    changeLanguage,
    login
}
export default connect(mapStateToProps, mapDispatchToProps)(form)

const styles= StyleSheet.create({
    container: {
        flex:1,
       // justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    btn: {
        backgroundColor: color.primaryColor,
        width: wp(55),
        height: hp(8),
        borderRadius:wp(40),
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop: hp(3)
        
    },
    img: {
        width:wp(80),
        height:hp(20),
        marginTop:hp(15)
    },
    Fbtn: {
        backgroundColor: 'white',
        width: wp(55),
        height: hp(8),
        borderRadius:wp(40),
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop: hp(3)
        
    }
   
})