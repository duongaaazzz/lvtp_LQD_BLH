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

    this.state = {
      data: []
    }
  }

  componentWillMount() {

    getEvent().then(ress => {
      if (ress) {
        this.setState({data: ress})
      }
    });

  }

  render() {
    return (
      !this.state.data ? <ActivityIndicator size='large' color={blueColor} style={{flex:1,justifyContent: 'center', alignItems: 'center'}}/> :
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor}}>
          <View style={{elevation: 0}}>

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.data}
              renderItem={({item}) => <ItemCardEvent data={item}/>}
            />
          </View>
        </View>
    )
  }
}

export default connect(state => ({}), dispatch => ({}))(NearByContainer);
