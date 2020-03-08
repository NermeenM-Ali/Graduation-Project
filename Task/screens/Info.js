import React, {Component} from 'react'
import { View, YellowBox, StatusBar , Image, Dimensions, Text, ScrollView, Platform} from 'react-native'
import Swiper from 'react-native-swiper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { Card } from 'native-base';
import { Actions } from 'react-native-router-flux';

const WIDTH = Dimensions.get('screen').width 
export default class Info extends Component {
    constructor(props) {
        super(props)
        this.state={
            ScrollEnd:false,
            loading: false
        }
    }
    Swipe=()=> {
        setInterval(() => {
            this.swiper1.scrollBy(1)
            this.swiper2.scrollBy(1)
            this.swiper3.scrollBy(1)
            this.setState({ScrollEnd: true})
            
        }, 1000);
      
    }

    componentDidMount() {
        this.Swipe()
        
    }
    
    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: Async Storage has been extracted',
            'Warning: ViewPagerAndroid'
          ]);
         
        return(
            <View style={{flex:1, backgroundColor:'#FF5C5C'}}>
                <StatusBar hidden/>
                <ScrollView  style={{flex:1}}>
                    <Image source={require('../imgs/fm.png')} style={{width:WIDTH, height: hp(30), marginTop:hp(5)}}/>
                        <Text style={{fontWeight:'400', fontSize:wp(3), color:'white', flexWrap:'wrap', marginHorizontal:wp(2), textAlign:'center'}}>
                            FreshMarket is a mobile platform for fresh groceries, fruits, vegetables
                            Choose products on our mobile app, and get everything delivered to your doorstep, quickly
                        </Text>
                    <View style={{backgroundColor:'#FF5C5C', alignSelf:'center', marginVertical:hp(2)}}>
                            <Image source={require('../imgs/info.jpg')} style={{width:wp(40), height:hp(20),alignSelf:'center'}}/>
                            <Text style={{fontSize:wp(5), fontWeight:'400', color:'white'}}>On boarding Screen</Text>
                    </View>

                  
                    <View style={{ flexDirection:'row', backgroundColor:'#FF5C5C'}}>
                            <Card style={{elevation:2, backgroundColor:'#F2F3F4', height:hp(50), width:wp(32), borderRadius:wp(3)}}>
                                    <Swiper style={{flex:1}}
                                             showsPagination
                                             scrollEnabled
                                             loop={false}
                                             activeDotColor='#FF5C5C'
                                             index={0}
                                             ref={(s) => this.swiper1 = s}
                                            onIndexChanged={(index)=> index===2 ? Actions.home() : console.log(index)}
                                             
                                    >
                                        
                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../imgs/Slides1.png')} style={{width:wp(20), height:hp(15)}}/>
                                            <Text style={{fontWeight:'400', fontSize:wp(3), color:'black'}}>First View</Text>
                                        </View>

                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../imgs/Slides2.png')} style={{width:wp(20), height:hp(15)}}/>
                                            <Text style={{fontWeight:'400', fontSize:wp(3), color:'black'}}>Second View</Text>
                                        </View>

                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../imgs/Slides3.png')} style={{width:wp(20), height:hp(15)}}/>
                                            <Text style={{fontWeight:'400', fontSize:wp(3), color:'black', marginVertical:hp(3)}}>Third View</Text>
                                        </View>
                                    </Swiper>
                            </Card>

                            <Card style={{elevation:2, backgroundColor:'#F2F3F4', height:hp(50), width:wp(32), borderRadius:wp(3)}}>
                                    <Swiper style={{flex:1}}
                                             showsPagination
                                             scrollEnabled
                                             loop={false}
                                             activeDotColor='#FF5C5C'
                                             index={0}
                                             ref={(s) => this.swiper2 = s}
                                    >
                                        
                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../imgs/Slides1.png')} style={{width:wp(20), height:hp(15)}}/>
                                            <Text style={{fontWeight:'400', fontSize:wp(3), color:'black'}}>First View</Text>
                                        </View>

                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../imgs/Slides2.png')} style={{width:wp(20), height:hp(15)}}/>
                                            <Text style={{fontWeight:'400', fontSize:wp(3), color:'black'}}>Second View</Text>
                                        </View>

                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../imgs/Slides3.png')} style={{width:wp(20), height:hp(15)}}/>
                                            <Text style={{fontWeight:'400', fontSize:wp(3), color:'black', marginVertical:hp(3)}}>Third View</Text>
                                        </View>
                                    </Swiper>
                            </Card>
                            
                            <Card style={{elevation:2, backgroundColor:'#F2F3F4', height:hp(50), width:wp(32), borderRadius:wp(3)}}>
                                    <Swiper style={{flex:1}}
                                             showsPagination
                                             scrollEnabled
                                             loop={false}
                                             activeDotColor='#FF5C5C'
                                             index={0}
                                             ref={(s) => this.swiper3 = s}
                                            
                                    >
                                        
                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../imgs/Slides1.png')} style={{width:wp(20), height:hp(15)}}/>
                                            <Text style={{fontWeight:'400', fontSize:wp(3), color:'black'}}>First View</Text>
                                        </View>

                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../imgs/Slides2.png')} style={{width:wp(20), height:hp(15)}}/>
                                            <Text style={{fontWeight:'400', fontSize:wp(3), color:'black'}}>Second View</Text>
                                        </View>

                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('../imgs/Slides3.png')} style={{width:wp(20), height:hp(15)}}/>
                                            <Text style={{fontWeight:'400', fontSize:wp(3), color:'black', marginVertical:hp(3)}}>Third View</Text>
                                        </View>
                                    </Swiper>
                            </Card>
                        </View>
                   </ScrollView>
              
                   
            </View>
        )
    }
}