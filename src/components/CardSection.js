import React from 'react'
import {View, StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const CardSection =(props)=>{
    return(
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

export default CardSection

const styles = StyleSheet.create({
    container: {
        borderBottomWidth:wp(0.5),
        paddingHorizontal:wp(1),
        paddingVertical:hp(1),
        backgroundColor:'#fff',
        justifyContent:'flex-start',
        flexDirection:'row',
        borderColor:'#ddd',
        position:'relative'
    }
})