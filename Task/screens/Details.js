import React, { Component } from 'react'
import { YellowBox, StatusBar, View , Text} from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Header from '../components/Header'

export default class Details extends Component {
    constructor(props) {
        super(props)
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
                <Header backColor='white' backAction leftComponent showCart showSearch rightComponent/>
                <View style={{flex:1, backgroundColor:'white', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:wp(4), fontWeight:'500', color:'black'}}>You Choosed: </Text>
                    <Text style={{fontSize:wp(4), fontWeight:'normal', color:'#FF5C5C'}}>{this.props.data}</Text>
                </View>
            </View>
        )
    }
}