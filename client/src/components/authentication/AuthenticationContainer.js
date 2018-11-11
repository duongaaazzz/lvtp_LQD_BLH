/**
 * Created by Duong Le on 9/15/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, AsyncStorage, ActivityIndicator} from 'react-native'
import NavigationServices from '../../navigation/NavigationServices'

import RouteKey from '../../constants/routeKey'
import {grayColor} from '../../constants/color';
import {
  getCurrentUser,
  getEvent,
  getUserInfoWithPhone,
  loginUserWithPhone,
  sendVerificationPhoneNumber
} from '../../utilities/ApiManager';
import {GET_USER_INFO, USER_LOGIN} from '../../actions/user';

class AuthenticationContainer extends React.Component {


  componentDidMount() {
    if (this.props.navigation.state !== undefined && this.props.navigation.state.params !== undefined) {

      if (this.props.navigation.state.params.success) {

        getUserInfoWithPhone(this.props.navigation.state.params.numberPhone).then(ress => {
          console.log('check user exits, phone number: ', this.props.navigation.state.params.numberPhone);
          console.log(ress);
          if (ress) {
            this.props.getUserInfo(ress)
            loginUserWithPhone(this.props.navigation.state.params.numberPhone).then(data => {
              if (!!data) {
                loginUserWithPhone(this.props.navigation.state.params.numberPhone).then(data => {
                  if (!!data) {
                    this.props.setToken(data)
                    NavigationServices.navigate('MainTab', {numberPhone: this.props.navigation.state.params.numberPhone})
                  }
                })
              }
            })
          } else {
            NavigationServices.navigate(RouteKey.RegisterUserScreen, {numberPhone: this.props.navigation.state.params.numberPhone})
          }
        });

      } else {
        // setTimeout(() => {
        //   NavigationServices.navigate(RouteKey.LoginScreen)
        // }, 500)
      }
    } else {
      //check token available

      this.checkToken().then(data => {
        if (data) {

          getCurrentUser().then(data => {
            console.log('ssasdasd', data)
            if (!!data) {

              this.props.getUserInfo(data)

              NavigationServices.navigate('MainTab', {numberPhone: data.phone})
            } else {
              NavigationServices.navigate(RouteKey.LoginScreen)
            }
          })

          // NavigationServices.navigate('MainTab', {numberPhone: this.props.navigation.state.params.numberPhone})
        } else {

          NavigationServices.navigate(RouteKey.LoginScreen)
          console.log('dsfsdfds')
        }
      })
    }
  }

  checkToken() {
    return new Promise(resolve => {
      let token = AsyncStorage.getItem('@yolo:token').then(token => {

        this.props.setToken(token)

        return !!token
      })

      resolve(token)
    })
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
  setToken: (token) => dispatch({type: USER_LOGIN, token: token}),
  getUserInfo: (userInfo) => dispatch({type: GET_USER_INFO, userInfo})
}))(AuthenticationContainer);
