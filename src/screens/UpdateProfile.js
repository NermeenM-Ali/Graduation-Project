import React, {Component} from 'react'
import {View, YellowBox, Dimensions, StatusBar, ActivityIndicator,TouchableOpacity, Keyboard } from 'react-native'
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'
import { Thumbnail, Card, Item, Input ,Button, Label, Text} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Header from '../components/Header'
import Strings from '../assets/strings'
import { AppText , AppInput} from '../common'
import { RNToasty } from 'react-native-toasty';
import * as color from '../assets/colors'
import { Actions } from 'react-native-router-flux';



const validate = (values)=>{
    const errors = {}

    if(!values.firstname) {
        errors.firstname = Strings.require

    }
    if(!values.secondname){
        errors.secondname = Strings.require
    }

    if(!values.email){
        errors.email = Strings.require
    }
    if(!values.rate){
        errors.rate = Strings.require
    }
    if(!values.job){
        errors.job = Strings.require
    }
    if(!values.phone){
        errors.phone = Strings.require
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

const WIDTH = Dimensions.get('screen').width
class UpdateProfile extends Component {
    state= {
        img:null,
        firstName:'',
        secondName:'',
        mobileNumber:'',
        job: '',
        rate: '',
        email: ''
    }
    openGallery=()=> {
        ImagePicker.openPicker({
            width: wp(30),
            height: hp(18),
            cropping: true
          }).then(image => {
            this.setState({
                img: image.path
            })
          });
    }

    renderDateFields = ()=> {
        return(
            <View style={{flex:1}}>
                <View style={{height:hp(10), backgroundColor:'white', flexDirection:this.props.isRtl? 'row-reverse': 'row'}}>
                    <View style={{width:wp(40),marginHorizontal:wp(5.5)}}>
                    <Field
                    name='firstname' label={Strings.firstName} component={InputComponent}
                    returnKeyType='done'
                    onSubmit={()=> Keyboard.dismiss()}
                    isRTL={this.props.isRtl}
                    textColor={color.darkPrimaryColor}
                    borderColor= 'gray'
                    onChangeText={(firstName)=> this.setState({firstName})}
                   />
                    
                    </View>

                    <View style={{width:wp(38.5), marginHorizontal:wp(5)}}>
                    <Field
                    name='secondname' label={Strings.secondName} component={InputComponent}
                    returnKeyType='done'
                    onSubmit={()=> Keyboard.dismiss()}
                    isRTL={this.props.isRtl}
                    textColor={color.darkPrimaryColor}
                    borderColor= 'gray'
                    onChangeText={(secondName)=> this.setState({secondName})}
                   />
                    
                    </View>
                </View>

                <View style={{flex:1, width:wp(90),marginHorizontal:wp(6)}}>
                    <Field
                        name='phone' label={Strings.mobileNumber} component={InputComponent}
                        returnKeyType='done'
                        onSubmit={()=> Keyboard.dismiss()}
                        isRTL={this.props.isRtl}
                        textColor={color.darkPrimaryColor}
                        borderColor= 'gray'
                        numeric
                        onChangeText={(mobileNumber)=> this.setState({mobileNumber})}
                    />

               

                    <Field
                        name='email' label={Strings.email} component={InputComponent}
                        returnKeyType='done'
                        onSubmit={()=> Keyboard.dismiss()}
                        isRTL={this.props.isRtl}
                        textColor={color.darkPrimaryColor}
                        borderColor= 'gray'
                        type='email-address'
                        onChangeText={(email)=> this.setState({email})}
                    />

                

                    <Field
                        name='job' label={Strings.job} component={InputComponent}
                        returnKeyType='done'
                        onSubmit={()=> Keyboard.dismiss()}
                        isRTL={this.props.isRtl}
                        textColor={color.darkPrimaryColor}
                        borderColor= 'gray'
                        onChangeText={(job)=> this.setState({job})}
                    />

                

                    <Field
                        name='rate' label={Strings.rate} component={InputComponent}
                        returnKeyType='done'
                        onSubmit={()=> Keyboard.dismiss()}
                        isRTL={this.props.isRtl}
                        textColor={color.darkPrimaryColor}
                        borderColor= 'gray'
                        onChangeText={(rate)=> this.setState({rate})}
                       
                    />
               
                </View>
                <View style={{position:'absolute',bottom:0, left:0, right:0,marginBottom:hp(3) ,backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                   {
                       this.state.firstName==''||this.state.secondName==''||this.state.mobileNumber==''|| this.state.job==''||this.state.email==''||this.state.rate=='' ?
                       <View>
                           <ActivityIndicator large/>
                           
                          
                       </View>
                       : 
                       <Button onPress={()=> {
                           
                               RNToasty.Success({title:Strings.sendSuccessfully})
                           
                       }}
                       transparent rounded style={{width:wp(60), height: hp(7), borderWidth:wp(0.3), borderColor: color.primaryColor}}>
                         <AppText text={Strings.confirm} fontSize={wp(3.5)} marginHorizontal={wp(22)} color={color.primaryColor} />
                       </Button>
                   }
                </View>
            </View>
        )
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
                <Header headerText={Strings.profile} backAction leftComponent
                />
                <View style={{width: wp(80), height: hp(25),marginTop:hp(3), backgroundColor:'white' , alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                   <TouchableOpacity onPress={()=> this.openGallery()}
                             style={{height:hp(18), width:wp(30), borderRadius:wp(20), backgroundColor:'white', borderWidth:wp(0.2), borderColor:'gray'}}>
                       {
                           this.state.img == null? 
                           <Thumbnail large style={{height:hp(18), width:wp(30), borderRadius:wp(20)}}
                              source={require("../assets/imgs/profileicon.png")}
                            />
                            : 
                            <Thumbnail large style={{height:hp(18), width:wp(30), borderRadius:wp(20)}}
                                 source={{uri: this.state.img}}
                            />
                       }
                   </TouchableOpacity>                  
                </View>
                {this.renderDateFields()}
            </View>
        )
    }
}
const UpdateForm= reduxForm({
    form: 'UPDATE',
    validate
})(UpdateProfile)

const mapStateToProps = state=> ({
    isRtl: state.lang.isRtl
}) 

export default connect(mapStateToProps)(UpdateForm)