import React from 'react'
import {View, StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const Card =(props)=>{
        return(
            <View style={styles.container}>
                {props.children} 
            </View>
        )
    }

/* 34an azhr el data - ana lma est5dmt el card fl album details h70t gwah components 
wl components dii leha props f 34an azhr el component dii
 aknii bzbt 7ta el components gwa el view da bs el fkra enha htsa3dnii en el component dii a2dr a8yrha 
 ya3nii ast5dm el card component w a7ot fl body bta3o eli ana 3wzah w kda kda el props.children htzhrholii
*/
export default Card

const styles= StyleSheet.create({
    container:{
        borderColor:'#D5DBDB',
        borderWidth:wp(0.4),
        borderRadius:wp(1),
        borderBottomWidth:wp(0),
        shadowColor:'#000',
        shadowOffset: {width:0, height: hp(1)},
        shadowOpacity: 0.1,
        elevation: 1,
        shadowRadius:2,
        marginLeft:wp(3),
        marginRight:wp(3),
        marginTop:hp(3),
        //height:hp(30)
    }
})