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
import { sendVerificationPhoneNumber, validateVerificationCode} from '../../utilities/ApiManager';
import {USER_LOGIN} from '../../actions/user';

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
    return (

      <KeyboardAvoidingView style={styles.root} behavior="padding" enabled>


        <View style={styles.titileWrapper}>
          <Text style={styles.text}>Xác minh số điện thoại</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
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
    flex: 0.55,
    alignItems: 'center',
    justifyContent: 'center',
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
}), dispatch => ({
}))(VerificationContainer);
