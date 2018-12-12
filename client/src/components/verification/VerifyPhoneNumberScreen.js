import React, {Component} from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import {KeycodeInput} from './KeyCodeInput'
import {blueColor} from "../../constants/color";
import {validateVerificationCode} from "../../utilities/ApiManager";
import NavigationServices from "../../navigation/NavigationServices";
import RouteKey from "../../constants/routeKey";


export default class VerifyPhoneNumberScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Xác mính số điện thoại'
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
      mobileNumber: '',
      password: '',
      isForgotPassword: false,
      timer: 30,
      isCountDown: false,
      code: '',
      checkOtpError: '',
      totalSecondNeedWait: 0
    };
  }

  componentDidMount() {
    const mobileNumber = this.props.navigation.state !== undefined && this.props.navigation.state.params !== undefined && this.props.navigation.state.params.numberPhone
    const isForgotPassword = false
    const totalSecondNeedWait = 3
    this.setState({mobileNumber, isForgotPassword, totalSecondNeedWait, timer: totalSecondNeedWait})
    if (!this.state.isCountDown) {
      this.setState({isCountDown: true, code: ''})
      this.clockCall = setInterval(() => {
        this.decrementClock();
      }, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container1}>
            <View style={{flex: 1, width: '100%'}}>
              <View style={{alignItems: "center"}}>
                <Text style={styles.text}>
                  Vui lòng nhập 4 mã xác nhận đả được gửi đến số điện
                  thoại {'+84' + this.state.mobileNumber || `65 83824723`}
                </Text>
              </View>
              <View style={{alignItems: "center", marginTop: 25}}>
                <KeycodeInput
                  onComplete={(value) => {
                    this._handlerOnFulfill(value)
                  }}
                  onChange={(value) => {
                    this.setState({code: value})
                    console.log(value)
                  }}
                  value={this.state.code}
                  numeric={true}
                />
                <Text style={{color: '#d0021b', fontSize: 16, marginTop: 10}}>{this.state.checkOtpError}</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center', width: '100%', justifyContent: 'center'}}>
              <Text style={{color: '#9b9b9b', fontSize: 16, fontFamily: 'SegoeUI'}}>Yêu cầu mã xác nhận mới</Text>
              {
                !this.state.isCountDown ?
                  <Text style={{color: '#9b9b9b'}}></Text>
                  :
                  <Text
                    style={{color: '#4a4a4a', fontSize: 24, fontFamily: 'SegoeUI'}}>{`${this.state.timer}s`}</Text>
              }
              <TouchableOpacity
                style={[styles.newCodeBtn, {backgroundColor: this.state.isCountDown ? "#b2b2b2" : blueColor}]}
                onPress={() => {
                  this.startCountDown()
                }}
              >
                <Text style={{fontFamily: 'SegoeUI', color: "#fff", fontSize: 16, fontWeight: '500'}}>
                  Gửi cho tôi mã xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
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

  _handlerOnFulfill(code) {
    this.setState({
      code: code
    })
    this.verification()
  }

  startCountDown() {
    if (!this.state.isCountDown) {
      this.setState({isCountDown: true, code: ''})
      this.clockCall = setInterval(() => {
        this.decrementClock();
      }, 1000);


      // goi ham send cai moi cho n
    }
  }

  decrementClock = () => {
    if (this.state.timer == 0) {
      clearInterval(this.clockCall);
      this.setState({isCountDown: false, timer: this.state.totalSecondNeedWait})
    } else
      this.setState((prevstate) => ({timer: prevstate.timer - 1}));
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container1: {
    height: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: blueColor,
    marginVertical: 16,
    fontFamily: 'SegoeUI',
  },
  newCodeBtn: {
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 8
  },
});