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
      <TouchableOpacity onPress={() => NavigationServices.profileSwitchNavigate(RouteKey.DetailsEventProfile,{data: this.props.item})}>
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
                {this.props.item.title}
              </Text>

              <Text style={[styles.textStyle, {fontWeight: '400', fontSize: 10, color: grayColor}]}>
              {this.props.item.time_start}
              </Text>

            </View>

            <Image
              style={{
                width: 66, height: 66, borderRadius: 33,
                marginHorizontal: 20
              }}
              source={{ uri: this.props.item.avatar}}
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