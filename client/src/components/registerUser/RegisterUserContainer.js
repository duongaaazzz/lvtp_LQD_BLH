/**
 * Created by Duong Le on 10/20/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Modal
} from 'react-native'
import NavigationServices from '../../navigation/NavigationServices'
import Entypo from 'react-native-vector-icons/Entypo';

import RouteKey from '../../constants/routeKey'
import {blackColor, blueColor, grayColor} from '../../constants/color';
import {getUserInfoWithPhone, postUserInfo, sendVerificationPhoneNumber} from '../../utilities/ApiManager';
import {GET_USER_INFO} from '../../actions/user';


class RegisterUserContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      numberPhone: '',
      username: '',
      fullname: '',
      email: '',
      isLoading: false
    }

    this.state = {
      isLoading: false
    }

  }

  onChangeText = (type, text) => {
    this.setState({[type]: text});
  }

  onPressRegister() {

    this.setState({isLoading: true})

    postUserInfo(this.state.username, 'AXbsnX', this.state.email, this.props.navigation.state.params.numberPhone, this.state.fullname).then(resssssss => {
      if (!!resssssss) {

        getUserInfoWithPhone(this.props.navigation.state.params.numberPhone).then(ress => {
          if (!!ress) {
            this.props.getUserInfo(ress)
            NavigationServices.navigate('MainTab')
          } else {
            NavigationServices.navigate(RouteKey.RegisterUserScreen, {numberPhone: this.props.navigation.state.params.numberPhone })
          }
        });
      }
    })
  }

  render() {

    const {numberPhone} = this.props.navigation.state.params

    return (
      <KeyboardAvoidingView style={styles.root} behavior="padding" enabled>
        <View style={styles.titileWrapper}>
          <Text style={styles.text}>Tạo Tài Khoản Mới</Text>
        </View>

        <View style={{backgroundColor: grayColor, width: 55, height: 55, alignSelf: 'center', borderRadius: 6}}>
        </View>
        <View style={styles.inputWrapper}>


          <Text style={styles.textStyle}>
            +84 {numberPhone}
          </Text>

          <TextInput
            style={styles.textInput}
            maxLength={16}
            placeholder="username"
            returnKeyType="done"
            ref={(input) => (this.username = input)}
            placeholderTextColor="gray"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({username: text})}
          />
          <TextInput
            style={styles.textInput}
            maxLength={32}
            placeholder="full name"
            returnKeyType="done"
            ref={(input) => (this.fullname = input)}
            placeholderTextColor="gray"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({fullname: text})}
          />
          <TextInput
            style={styles.textInput}
            keyboardType='email-address'
            placeholder="email"
            returnKeyType="done"
            ref={(input) => (this.email = input)}
            placeholderTextColor="gray"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({email: text})}
          />
        </View>


        <TouchableOpacity style={styles.button}
                          onPress={() => this.onPressRegister()}
        >
          {
            !this.state.isLoading ? <Text style={styles.buttonLable}>Đăng ký</Text> :
              <ActivityIndicator size={'small'} color='white'/>
          }

        </TouchableOpacity>

        <View style={{flex: 0.1, alignItems: 'center',}}/>

      </KeyboardAvoidingView>

    )
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
  },
  titileWrapper: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'pink'
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    //  backgroundColor: 'orange'
  },
  buttonsWrapper: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    //  backgroundColor: 'cyan'
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: '#faf9f9',
    borderColor: '#e4e4e4',
    margin: 5,
    paddingLeft: 18,
    borderRadius: 30,
    width: '78%',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonLable: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  link: {
    color: '#0c9eff',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: blueColor,
    padding: 10,
    width: '60%',
    margin: 5,
    borderRadius: 30,
  },
  smallButton: {
    alignSelf: 'center'
  },
  textStyle: {
    fontFamily: 'SegoeUI',
    color: blackColor
  },
})


export default connect(state => ({}), dispatch => ({
  getUserInfo: (userInfo) => dispatch({type: GET_USER_INFO, userInfo})
}))(RegisterUserContainer);
