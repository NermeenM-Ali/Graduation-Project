import React, {Component} from 'react'
import {View, Dimensions,Text} from 'react-native'
import {Left, Right ,Button, Body, Header, Container, Icon, Badge} from 'native-base'
import { heightPercentageToDP as hp , widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AppText from './AppText'
import { connect } from 'react-redux'

import * as color from '../assets/colors'



class AppHeader extends Component {
    
    render() {
        const {text, Licon, Ricon, Micon,Ltype, Rtype,Mtype ,onPressLeft, onPressRight, onPressMid} = this.props
        return(
            <View style={{height:hp(8), width:Dimensions.get('screen').width,elevation:2, shadowOffset:{width:0, height:hp(1)}, shadowColor:'gray'}}>
                <Container >
                    <Header style={{height: hp(8), backgroundColor:color.primaryColor,}} >
                        <Left>
                            
                                {
                                  Licon === 'shopping-cart'? 
                                  <Button transparent onPress={onPressLeft} >
                                    <Icon name={Licon} type={Ltype} style={{ fontSize: wp(6), color: 'white'}} />
                                    
                                    <Badge style={{backgroundColor:'white'}}>
                                        <Text style={{color:color.primaryColor}}>{this.props.countNum}</Text>
                                    </Badge>
                                  </Button>
                                  : 
                                  <Button transparent onPress={onPressLeft} >
                                      <Icon name={Licon} type={Ltype} style={{ fontSize: wp(6), color: 'white' }} />
                                  </Button>
                                }
                            
                        </Left>
                        <Body >
                            <AppText text={text} color={'white'} fontSize={wp(4)} style={{width:wp(30)}} />
                            
                        </Body>
                        <Right>
                        {
                           Ricon === 'ios-notifications'?
                                  <View style={{flexDirection:'row'}}> 
                                        
                                        <Button transparent onPress={onPressRight}  >
                                            <Icon name={Ricon} type={Rtype} style={{ fontSize: wp(6), color: 'white', }} />
                                            <Badge style={{ backgroundColor: 'white' }}>
                                                <Text style={{ color: color.primaryColor }}>{this.props.countNum}</Text>
                                            </Badge>
                                        </Button>
                                  </View>
                                  : 
                                  <Button transparent onPress={onPressRight} >
                                      <Icon name={Ricon} type={Rtype} style={{ fontSize: wp(6), color: 'white' }} />
                                  
                                  </Button>
                                }
                        </Right>
                    </Header>
                </Container>
            </View>
        )
    }
}




 const mapStateToProps = state => ({
    countNum: state.count.counter,
    isRtl: state.lang.isRtl
 })
export default connect(mapStateToProps)(AppHeader)

