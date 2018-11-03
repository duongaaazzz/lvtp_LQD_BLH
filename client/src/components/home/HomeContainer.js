/**
 * Created by Duong Le on 9/8/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native'
import NavigationServices from '../../navigation/NavigationServices'
import {HomeSwitch} from '../../navigation/AppNavigator'
import {getEvent} from '../../utilities/ApiManager';
import {GET_EVENT_USER} from '../../actions/user';

class HomeContainer extends React.Component {


  componentDidMount() {

    getEvent().then(ress => {
      if (ress) {
        this.props.getEvent(ress.events)
      }
    });

  }


  render() {
    return (
      <HomeSwitch ref={navigatorRef => {
        NavigationServices.setTopLevelNavigatorHomeSwitch(navigatorRef);
      }}/>
    )
  }
}

export default connect(state => ({}), dispatch => ({
  getEvent: (currentUserEvent) => dispatch({type: GET_EVENT_USER, currentUserEvent})
}))(HomeContainer);
