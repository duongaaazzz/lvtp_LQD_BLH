/**
 * Created by Duong Le on 9/8/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions, Image} from 'react-native'
import {
  blackColor,
  blueColor,
  grayColor,
  pinkColor,
  redColor,
  skyColor,
  violetColor,
  whiteColor
} from '../../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import ItemEventProfile from './ItemEventProfile'
import NavigationServices from '../../navigation/NavigationServices';
import RouteKey from '../../constants/routeKey';
import {getUserEvents, getUserSignedEvents} from '../../utilities/ApiManager';


const {width, height} = Dimensions.get('window')
const tabSelectName = {
  signed: 'Signed',
  manage: 'Manage'
}

class ProfileContainer extends React.Component {

  constructor() {
    super();

    this.state = {
      tabSelect: tabSelectName.signed,
      eventData: []
    }
    this.dataEventS = []
    this.dataEventM = []
  }

  componentDidMount() {
    // console.log('aaa', this.props.userInfo)
    getUserEvents(this.props.userInfo._id).then(data => {
      //this.setState({eventData: data })
      this.dataEventM = data
      console.log('dataEventM', this.dataEventM)
    })
    getUserSignedEvents(this.props.userInfo._id).then(data => {
      //this.setState({eventData: data })
      this.dataEventS = data
      this.setState({eventData: data})
      console.log('dataEventM', this.dataEventS)
    })
  }


  changeTabEvent(tabName) {

    let eventData = []

    if (tabName === tabSelectName.signed) {
      eventData = this.dataEventS
    } else {
      eventData = this.dataEventM
    }


    //change color
    if (tabName !== this.state.tabSelect) {
      this.setState({
        tabSelect: tabName,
        eventData: eventData
      })
    } else {
      this.setState({
        eventData: eventData
      })
    }

  }


  render() {


    const renderHeaderProfile = () => <View style={{width: '100%', backgroundColor: 'white'}}>
      <View
        style={{
          width: '100%',
          height: 110,
          // backgroundColor: 'gray',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>

        <View/>

        <Image
          resizeMode='cover'
          source={{uri: this.props.userInfo.avatar || 'https://znews-photo-td.zadn.vn/w820/Uploaded/spuocaw/2018_08_06/spiritedawaystill4.jpg'}}
          style={{width: 62, height: 62, borderRadius: 31}}/>

        <View style={{width: '50%'}}>
          <Text style={[styles.textStyle, {fontSize: 21, fontWeight: 'bold',}]}>{this.props.userInfo.fullname}</Text>
          <Text style={[styles.textStyle, {fontSize: 16, fontWeight: '400',}]}>@{this.props.userInfo.username}</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name={'md-settings'} size={23} color={grayColor}/>
        </TouchableOpacity>

        <View/>


      </View>

      <View style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>

        <TouchableOpacity onPress={() => {
          this.changeTabEvent(tabSelectName.signed)
        }}>
          <View
            style={[styles.btnEvent, {
              borderColor: this.state.tabSelect === tabSelectName.signed ? whiteColor : redColor,
              backgroundColor: this.state.tabSelect === tabSelectName.signed ? redColor : whiteColor
            }]}>
            <MaterialCommunityIcons name={'fire'} size={23}
                                    color={this.state.tabSelect === tabSelectName.signed ? whiteColor : redColor}/>
            <Text style={[styles.textStyle, {
              fontSize: 15,
              color: this.state.tabSelect === tabSelectName.signed ? whiteColor : redColor,
              fontWeight: '500'
            }]}>
              Signed Events
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          this.changeTabEvent(tabSelectName.manage)
        }}>
          <View
            style={[styles.btnEvent, {
              borderColor: this.state.tabSelect === tabSelectName.manage ? whiteColor : blueColor,
              backgroundColor: this.state.tabSelect === tabSelectName.manage ? blueColor : whiteColor
            }]}>
            <MaterialCommunityIcons name={'view-grid'} size={23}
                                    color={this.state.tabSelect === tabSelectName.manage ? whiteColor : blueColor}/>
            <Text style={[styles.textStyle, {
              fontSize: 15,
              color: this.state.tabSelect === tabSelectName.manage ? whiteColor : blueColor,
              fontWeight: '500'
            }]}>
              Manage Events
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>

    const renderBodyProfile = () => {

      let colorLinearGradient = []

      if (this.state.tabSelect === tabSelectName.signed) {
        colorLinearGradient = [violetColor, pinkColor]

      } else {
        colorLinearGradient = [violetColor, skyColor]

      }


      return <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                             colors={colorLinearGradient} style={{flex: 1}}>

        <ScrollView style={{backgroundColor: 'transparent'}}>

          <View style={styles.bodyContent}>
            <FlatList
              data={this.state.eventData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => <ItemEventProfile item={item}/>}
            />

            {
              this.state.tabSelect === tabSelectName.manage &&
              <TouchableOpacity onPress={() => NavigationServices.profileSwitchNavigate(RouteKey.CreateEvent)}>
                <View style={{
                  marginTop: 10,
                  backgroundColor: whiteColor,
                  width: width * 0.8,
                  height: 94,
                  borderRadius: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                  <MaterialCommunityIcons name={'plus'} size={50}
                                          color={grayColor}/>

                  <Text
                    style={[styles.textStyle, {fontSize: 24, marginTop: -7, color: grayColor, fontWeight: 'bold'}]}>
                    Tạo Event
                  </Text>

                </View>
              </TouchableOpacity>
            }
          </View>
        </ScrollView>

      </LinearGradient>
    }


    return (
      <View style={{flex: 1}}>

        {renderHeaderProfile()}
        {renderBodyProfile()}
      </View>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), dispatch => ({}))(ProfileContainer);


const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'SegoeUI',
    color: blackColor
  },
  btnEvent: {
    borderWidth: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: 160,
    height: 36,
    borderRadius: 18,
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  bodyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5,
    paddingBottom: 5,
  },
})