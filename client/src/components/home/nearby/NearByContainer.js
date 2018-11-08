/**
 * Created by Duong Le on 9/8/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native'

import ItemCardEvent from '../ItemCardEvent'
import {backgroundColor, blueColor} from '../../../constants/color';
import {getEvent} from '../../../utilities/ApiManager';

class NearByContainer extends React.Component {

  constructor() {
    super();

    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {


    }
  }

  render() {
    return (
      !this.props.currentUserEvent ?
        <ActivityIndicator size='large' color={blueColor}
                           style={{
                             flex: 1,
                             justifyContent: 'center',
                             alignItems: 'center'
                           }}/>
        :
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor}}>
          <View style={{elevation: 0}}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.props.currentUserEvent}
              renderItem={({item}) => <ItemCardEvent data={item}/>}
            />
          </View>
        </View>
    )
  }
}

export default connect(state => ({
  currentUserEvent: state.userInfo.currentUserEvent
}), dispatch => ({}))(NearByContainer);
