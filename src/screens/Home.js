import React, {Component} from 'react'
import {View, YellowBox, StatusBar, StyleSheet} from 'react-native'
import { AppText } from '../common';
import Icon from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from '../components/Header';
import  Strings  from '../assets/strings'
import moment from 'moment'
import Notifications from './Notifications'
import ActionButton from 'react-native-action-button'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as color from '../assets/colors'

class Home extends Component {
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
            <View style={{flex:1, backgroundColor:'white', }}>
                <StatusBar hidden/>
                <Header headerText={Strings.home} showMenu showNotifications rightComponent
                />
                {
             //       this.props.countNum === 0 ?
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                         <AppText text={Strings.taskFinished} fontSize={wp(6)}/>
                    </View>
                //    :
              /*      <View style={{height:hp(15), backgroundColor: '#F8F9F9', borderRadius:wp(3), borderWidth:wp(0.2), marginTop:hp(1.5)}}>
                           <AppText text={this.props.title} marginHorizontal={wp(3)} marginTop={hp(0.5)} fontSize={wp(5)} color='black'/>
                           <AppText text={this.props.data} marginHorizontal={wp(3)}  fontSize={wp(4)}/>
                            <View style={{marginHorizontal:wp(3), alignSelf:this.props.isRtl?'flex-start':'flex-end'}}>
                                    <AppText text={moment(Date()).fromNow()} color='gray' />
                                </View>
                            </View>*/
                }

                <ActionButton buttonColor={color.primaryColor} size={70} position={this.props.isRtl? 'left': 'right'}>
                        <ActionButton.Item buttonColor={color.buttonColor} title={Strings.addTask} onPress={() => {Actions.addTask()}}>
                            <Icon name="md-create" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor="#F39C12" title={Strings.changePassword} onPress={() => {Actions.changePassword()}}>
                            <Icon name="md-star" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                   
                </ActionButton>
                
            </View>
        )
    }
}

const mapStateToProps = state=> ({
    countNum: state.count.counter,
    isRtl: state.lang.isRtl
})

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });