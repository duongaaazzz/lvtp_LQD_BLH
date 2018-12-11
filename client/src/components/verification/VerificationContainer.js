/**
 * Created by Duong Le on 9/8/18.
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
  Alert,
  Modal
} from 'react-native'
import NavigationServices from '../../navigation/NavigationServices'
import Entypo from 'react-native-vector-icons/Entypo';

import RouteKey from '../../constants/routeKey'
import {blackColor, blueColor} from '../../constants/color';
import {sendVerificationPhoneNumber, validateVerificationCode} from '../../utilities/ApiManager';
import {USER_LOGIN} from '../../actions/user';
import Ionicons from "react-native-vector-icons/Ionicons";
import VeriS from './VerifyPhoneNumberScreen'


class VerificationContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      code: '',
      isLoading: false
    }
  }

  onChangeText = (type, text) => {
    this.setState({[type]: text});
  }

  verification = () => {

    this.setState({
      isLoading: true
    })

    const numberPhone = this.props.navigation.state !== undefined && this.props.navigation.state.params !== undefined && this.props.navigation.state.params.numberPhone

    validateVerificationCode('+84', numberPhone, this.state.code).then(resss => {
      // if (resss.success) {
      if (true) {
        console.log(numberPhone)
        NavigationServices.navigate(RouteKey.Authentication, {success: true, numberPhone: numberPhone})
      } else {
        Alert.alert(
          'Lỗi',
          'Mã xác nhận không đúng!', [
            {text: 'OK', style: 'cancel'},
          ])
      }
    })


  }

  render() {
    const {navigate} = this.props.navigation
    // const numberPhone = this.props.navigation.state !== undefined && this.props.navigation.state.params !== undefined && this.props.navigation.state.params.numberPhone
    const numberPhone = '0939808386'

    return (


      <View style={styles.root} behavior="padding" enabled>


        <View style={styles.titileWrapper}>

          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name={'ios-arrow-back'} size={34} color={blueColor}/>
            </TouchableOpacity>

            <Text style={[styles.text, {fontSize: 26, fontWeight: 'bold', marginLeft: 10}]}>Xác minh số
              điện thoại</Text>
          </View>

          <Text style={[styles.text, {fontWeight: '400', marginHorizontal: 10}]}>
            Vui lòng nhập 4 mã xác nhận đả được gửi đến số điện thoại (+84)
            <Text
              style={styles.text}>{numberPhone}
            </Text>
          </Text>

        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.textInput, {height: 30}]}
            keyboardType='numeric'
            maxLength={4}
            placeholder="Mã xác nhận"
            returnKeyType="done"
            ref={(input) => (this.numberPhone = input)}
            placeholderTextColor="gray"
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({code: text})}
          />
        </View>

        <View>
          <Text style={[styles.text, {marginHorizontal: 10, fontSize: 14}]}>
            Bạn gặp vấn đề với mả xác nhận?
          </Text>
          <Text>
            Vui lòng
          </Text>
        </View>


        <View style={styles.buttonsWrapper}>

          <View style={{flexDirection: 'row', alignContent: 'center'}}>
            <TouchableOpacity style={styles.button}
                              onPress={() => this.verification()}
            >
              {
                !this.state.isLoading ? <Text style={styles.buttonLable}>Xác minh</Text> :
                  <ActivityIndicator size={'small'} color='white'/>
              }

            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.1, alignItems: 'center',}}>
        </View>
      </View>
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
    flex: 0.15,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    backgroundColor: blueColor,
    padding: 10,
    width: '60%',
    margin: 5,
    borderRadius: 30,
  },
  smallButton: {
    alignSelf: 'center'
  }
})


export default connect(state => ({
  token: state
}), dispatch => ({}))(VerificationContainer);
