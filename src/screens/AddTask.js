import React, {Component} from 'react'
import {YellowBox, StatusBar, View, TouchableOpacity, Image, Dimensions, AsyncStorage, Text} from 'react-native'
import Header from '../components/Header'
import Strings from '../assets/strings'
import * as color from '../assets/colors'
import { CardItem, Card, Item, Input ,Button, Label} from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { responsiveHeight, responsiveWidth, moderateScale, responsiveFontSize } from "../utils/responsiveDimensions";
import StepIndicator from 'react-native-step-indicator'
import Swiper from 'react-native-swiper'
import Scanbarcode from 'react-native-scan-barcode';
import ImagePicker from 'react-native-image-crop-picker';
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux'
import {BASE_END_POINT} from '../AppConfig';
import axios from 'axios'
import { RNToasty } from 'react-native-toasty'
import { AppText } from '../common'
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
    return errors
}
/*
class InputComponent extends Component {
    render() {
        const {
           placeholder, keyboardType,name, isRtl, onSubmit, onChangeText, returnKeyType, secureTextEntry,
           autoCapitalize, autoCorrect, label, iconColor
        } = this.props;

      
        return (
            <Item floatingLabel  style={{borderColor:'rgb(32, 57, 70)', marginBottom:hp(4)}}>  
                <Label >{placeholder}</Label>
                <Input
                            keyboardType={keyboardType}
                            name={name}
                            isRtl={this.props.isRtl}
                            onSubmit={onSubmit}
                            onChangeText={onChangeText}
                            returnKeyType={returnKeyType}
                            secureTextEntry={secureTextEntry}
                            autoCapitalize={autoCapitalize}
                            autoCorrect={autoCorrect}
                            

                />
            </Item>    
        );
    }
}*/

class AddTask extends Component {
    state={
        currentPosition:0,
        error: null,
        loading: false,
        torchMode: 'off',
        cameraType: 'back',
        scanArea: false,
        uploadTask: false,
        images:["",""]
    }

    renderScanCode=()=> {
        return(
            <View style={{flex:1, backgroundColor:'white', alignSelf:'center'}}>
                        {
                            this.state.scanArea?
                            <Scanbarcode
                                style={{ marginTop: moderateScale(20), height: responsiveHeight(38), width: responsiveWidth(60) }}
                                torchMode={this.state.torchMode}
                                cameraType={this.state.cameraType}
                                onBarCodeRead={this.barcodeReceived}
                            />
                            : 
                            <View style={{ marginTop: moderateScale(20), height: responsiveHeight(38), width: responsiveWidth(60), alignSelf: 'center' }}>
                                <TouchableOpacity   style={{ elevation: 2, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center', marginVertical: moderateScale(7), flex: 1 }}
                                            onPress={()=> this.setState({scanArea: true})}
                                    >
                                    <Image source={require('../assets/imgs/bc.png')} style={{ height: responsiveHeight(25), width: responsiveWidth(45) }}/>
                                </TouchableOpacity>
                           </View>
                        }
             
           </View> 
        )
    }

    barcodeReceived=(e)=> {
        this.setState({
            currentPosition:1,
            scanArea: false
        })
       // alert("Barcode: "+ e.data + "Type: "+ e.type)
        
        this.swiper.scrollBy(1)
    }

    renderConfirmBtn=()=>{
        return(
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Button onPress={()=> this.onAddTask()}
                        transparent rounded style={{width:wp(60), height: hp(7), borderWidth:wp(0.3), borderColor: color.primaryColor}}>
                  <AppText text={Strings.done} fontSize={wp(5)} marginHorizontal={wp(22)} color={color.primaryColor} />
                </Button>
            </View>
        )
    }

    onAddTask=()=> {
        this.setState({uploadTask: true})
        const data = new FormData()
        this.state.images.filter(image=>
            data.append('confirm',{
                uri: image,
                type: 'multipart/form-data',
                name: 'TaskImages'
            } )
            )
        axios.put(`${BASE_END_POINT}trash/${this.props.trashID}/empty`, data, {
            headers: {
                'Accept':'Application/json',
                'Content-Type':'multipart/form-data',
               // 'Authorization': `Bearer ${this.props.currentUser.token}`
            }
        }).then(response=> {
            this.setState({uploadTask: false})
            RNToasty.Success({title: Strings.addTasktSuccess})
            AsyncStorage.remove('@TrashID')
            Actions.pop()
        }).catch(error=> {
            this.setState({uploadTask: false})
            RNToasty.Error({title: error.message})
            if(!error.response) {
                RNToasty.Error({title: Strings.noConnection})
            }

        })
    }

    openPicker=(num)=> {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            const newImages= [...this.state.images]
            newImages[num]= image.path
            this.setState({images: newImages})
          });
    }

    renderImagePart=()=> {
        const WIDTH = Dimensions.get('screen').width
        const HEIGHT= Dimensions.get('screen').height
        return(
            <View style={{flex:1}}>
                <View style={{marginTop:hp(5), backgroundColor:'white', width:wp(80), height:hp(30), alignSelf:'center',flexDirection:'row'}}>
                <TouchableOpacity  onPress={()=> this.openPicker(0)}
                            style={{width: wp(40), height:hp(30), backgroundColor:'#F4F6F6', justifyContent:'center', alignItems:'center'}}>
                    {
                        this.state.images[0] === '' ?
                        <AppText text={`${Strings.addImage} 1`} fontSize={wp(3.5)} color='gray'/>
                        :
                        <Image source={{uri: this.state.images[0]}} style={{flex:1, width:wp(40), height: hp(30)}}/>
                    }
                </TouchableOpacity>
                <View style={{width:wp(1), height: hp(30), backgroundColor:'white'}}/>
                <TouchableOpacity onPress={()=> this.openPicker(1)}
                            style={{width: wp(40), height:hp(30), backgroundColor:"#F2F3F4", justifyContent:'center', alignItems:'center'}}>
                {
                        this.state.images[1] === '' ?
                        <AppText text={`${Strings.addImage} 2`} fontSize={wp(3.5)} color='gray'/>
                        :
                        <Image source={{uri: this.state.images[1]}} style={{width:wp(40), height: hp(30)}}/>
                    }
                </TouchableOpacity>
                
            </View>
            <View style={{marginTop:hp(20)}}>
            <Button onPress={()=>{
                if(this.state.images[0]=='' || this.state.images[1]=='') {
                    RNToasty.Warn({title: Strings.choose2Images})
                }else {
                    this.setState({currentPosition: 2})
                       this.swiper.scrollBy(2)
                }
                
            }}
                    transparent style={{alignSelf:this.props.isRtl?'flex-start':'flex-end',position:'absolute', bottom:0, marginTop:hp(15)}}>
                <Text style={{fontSize:wp(6), marginHorizontal:moderateScale(10)}}>{Strings.next}</Text>
            </Button>
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
                <Header headerText={Strings.addTask} backAction leftComponent
                />
                <View style={{height:hp(15), marginTop:hp(2),backgroundColor:'white',justifyContent:'center' }}>
                    <StepIndicator
                            currentPosition={this.state.currentPosition}
                            customStyles={customStyles}
                            labels={[Strings.readBarcode, Strings.pickImages, Strings.confirm]}
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
                        {this.renderScanCode()}
                        {this.renderImagePart()}
                        {this.renderConfirmBtn()}
                        
                    </Swiper>
                </View>
            </View>
        )
    }
}

const AddTaskForm = reduxForm({
    form:'ADDTASK',
    validate
})(AddTask)

const mapStateToProps = state=> ({
    isRtl: state.lang.isRtl
})
export default connect(mapStateToProps)(AddTaskForm)