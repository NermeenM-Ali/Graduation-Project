import React, { Component } from 'react'
import { YellowBox, StatusBar, View, Dimensions , Image, ScrollView, TouchableOpacity, Text, ImageBackground} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper'
import axios from 'axios'
import Header from '../components/Header'
import { Actions } from 'react-native-router-flux';

const WIDTH  = Dimensions.get('screen').width 
const HEIGHT = Dimensions.get('screen').height 



export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state={
            vegetables:[],
            fruits:[],
            meats:[],
            seaFood:[],
           
        }
    }

    Swipe=()=> {
        setInterval(()=>{
            this.swiper.scrollBy(1)
        }, 3000)
    }

    componentDidMount() {
        axios.get('https://5bcce576cf2e850013874767.mockapi.io/task/categories')
        .then(response=> {
            console.log(response.data[0].category_img)
            this.setState({
                vegetables: response.data[0],
                fruits: response.data[1],
                meats: response.data[2],
                seaFood: response.data[3],
            })
            
        }).catch(error => {
            alert(error.message)
        })
   
        this.Swipe()
    }
    render() {
        const {vegetables, fruits, meats, seaFood} = this.state
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: Async Storage has been extracted',
            'Warning: ViewPagerAndroid'
          ]);
          
       //   alert(vegetables.category_img)
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <StatusBar hidden/>
                <Header backColor='white' showMenu rightComponent showCart showSearch />
                <ScrollView style={{flex:1}}>
                    <View style={{width:WIDTH, height:hp(38), backgroundColor:'white'}}>
                        <Swiper
                                pagingEnabled
                                loop={true}
                                ref={(s) => this.swiper = s}
                        >
                            <Image source={require('../imgs/food1.jpg')} style={{width: WIDTH, flex:1}}/>
                            <Image source={require('../imgs/food2.jpg')} style={{width: WIDTH, flex:1}}/>
                            <Image source={require('../imgs/food3.jpg')} style={{width: WIDTH, flex:1}}/>
                        </Swiper>
                    </View>
                    <View style={{ flex:1, backgroundColor:'white', marginTop: hp(0.5),flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                    <TouchableOpacity onPress={()=> Actions.category({data: vegetables.products, img: vegetables.category_img})} style={{height:hp(30), width:wp(48), borderColor:'lightgray', borderWidth:wp(0.2), elevation:2}}>
                                <ImageBackground source={{uri: vegetables.category_img}} style={{height:hp(30), width:wp(48), justifyContent:'flex-end'}}>
                                    <Text style={{fontSize:wp(4), marginLeft:hp(2),fontWeight:'500', color:'black'}}>{vegetables.name}</Text> 
                                </ImageBackground>
                       </TouchableOpacity>

                       <View style={{width:wp(2), backgroundColor:'white'}}></View>

                       <TouchableOpacity onPress={()=> Actions.category({data: fruits.products, img: fruits.category_img})} style={{height:hp(30), width:wp(48), borderColor:'lightgray', borderWidth:wp(0.2), elevation:2}}>
                                <ImageBackground source={{uri: fruits.category_img}} style={{height:hp(30), width:wp(48), justifyContent:'flex-end'}}>
                                    <Text style={{fontSize:wp(4), marginLeft:hp(2), fontWeight:'500',color:'white'}}>{fruits.name}</Text> 
                                </ImageBackground>
                       </TouchableOpacity>

                    </View>

                    <View style={{width:WIDTH, height: hp(15), marginVertical:hp(0.5), justifyContent:'center', alignItems:'center'}}>
                         <Image source={require('../imgs/quote.jpg')} style={{width:wp(96), height: hp(15)}}/>   
                    </View>

                    <View style={{ flex:1, backgroundColor:'white', marginVertical:hp(0.5),flexDirection:'row', justifyContent:'center', justifyContent:'center' }}>
                    <TouchableOpacity onPress={()=> Actions.category({data: meats.products, img: meats.category_img})} style={{height:hp(30), width:wp(48), borderColor:'lightgray', borderWidth:wp(0.2), elevation:2}}>
                                <ImageBackground source={{uri: meats.category_img}} style={{height:hp(30), width:wp(48), justifyContent:'flex-end'}}>
                                    <Text style={{fontSize:wp(4), marginLeft:hp(2), fontWeight:'500',color:'white'}}>{meats.name}</Text> 
                                </ImageBackground>
                       </TouchableOpacity>

                        <View style={{width:wp(2), backgroundColor:'white'}}></View>

                        <TouchableOpacity onPress={()=> Actions.category({data: seaFood.products, img: seaFood.category_img})} style={{height:hp(30), width:wp(48), borderColor:'lightgray', borderWidth:wp(0.2), elevation:2}}>
                                <ImageBackground source={{uri: seaFood.category_img}} style={{height:hp(30), width:wp(48), justifyContent:'flex-end'}}>
                                    <Text style={{fontSize:wp(4), marginLeft:hp(2), fontWeight:'500',color:'white'}}>{seaFood.name}</Text> 
                                </ImageBackground>
                       </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}