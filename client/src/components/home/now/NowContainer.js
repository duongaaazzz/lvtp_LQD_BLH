/**
 * Created by Duong Le on 9/8/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native'


class NowContainer extends React.Component {

  render() {
    return (
      <View>
        <Text>NowContainer</Text>
      </View>
    )
  }
}

export default connect(state => ({}), dispatch => ({}))(NowContainer);
