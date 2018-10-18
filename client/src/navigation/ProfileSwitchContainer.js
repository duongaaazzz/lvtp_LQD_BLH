/**
 * Created by Duong Le on 10/18/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native'
import {ProfileSwitch} from './AppNavigator'
import NavigationServices from './NavigationServices';

export default class HomeTabContainer extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <ProfileSwitch ref={navigatorRef => {
          NavigationServices.setTopLevelNavigatorProfileSwitch(navigatorRef);
        }}/>
      </View>
    )
  }
}
