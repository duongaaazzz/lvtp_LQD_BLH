/**
 * Created by Duong Le on 10/20/18.
 */

import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, FlatList, Picker } from 'react-native';
import { backgroundColor, blackColor, blueColor, grayColor, redColor, whiteColor } from '../../constants/color';
import ImagePicker from 'react-native-image-crop-picker';
import RouteKey from '../../constants/routeKey';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import { patchUpdateUserInfor } from '../../utilities/ApiManager';
import NavigationServices from '../../navigation/NavigationServices';

import ItemImagePostEvent from './ItemImagePostEvent';
import { USER_LOGOUT } from '../../actions/user';


class EditUserInforContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isDateTimePickerVisible: false,
      birthday: Moment().format('DD-MM-YYYY'),
      fullname: '',//this.props.userInfo.fullname,
      gender: 'female',
      location: '',
      avatarPostEvent: '',
      now: new Date(),
      avatar: '',
      listImagePostEvent: '',
    }
    this.isDateTimePickerEnd = false
  }

  updateGender = (gender) => {
    this.setState({ gender: gender })
  }
  upLoadImageEventSuccess = (linkImage) => {
    console.log('avatar', this.state.avatar);
    this.setState({ avatar: linkImage })
  }

  componentDidMount() {

    this.setState({
      gender: this.props.userInfo.gender,
      fullname: this.props.userInfo.fullname,
      email: this.props.userInfo.email,
      avatar: this.props.userInfo.avatar,
      birthday: this.props.userInfo.birthday,
      about: this.props.userInfo.about
    })

  }

  _onPressSave(fullname, birthday, gender, email, avatar, about) {
    patchUpdateUserInfor(
      fullname,
      birthday,
      gender,
      email,
      avatar,
      about
    ).then(res => {
      console.log('update user infor result: ', res)
      if (res.status == 'success')
        NavigationServices.profileSwitchNavigate(RouteKey.ProfileScreen)
    })
  }

  render() {
    return (<View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <View style={{
        width: '100%',
        height: 70,
        backgroundColor: blueColor,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={[styles.textStyle, {
          fontWeight: 'bold',
          fontSize: 28,
          color: whiteColor
        }]}>Chỉnh Sửa Thông Tin</Text>


      </View>

      <ScrollView>
        <View style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: backgroundColor
        }}>

          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Tên hiển thị</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={this.state.fullname}
                placeholder="Fullname"
                style={styles.textInput}
                placeholderTextColor={grayColor}
                underlineColorAndroid="transparent"
                onChangeText={(fullname) => this.setState({ fullname: fullname })}
              />
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                value={this.state.email}
                placeholder="Email"
                style={styles.textInput}
                placeholderTextColor={grayColor}
                underlineColorAndroid="transparent"
                onChangeText={(email) => this.setState({ email: email })}
              />
            </View>
          </View>


          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Ngày Sinh</Text>
            <DatePicker
              value={this.state.birthday}
              style={{ width: '100%', marginTop: 10 }}
              date={this.state.birthday}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1920-01-01"
              maxDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              is24Hour={true}
              customStyles={{
                dateInput: [styles.inputWrapper, { borderWidth: 0, marginRight: 10 }]
              }}
              onDateChange={(date) => {
                console.log(date)
                this.setState({ birthday: date })
              }}
            />
          </View>


          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Giới tính </Text>
            <Picker
              selectedValue={this.state.gender}
              onValueChange={this.updateGender}
            >
              <Picker.Item label="Nam" value="male" />
              <Picker.Item label="Nữ" value="female" />
              <Picker.Item label="Khác" value="other" />
            </Picker>
          </View>

          <View style={[styles.wrapper, {}]}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Giới thiệu bản
                thân</Text>
            <View style={[styles.inputWrapper, { height: 110 }]}>
              <TextInput
                style={[styles.textInput, {
                  height: 100,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start'
                }]}
                value={this.state.about}
                maxLength={400}
                multiline={true}
                placeholderTextColor={grayColor}
                underlineColorAndroid="transparent"
                onChangeText={(about) => this.setState({ about: about })}
              />
            </View>
          </View>

          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Ảnh đại điện</Text>

            <View style={{
              width: '100%',
              height: 120,
              backgroundColor: 'white',
              marginVertical: 5,
              borderRadius: 5,
              justifyContent: 'center'
            }}>
              {
                !!this.state.avatarPostEvent && <ItemImagePostEvent imageInfo={this.state.avatarPostEvent}
                  nameEvent={this.state.eventTittle}
                  upLoadImageEventSuccess={this.upLoadImageEventSuccess}
                />
              }

            </View>

            <TouchableOpacity onPress={() => {
              ImagePicker.openPicker({
                multiple: false
              }).then(images => {
                console.log(images)
                this.setState({
                  avatarPostEvent: images
                })
              });
            }}>
              <View style={[styles.inputWrapper, { height: 40, flexDirection: 'row' }]}>
                <Text style={[styles.textStyle, { fontWeight: '500' }]}>Chọn ảnh từ bộ sưu tập</Text>
              </View>
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              this._onPressSave(
                this.state.fullname,
                this.state.birthday,
                this.state.gender,
                this.state.email,
                this.state.avatar,
                this.state.about)

            }}>
              <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '500', color: whiteColor }]}>Lưu</Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => NavigationServices.profileSwitchNavigate(RouteKey.ProfileScreen, { createEvent: true })}
              style={[styles.button, { width: 100, backgroundColor: redColor }]}>
              <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '500', color: whiteColor }]}>Huỷ</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={this.props.logoutUser}>
            <View style={{
              width: 200,
              height: 50,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              backgroundColor: 'transparent',
            }}>
              <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '500', color: grayColor }]}>
                Đăng xuất</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), dispatch => ({
  logoutUser: () => dispatch({ type: USER_LOGOUT })
}))(EditUserInforContainer);

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'SegoeUI',
    color: blackColor,
  },
  textInput: {
    width: '90%',
  },
  inputWrapper: {
    marginVertical: 5,
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: whiteColor,
  },
  wrapper: {
    width: '80%', marginVertical: 5
  },
  buttonLable: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    backgroundColor: blueColor,
    padding: 10,
    width: 190,
    height: 40,
    margin: 5,
    borderRadius: 30,
  },
})