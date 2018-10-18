/**
 * Created by Duong Le on 10/17/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Dimensions, Image, StyleSheet} from 'react-native'
import NavigationServices from '../../navigation/NavigationServices'

import RouteKey from '../../constants/routeKey'
import {blackColor, grayColor, whiteColor} from '../../constants/color';

const {width, height} = Dimensions.get('window')


export default class ItemEventProfile extends React.Component {

  render() {
    return (
      <TouchableOpacity onPress={() => NavigationServices.profileSwitchNavigate(RouteKey.DetailsEventProfile)}>
        <View style={{
          marginTop: 10,
          backgroundColor: whiteColor,
          width: width * 0.8,
          height: 94,
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

          <View style={{
            flexDirection: 'row',
          }}>

            <View style={{flex: 1, marginHorizontal: 20}}>
              <Text
                style={[styles.textStyle, {fontSize: 17}]}
                numberOfLines={2}
              >
                GALA - Vui Hội Trăng Rằm Tương Lai Xanh Cần Thơ
              </Text>

              <Text style={[styles.textStyle, {fontWeight: '400', fontSize: 10, color: grayColor}]}>
                Oct 20, Monday
              </Text>

            </View>

            <Image
              style={{
                width: 66, height: 66, borderRadius: 33,
                marginHorizontal: 20
              }}
              source={require('../../assets/image/background.png')}
              resizeMode={'cover'}/>

          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'SegoeUI',
    fontWeight: 'bold',
    color: blackColor
  },
})