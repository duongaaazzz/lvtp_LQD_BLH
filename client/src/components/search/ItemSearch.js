/**
 * Created by Duong Le on 9/15/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Dimensions, Image, StyleSheet} from 'react-native'
import NavigationServices from '../../navigation/NavigationServices'

import RouteKey from '../../constants/routeKey'
import {blackColor, grayColor, whiteColor} from '../../constants/color';
import randomColor from 'randomcolor';

const {width, height} = Dimensions.get('window')


export default class ItemSearch extends React.Component {


  renderHashtag(type) {

    let hashtagView = []

    // console.log('as', this.state.type)
    for (let i = 0; i < type.length; i++) {

      hashtagView.push(
        <TouchableOpacity>
          <View style={{
            marginHorizontal: 2,
            backgroundColor: randomColor({seed: type[i]}),
            height: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',

          }}>
            <Text style={[styles.textStyle, {
              color: whiteColor,
              borderRadius: 5,
              fontSize: 10,
              paddingHorizontal: 10
            }]}>{type[i]}</Text>

          </View>
        </TouchableOpacity>
      )
    }
    return hashtagView

  }

  render() {
    console.log(this.props.infoEvent)
    return (
      <TouchableOpacity>
        <View style={{
          width: width * 0.8,
          height: 50,
          marginTop: 30,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <View style={{
            flexDirection: 'row',
          }}>
            <Image
              style={{
                width: 50, height: 50, borderRadius: 25
              }}
              source={{uri: this.props.infoEvent.avatar}}
              resizeMode={'cover'}/>

            <View style={{flex: 1, marginHorizontal: 20}}>
              <Text
                style={[styles.textStyle, {fontSize: 17}]}
                numberOfLines={1}
              >
                {this.props.infoEvent.title}
              </Text>

              <View style={{flexDirection: 'row', width: '100%', height: 20, alignItems: 'center', marginTop: 5}}>
                {this.renderHashtag(this.props.infoEvent.type)}
              </View>

            </View>
          </View>

          <View style={{borderBottomWidth: 1, borderBottomColor: grayColor, width: '100%', marginTop: 15}}/>


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