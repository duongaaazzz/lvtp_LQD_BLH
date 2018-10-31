/**
 * Created by Duong Le on 10/31/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native'


export default class ItemImagePostEvent extends React.Component {

  render() {
    return (
      <View style={{width: 110, height: 110, backgroundColor: 'gray', margin: 5}}>
        <Image
          
          style={{flex: 1}}
        />
      </View>
    )
  }
}

