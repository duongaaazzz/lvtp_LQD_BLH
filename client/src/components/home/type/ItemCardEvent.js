/**
 * Created by Duong Le on 9/9/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native'
import NavigationServices from '../../../navigation/NavigationServices'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Moment from 'moment';


import RouteKey from '../../../constants/routeKey'
import {blackColor, grayColor, whiteColor, yellowColor} from '../../../constants/color';
import randomColor from 'randomcolor';


const {width, height} = Dimensions.get('window')


class ItemCardEvent extends React.Component {

  constructor(props) {
    super(props)

    this.rateEvent = 0

    if (!!props.data.rates) {
      props.data.rates.map(e => {
        this.rateEvent += e.rate
      })
      this.rateEvent = (this.rateEvent / props.data.rates.length) || 0
    }

  }


  renderHashtag(type) {

    let hashtagView = []

    // console.log('as', this.state.type)
    for (let i = 0; i < type.length; i++) {

      hashtagView.push(
        <TouchableOpacity>
          <View style={{
            marginHorizontal: 2,
            backgroundColor: randomColor({seed: type[i]}),
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
            flexDirection: 'row',

          }}>
            <Text style={[styles.textStyle, {
              color: whiteColor,
              borderRadius: 5,
              fontSize: 11,
              paddingHorizontal: 15
            }]}>{type[i]}</Text>

          </View>
        </TouchableOpacity>
      )
    }
    return hashtagView

  }

  render() {
    return (
      <TouchableOpacity onPress={() => {

        if (this.props.userInfo.username === this.props.data.created_by) {
          NavigationServices.homeSwitchNavigate(RouteKey.DetailsEventProfile, {
            detailCardEvent: this.props.data,
            backHome: true
          })
        } else {
          NavigationServices.homeSwitchNavigate(RouteKey.DetailsCardEvent, {data: this.props.data})
        }


      }}>
        <View style={{
          borderRadius: 10,
          marginTop: 15,
          marginHorizontal: 5,
          minHeight: 135,
          width: width * 0.93,
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <View style={{
            flexDirection: 'row',
            flex: 1,
            margin: 5
          }}>
            {/*Left card*/}
            <View style={{
              flex: 1,
              margin: 10,
              width: '90%'
            }}>
              <Text
                style={[styles.textStyle, {
                  fontSize: 20,
                }]}
                numberOfLines={2}
              >
                {this.props.data.title}
              </Text>

              <Text
                style={[styles.textStyle, {
                  fontSize: 12,
                  color: grayColor,
                  marginVertical: 5,
                }]}
                numberOfline={1}
              >
                {Moment(this.props.data.time_start).format('D MMM YYYY')}

              </Text>

              <View style={{
                marginTop: 5,
                height: '20%',
                width: '100%',
                flexDirection: 'row',
                marginBottom: 5
              }}>

                <View style={{flexDirection: 'row', flexWrap: 'wrap', marginRight: 5, width: '120%'}}>
                  {this.renderHashtag(this.props.data.type)}

                </View>

              </View>
            </View>
            {/*Right card*/}
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: 10
            }}>

              <Image
                style={{
                  width: 100, height: 100, borderRadius: 50
                }}
                source={{uri: this.props.data.avatar}}
                resizeMode={'cover'}/>
            </View>


          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), dispatch => ({}))(ItemCardEvent);


const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'SegoeUI',
    fontWeight: 'bold',
    color: blackColor
  }
})