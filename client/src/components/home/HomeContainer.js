/**
 * Created by Duong Le on 9/8/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native'
import NavigationServices from '../../navigation/NavigationServices'
import {HomeSwitch} from '../../navigation/AppNavigator'
import {getEvent, loginUserWithPhone} from '../../utilities/ApiManager';
import {GET_EVENT_USER, USER_LOGIN} from '../../actions/user';

class HomeContainer extends React.Component {


  componentDidMount() {

    console.log('userInfo', this.props.userInfo)
    loginUserWithPhone(this.props.userInfo.phone).then(data => {
      if (!!data) {
        this.props.setToken(data)
        getEvent().then(ress => {
          if (ress) {
            this.props.getEvent(ress.events || [])
          }
        });

      }
    })

  }


  render() {
    return (
      <HomeSwitch ref={navigatorRef => {
        NavigationServices.setTopLevelNavigatorHomeSwitch(navigatorRef);
      }}/>
    )
  }
}

export default connect(state => ({
  token: state,
  userInfo: state.userInfo
}), dispatch => ({
  setToken: (token) => dispatch({type: USER_LOGIN, token: token}),
  getEvent: (currentUserEvent) => dispatch({type: GET_EVENT_USER, currentUserEvent})
}))(HomeContainer);
