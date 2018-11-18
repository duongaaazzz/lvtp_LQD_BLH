/**
 * Created by Duong Le on 9/15/18.
 */


import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RouteKey from '../../constants/routeKey'
import {
  backgroundColor,
  blackColor,
  blueColor,
  darkBlueColor, darkPinkColor,
  grayColor, lightBlueColor, pinkColor,
  redColor,
  skyColor, violetColor, whiteColor
} from '../../constants/color';
import Moment from 'moment';
import { deleteUserEvent } from '../../utilities/ApiManager';
import NavigationServices from '../../navigation/NavigationServices';

const { width, height } = Dimensions.get('window')
class DetailsCardEvent extends React.Component {
  renderTime() {
    const detailCardEvent = this.props.navigation.state.params.detailCardEvent;
    const dateStart = Moment(detailCardEvent.date_start).format('DD-MM')
    const month = dateStart.slice(3, 5)
    const day = dateStart.slice(0, 2)
    return <View style={{ width: '25%', marginHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[styles.textStyle, { fontSize: 13, color: redColor }]}>Tháng {month}</Text>
      <Text style={[styles.textStyle, { fontSize: 44, marginTop: -10 }]}>{day}</Text>
    </View>
  }

  renderInfoEvent(listColor, number, test, nameIcon) {
    return <LinearGradient
      colors={listColor}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={[styles.infoEvent]}>

      <View style={{ width: 30, height: 30, marginTop: 10, marginLeft: 10 }}>
        <MaterialCommunityIcons name={nameIcon} size={30}
          color={whiteColor} />
      </View>
      <View style={{ flex: 0.8, marginBottom: 10 }}>
        <Text style={[styles.textStyle, { fontSize: 38, color: whiteColor }]}> {number}</Text>
        <Text style={[styles.textStyle, { fontSize: 17, color: whiteColor, marginLeft: 7 }]}> {test}</Text>
      </View>

    </LinearGradient>
  }

  render() {
    const detailCardEvent = this.props.navigation.state.params.detailCardEvent;
    return (<View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{
          flex: 1,
        }}>
          <View style={{ width: '100%', height: 210 }}>
            <ImageBackground
              style={{
                backgroundColor: grayColor,
                flex: 1,
              }}
              source={{ uri: detailCardEvent.avatar }}
              resizeMode={'cover'} />
            <View style={{
              width: '100%',
              flex: 0.1,
              paddingTop: 150,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              position: 'absolute'
            }}>
              <TouchableOpacity onPress={() => NavigationServices.profileSwitchNavigate(RouteKey.EditEvent, { detailCardEvent: detailCardEvent })}
                style={[styles.button, { width: 100, backgroundColor: 'gray' }]}>
                <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '500', color: whiteColor }]}>Cập Nhật</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteUserEvent(detailCardEvent._id).then(resss => {
                if (resss) {
                  NavigationServices.profileSwitchNavigate(RouteKey.ProfileScreen, {})
                }
              })}
                style={[styles.button, { width: 100, backgroundColor: redColor }]}>
                <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '500', color: whiteColor }]}>Xóa Event</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.wrapperTitle}>

            <View style={{ width: '50%', marginLeft: 15 }}>
              <Text
                numberOfLines={4}
                style={[styles.textStyle, { fontSize: 20, }]} >
                {detailCardEvent.description}
              </Text>
              <View style={{ borderWidth: 1, marginTop: 10, width: '90%', }} />
            </View>

            {this.renderTime()}

          </View>

          <View style={styles.overview}>
            <Text style={[styles.textStyle, { fontSize: 20 }]}>Tổng quan </Text>
          </View>

          <View style={styles.body}>
            {this.renderInfoEvent([blueColor, darkBlueColor], detailCardEvent.userlist.length, 'Người đăng ký', 'account-supervisor')}
            {this.renderInfoEvent([pinkColor, darkPinkColor], 200, 'Người thích', 'heart')}
            {this.renderInfoEvent([lightBlueColor, darkBlueColor], 17, 'Người chia sẻ', 'share')}
          </View>


        </View>
      </ScrollView>
      <View style={{
        zIndex: 999,
        position: 'absolute',
        top: 20,
        left: 5,
      }}>
        <TouchableOpacity
          style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {
            if (this.props.navigation.state.params.backHome) {
              NavigationServices.homeSwitchNavigate('HomeTab')
            } else {
              NavigationServices.profileSwitchNavigate(RouteKey.ProfileScreen)
            }
          }}>
          <Ionicons name={'ios-arrow-back'} size={34} color={blueColor} />
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'SegoeUI',
    fontWeight: 'bold',
    color: blackColor
  },
  wrapperTitle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 100,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  overview: {
    height: 30,
    width: '100%',
    marginLeft: 30,
  },
  body: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },
  buttonLable: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    backgroundColor: blueColor,
    padding: 10,
    width: 190,
    height: 40,
    margin: 5,
    borderRadius: 30,
  },
  infoEvent: {
    borderRadius: 10,
    marginVertical: 10,
    width: width * 0.41,
    height: width * 0.41,
    justifyContent: 'space-between'
  }
})

export default connect(state => ({}), dispatch => ({}))(DetailsCardEvent);
