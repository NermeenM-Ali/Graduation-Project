import React, {Component} from 'react'
import {StatusBar, YellowBox, View, TouchableOpacity, FlatList} from 'react-native'
import AppText from '../common/AppText'
import Header from '../components/Header'
import  Strings  from '../assets/strings'
import * as color from '../assets/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux'
import Card from '../common/Card'
import { connect } from 'react-redux'
import moment from 'moment/min/moment-with-locales'
import withPreverntDoubleClick from '../components/withPreventDoubleClick'
import { CardSection } from '../common/CardSection'
import { Thumbnail } from 'native-base'

class RenderRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pressed: false
        }
    }
    componentDidMount() {
        moment.locale(this.props.isRtl? 'ar' :'en') 
    }
    render() {
    return(
       <TouchableOpacity key={this.props.index}
        onPress={()=> {
        this.setState({pressed: true})
        Actions.notificationDetails({data: this.props.item})
      
      }}
             style={{height:hp(12)}}>
        
       {
            this.state.pressed  ?
            <View style={{flex:1, height:hp(12)}} >
               <View style={{ backgroundColor: '#E5E7E9', flexDirection: this.props.isRtl? 'row-reverse': 'row'}}>
                   <Thumbnail small source={require('../assets/imgs/sg2.png')} style={{width:wp(12), height:hp(7), marginVertical:hp(2), marginHorizontal:wp(3)}}/>
                   <AppText    text={this.props.item} marginHorizontal={wp(3)} marginTop={hp(4)} fontSize={wp(3)} color={color.buttonColor}/>
               </View>
                   <View style={{marginHorizontal:wp(3), alignSelf:this.props.isRtl?'flex-start':'flex-end'}}>
                       <AppText    text={moment().calendar()} color='gray' marginTop={hp(-3)} />
                   </View>
                   
               
           </View>

  :
 
   <View style={{flex:1, height:hp(12)}} >
       <View style={{ backgroundColor: '#D6EAF8', flexDirection: this.props.isRtl? 'row-reverse': 'row'}}>
           <Thumbnail small source={require('../assets/imgs/sg2.png')} style={{width:wp(12), height:hp(7), marginVertical:hp(2), marginHorizontal:wp(3)}}/>
           <AppText   text={this.props.item} marginHorizontal={wp(3)} marginTop={hp(4)} fontSize={wp(3)} color={color.buttonColor}/>
       </View>
           <View style={{marginHorizontal:wp(3), alignSelf:this.props.isRtl? 'flex-start':'flex-end'}}>
               <AppText  text={moment().calendar()} color='gray' marginTop={hp(-3)} />
           </View>
           
       
   </View> 
       }  
        
    
    </TouchableOpacity>
   
   )
    }
}

 class Notifications extends Component {
     constructor(props) {
         super(props)
         moment.locale(this.props.isRtl? 'ar' : 'en')
         this.state={
           
             pressed: null,
             read: false,
             unread: true,
             id: -1,
             checkDisable: false
            
         }

     }
     
    
    
       


    renderContent=()=> {
      //  const ID = JSON.stringify(this.props.id.id)
       
        return(   
            <FlatList
            data={this.props.notifData}
            keyExtractor={(item, index) => String(index)}
            style={{backgroundColor:'white'}}
            renderItem={({item, index})=>{
                
                  return  <RenderRow item={item} index={index}/>
                    
            }
    }/>
    )
        } 
    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: Async Storage has been extracted',
            'Deprecation warning: value provided is not in',
           // 'Warning: Encountered'
          ]);
         
         // console.log("Data: " +this.props.notificationData)
         
     
        return(
            <View style={{flex:1, backgroundColor:'white', }}>
                <StatusBar hidden/>
                <Header headerText={Strings.notifications} backAction leftComponent
                />
               {
                   this.props.countNum === 0 ?
                   
                   <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                       <AppText text={Strings.notNotificatios} fontSize={wp(6)}/>
                   </View>
                   :
                      this.renderContent()  
                    
                   
               }
            </View>
        )
    }
}

const mapStateToProps = state=> ({
    //notificationData : state.notif.Items
    notifTitle: state.notif.title,
    notifData: state.notif.data,
    isRtl: state.lang.isRtl,
    id: state.notif.id
})

export default connect(mapStateToProps)(Notifications)

/*
this.props.notifData.map(( item, index)=> 
             <Card  key={index}>       
             <MyTouchableOpacity key={index} 
                   // onclick={()=> this.setState({Pressed: false})}
                    onPress={()=> {
                    this.setState({pressed: true })
                    Actions.notificationDetails({data: item})
                    {console.log(index)}
                        
                   // {console.log(this.props.id)}
                    
                    //Actions.home({title: this.props.notifTitle, data: this.props.notifData})
                  }}
                  disabled={this.state.checkDisable}
                         style={{height:hp(12)}}>
                    {
                        
                        this.state.pressed?
                        
                        <View style={{flex:1, height:hp(12)}}>
                           <View style={{ backgroundColor: '#E5E7E9', flexDirection: this.props.isRtl? 'row-reverse': 'row'}}>
                             <Thumbnail small source={require('../assets/imgs/sg2.png')} style={{width:wp(12), height:hp(7), marginVertical:hp(2), marginHorizontal:wp(3)}}/>
                             <AppText    text={item} marginHorizontal={wp(3)} marginTop={hp(4)} fontSize={wp(3)} color={color.buttonColor}/>
                           </View>
                            <View style={{marginHorizontal:wp(3), alignSelf:this.props.isRtl?'flex-start':'flex-end'}}>
                                <AppText    text={moment(Date()).fromNow()} color='gray' marginTop={hp(-3)} />
                            </View>
                               
                        
                       </View>
    
                       :
                      
                       <View style={{flex:1, height:hp(12)}} >
                           <View style={{ backgroundColor: '#D6EAF8', flexDirection: this.props.isRtl? 'row-reverse': 'row'}}>
                             <Thumbnail small source={require('../assets/imgs/sg2.png')} style={{width:wp(12), height:hp(7), marginVertical:hp(2), marginHorizontal:wp(3)}}/>
                             <AppText   text={item} marginHorizontal={wp(3)} marginTop={hp(4)} fontSize={wp(3)} color={color.buttonColor}/>
                           </View>
                            <View style={{marginHorizontal:wp(3), alignSelf:this.props.isRtl?'flex-start':'flex-end'}}>
                                <AppText  text={moment(Date()).fromNow()} color='gray' marginTop={hp(-3)} />
                            </View>
                               
                        
                       </View>
                    }
                
                </MyTouchableOpacity>
                </Card> */
 
                
/*
 <FlatList
                        data={this.props.notifData}
                        keyExtractor={(index)=> index }
                        style={{backgroundColor:'white'}}
                        renderItem={({item, index})=>{
                            return(
                                <TouchableOpacity key={index}
                                // onclick={()=> this.setState({Pressed: false})}
                                 onPress={()=> {
                                 this.setState({pressed: !this.state.pressed })
                                 Actions.notificationDetails({data: item})
                               
                                 {console.log("index is: " +index)}
                                 {console.log("item is: " +item)} 
                                 {console.log("id is: " + JSON.stringify(this.props.id.id))}    
                                 {console.log("ID is: " +ID)}
                                // {console.log(this.props.id)}
                                 
                                 //Actions.home({title: this.props.notifTitle, data: this.props.notifData})
                               }}
                               //disabled={this.state.checkDisable}
                                      style={{height:hp(12)}}>
                                 
                                {
                                     ID === index ?
                                     <View style={{flex:1, height:hp(12)}}>
                                        <View style={{ backgroundColor: '#E5E7E9', flexDirection: this.props.isRtl? 'row-reverse': 'row'}}>
                                            <Thumbnail small source={require('../assets/imgs/sg2.png')} style={{width:wp(12), height:hp(7), marginVertical:hp(2), marginHorizontal:wp(3)}}/>
                                            <AppText    text={item} marginHorizontal={wp(3)} marginTop={hp(4)} fontSize={wp(3)} color={color.buttonColor}/>
                                        </View>
                                            <View style={{marginHorizontal:wp(3), alignSelf:this.props.isRtl?'flex-start':'flex-end'}}>
                                                <AppText    text={moment(Date()).fromNow()} color='gray' marginTop={hp(-3)} />
                                            </View>
                                            
                                        
                                    </View>
        
                           :
                          
                            <View style={{flex:1, height:hp(12)}} >
                                <View style={{ backgroundColor: '#D6EAF8', flexDirection: this.props.isRtl? 'row-reverse': 'row'}}>
                                    <Thumbnail small source={require('../assets/imgs/sg2.png')} style={{width:wp(12), height:hp(7), marginVertical:hp(2), marginHorizontal:wp(3)}}/>
                                    <AppText   text={item} marginHorizontal={wp(3)} marginTop={hp(4)} fontSize={wp(3)} color={color.buttonColor}/>
                                </View>
                                    <View style={{marginHorizontal:wp(3), alignSelf:this.props.isRtl?'flex-start':'flex-end'}}>
                                        <AppText  text={moment(Date()).fromNow()} color='gray' marginTop={hp(-3)} />
                                    </View>
                                    
                                
                            </View> 
                                }  
                                 
                             
                             </TouchableOpacity>
                            
                            )
                        }}
                        
            />*/                