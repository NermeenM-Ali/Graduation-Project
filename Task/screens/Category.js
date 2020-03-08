import React, {Component} from 'react'
import {View, ScrollView, StatusBar, YellowBox, ImageBackground, Dimensions, TouchableOpacity, Image, Text, FlatList} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Button} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import Header from '../components/Header'
import { Actions } from 'react-native-router-flux';

class RenderRow extends Component {
    constructor(props) {
        super(props)
        this.state={
            pressed: false
        }
    }
    render() {
        
        const {name, product_img, weight, price} = this.props.item.item

        return(
           
            <TouchableOpacity onPress={()=> Actions.details({data: name})}  style={{ height:hp(45), width:wp(48), borderColor:'lightgray', borderWidth:wp(0.2), elevation:2, marginHorizontal:wp(1), marginVertical:hp(1)}}>
                    <View style={{flex:1}}>
                        <Image source={{uri: product_img}} style={{width:wp(48), height:hp(27)}}/>
                        <Text style={{color:'black', fontSize:wp(5), fontWeight:'500', marginVertical:hp(2), marginHorizontal:wp(2)}}>{name}</Text>
                        <View style={{flexDirection:'row', width:wp(48), height:hp(10), justifyContent:'space-between'}}>
                            <View style={{marginHorizontal:wp(2)}}>
                                <Text style={{fontSize:wp(3.5), color:'black', fontWeight:'400'}}>{weight}</Text>
                                <Text style={{fontSize:wp(3), color:'black', fontWeight:'400'}}>{price}</Text>
                            </View>
                        <Button transparent onPress={()=> this.setState({pressed: !this.state.pressed})} style={{marginHorizontal:wp(2), marginVertical:hp(1)}}>
                                <Icon name= {this.state.pressed ? 'ios-checkmark-circle-outline' : 'ios-add-circle-outline'} color={this.state.pressed ?'tomato':'gray'} style={{fontSize:wp(8)}}/>
                        </Button>
                        </View>
                    </View>
             </TouchableOpacity>
           
        )
    }
}

const WIDTH  = Dimensions.get('screen').width 
export default class Fruits extends Component {
    constructor(props) {
        super(props)
        
    }
    
    
    render() {
        console.log(this.props.data)
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: Async Storage has been extracted',
            'Warning: ViewPagerAndroid'
          ]);
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
                <StatusBar hidden/>
                <ImageBackground source={{uri: this.props.img}} style={{width:WIDTH, height:hp(38), backgroundColor:'white'}}>
                   <Header backColor='transparent' backAction leftComponent showCart showSearch rightComponent/>
                </ImageBackground>
                <ScrollView style={{flex:1,}}>
                    
                    <View style={{height:hp(90)}}>
                    <FlatList
                               data={this.props.data}
                               renderItem={(item)=> <RenderRow item={item}/>}
                               keyExtractor={(item)=> item.id} 
                               numColumns={2}
                    />
                  
                    </View>
                </ScrollView>
                <View style={{position:'absolute', bottom:0, left:0, right:0, backgroundColor:'#FF5C5C', height:hp(7), flexDirection:'row'}}>
                    <TouchableOpacity style={{elevation:2,justifyContent:'center', alignItems:'center', backgroundColor: '#FF5C5C', width: WIDTH/2}}>
                        <Text style={{fontSize:wp(4), fontWeight:'400', color:'white'}}>Sort by</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', backgroundColor: '#FF5C5C', width: WIDTH/2}}>
                        <Text style={{fontSize:wp(4), fontWeight:'400', color:'white'}}>Filter</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}