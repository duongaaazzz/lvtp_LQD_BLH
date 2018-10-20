/**
 * Created by Duong Le on 9/15/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import NavigationServices from '../../navigation/NavigationServices'

import RouteKey from '../../constants/routeKey'
import {grayColor} from '../../constants/color';
import {getUserInfoWithPhone, sendVerificationPhoneNumber} from '../../utilities/ApiManager';
import {GET_USER_INFO} from '../../actions/user';

class AuthenticationContainer extends React.Component {


  componentDidMount() {
    if (this.props.navigation.state !== undefined && this.props.navigation.state.params !== undefined) {

      if (this.props.navigation.state.params.success) {
        
        getUserInfoWithPhone(this.props.navigation.state.params.numberPhone).then(ress => {
          console.log('check user exits, phone number: ',this.props.navigation.state.params.numberPhone );
          if (!!ress) {
            this.props.getUserInfo(ress)
            NavigationServices.navigate('MainTab')
          } else {
            NavigationServices.navigate(RouteKey.RegisterUserScreen, {numberPhone: this.props.navigation.state.params.numberPhone })
          }
        });
        // very xong r

        // setTimeout(() => {
        //   NavigationServices.navigate('MainTab')
        // }, 15000)

      } else {
        // setTimeout(() => {
        //   NavigationServices.navigate(RouteKey.LoginScreen)
        // }, 500)
      }
    } else {
      //check token available

      

      // setTimeout(() => {
      //   NavigationServices.navigate(RouteKey.LoginScreen)
      // }, 500)
    }
  }


  render() {


    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>check token done</Text>

        <ActivityIndicator size="small" color={grayColor}/>


      </View>
    )
  }
}

export default connect(state => ({}), dispatch => ({
  getUserInfo: (userInfo) => dispatch({type: GET_USER_INFO, userInfo})
}))(AuthenticationContainer);
