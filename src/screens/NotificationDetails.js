import React, {Component} from 'react'
import {View, YellowBox, StatusBar, StyleSheet, Dimensions,AsyncStorage} from 'react-native'
import { AppText,  } from '../common';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView,{ Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import Header from '../components/Header';
import  Strings  from '../assets/strings'
import * as color from '../assets/colors'
import { RNToasty } from 'react-native-toasty';
import { Card, CardItem, Button , Thumbnail} from 'native-base';
import { connect } from 'react-redux';
import axios from 'axios'
import {BASE_END_POINT } from '../AppConfig';
import { Actions } from 'react-native-router-flux';

const LATITUDE_DELTA = 0.1
const LONGITUDE_DELTA = 0.1


var {height, width} = Dimensions.get('window');

 class NotificationDetails extends Component {
    constructor(props) {
        super(props)
        this.state={
            latitude: 0,
            longitude: 0,
            error: null 

        }
    } 

    componentDidMount() {
        axios.get(`${BASE_END_POINT}trash/${this.props.subject}`)
        .then(response => {
            console.log("noti Details Done");
            console.log(response.data);
            this.setState({details:response.data})
        }).catch(error => {
            console.log("noti Details Error")
            console.log(error.response)
            console.log("noti Details Error")

        })

        navigator.geolocation.getCurrentPosition(position=> {
            this.setState({
                latitude: parseFloat(position.coords.latitude),
                longitude: parseFloat(position.coords.longitude),
                laitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            })
        },
        error=> {
            this.setState({error: error.message})
            RNToasty.Error({title:'Check your Gps'})
            },
            {enableAccuracy: true, timeout:20000, maximunAge: 2000}
            )
        
        
    }

    iDoTask= async()=>{
        const trash = await AsyncStorage.getItem('@TrashID')
        if(trash) {
            RNToasty.Warn({title: Strings.taskIsStall})
        }else {
            console.log(this.props.currentUser)
            axios.put(`${BASE_END_POINT}trash/${this.props.subject}/onprogress`, {}, {
                headers: { 
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.currentUser.token}`    
                } 
        }).then(response=> {
            if(response.data.toLowerCase().includes('someone have this task'.toLocaleLowerCase())){
                RNToasty.Info({title:strings.someneHaveTask})
            }else{
                RNToasty.Success({title:strings.youHaveTask})
                AsyncStorage.setItem('@TrachID',this.props.subject.toString())
            }
        })
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
            <View style={{flex:1, backgroundColor:'white', }}>
                <StatusBar hidden/>
                <Header headerText={Strings.taskDetails} backAction leftComponent 
                />
                <View style={{backgroundColor:'white', height: hp(21), justifyContent:'center', alignItems:'center'}}>
                    <Thumbnail large source={require('../assets/imgs/sg2.png')}/>
                    <AppText text={this.props.data} fontSize={wp(4)} marginTop={hp(1.5)}/>
                </View>
                <View style={styles.container}>

                    <MapView style={styles.map}
                            region={{
                                latitude:this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta:0.1,
                                longitudeDelta:0.1
                              }}
                            showsUserLocation={true}
                            provider={PROVIDER_GOOGLE}
                            showsMyLocationButton={true}
                            
                    >
                        <Marker
                                coordinate={this.state}
                                title='Trash Location'
                                description='Trash details'
                        />

                        
                    </MapView>

                    <Button onPress={()=> this.iDoTask()}
                            block style={{position:'absolute',bottom:0, right:0, left:0, backgroundColor: color.buttonColor}}>
                         <AppText text={Strings.iDoTheTask} color='white' fontSize={wp(4)}/>     
                    </Button>
                </View>
               
            </View>
        )
    }
}

const mapStateToProps = state=> ({
    isRtl: state.lang.isRtl,
    currentUser: state.auth.currentUser
})

export default connect(mapStateToProps)(NotificationDetails)

const styles= StyleSheet.create({
    container: {
       
        position: 'absolute',
       // top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: width,
        height:700
    },
    map: {
             position: 'absolute',
       //      top: 0,
             bottom: 0,
             left: 0,
             right: 0,
             height:550,
         
    },
    button: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
      }
});   