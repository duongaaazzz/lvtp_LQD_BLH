/**
 * Created by Duong Le on 10/20/18.
 */

import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, FlatList, Picker } from 'react-native'
import { backgroundColor, blackColor, blueColor, grayColor, redColor, whiteColor } from '../../constants/color';
import ImagePicker from 'react-native-image-crop-picker';
import RouteKey from '../../constants/routeKey'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
import { patchUpdateUserInfor } from '../../utilities/ApiManager';

import ItemImagePostEvent from './ItemImagePostEvent'



class EditUserInforContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isDateTimePickerVisible: false,
      birthday: Moment().format('DD-MM-YYYY'),
      fullname: '',//this.props.userInfo.fullname,
      gender: 'female',
      location,
      linkImageEvent: '',
      listImagePostEvent: '',
      now: new Date(),
      avatar: ''
    }
    this.isDateTimePickerEnd = false
  }
  updateGender = (gender) => {
    this.setState({ gender: gender })
  }
  upLoadImageEventSuccess = (linkImage) => {
    this.setState({ linkImageEvent: linkImage })
  }

  componentDidMount() {
    this.setState({ gender: this.props.userInfo.gender })
    this.setState({ fullname: this.props.userInfo.fullname })
    this.setState({ email: this.props.userInfo.email })
    this.setState({ avatar: this.props.userInfo.avatar })
    this.setState({ birthday: this.props.userInfo.birthday })
    this.setState({ about: this.props.userInfo.about })
  }
  _onPressSave(fullname, birthday, gender, email, avatar, about) {
    patchUpdateUserInfor(
      fullname,
      birthday,
      gender,
      email,
      avatar,
      about
    ).then(result => {
      console.log('update user infor result: ', result)
    })
  }

  render() {
    const { navigate } = this.props.navigation;
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
          fontSize: 31,
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
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Giới thiệu bản thân</Text>
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
                !!this.state.listImagePostEvent && <ItemImagePostEvent imageInfo={this.state.listImagePostEvent}
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
                  listImagePostEvent: images
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
              this._onPressSave(this.state.fullname, this.state.birthday, this.state.gender, this.state.email, this.state.avatar, this.state.about)
            }}>
              <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '500', color: whiteColor }]}>Lưu</Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate(RouteKey.ProfileScreen, { createEvent: true })}
              style={[styles.button, { width: 100, backgroundColor: redColor }]}>
              <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '500', color: whiteColor }]}>Huỷ</Text>

            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), dispatch => ({}))(EditUserInforContainer);

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