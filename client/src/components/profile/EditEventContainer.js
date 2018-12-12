/**
 * Created by Duong Le on 10/20/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  Picker,
  Alert
} from 'react-native'
import {backgroundColor, blackColor, blueColor, grayColor, redColor, whiteColor} from '../../constants/color';
import ImagePicker from 'react-native-image-crop-picker';
import RouteKey from '../../constants/routeKey';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import {patchUpdateEvent} from '../../utilities/ApiManager';
import NavigationServices from '../../navigation/NavigationServices';

import ItemImagePostEvent from './ItemImagePostEvent';
import {USER_LOGOUT} from '../../actions/user';


class EditEventContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isDateTimePickerVisible: false,
      avatarPostEvent: '',
      listImagePostEvent: '',
      title: '',
      description: '',
      price: '',
      type: [],
      location: '',
      avatar: '',
      time_start: Moment().format('DD-MM-YYYY'),
      time_end: Moment().format('DD-MM-YYYY')
    }
    this.isDateTimePickerEnd = false
  }

  updateGender = (gender) => {
    this.setState({gender: gender})
  }
  upLoadImageEventSuccess = (linkImage) => {
    console.log('avatar', this.state.avatar);
    this.setState({avatar: linkImage})
  }

  componentDidMount() {
    const detailCardEvent = this.props.navigation.state.params.detailCardEvent;
    console.log('detail event:', detailCardEvent);
    this.setState({
      title: detailCardEvent.title,
      description: detailCardEvent.description,
      price: detailCardEvent.price,
      type: detailCardEvent.type,
      location: detailCardEvent.location,
      avatar: detailCardEvent.avatar,
      time_start: detailCardEvent.time_start,
      time_end: detailCardEvent.time_end,
    })

  }

  render() {
    const detailCardEvent = this.props.navigation.state.params.detailCardEvent;
    return (<View style={{flex: 1, backgroundColor: backgroundColor}}>
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
          }]}>Chỉnh Sửa Sự Kiện</Text>


        </View>

        <ScrollView>
          <View style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: backgroundColor
          }}>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Tên sự kiện</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={this.state.title}
                  placeholder="Event's title"
                  style={styles.textInput}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  onChangeText={(title) => this.setState({title: title})}
                />
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Giá</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType='numeric'
                  value={`${this.state.price}`}
                  placeholder="price"
                  style={styles.textInput}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  onChangeText={(price) => this.setState({price: price})}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Địa Điểm</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={this.state.location}
                  placeholder="location"
                  style={styles.textInput}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  onChangeText={(location) => this.setState({location: location})}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Loại sự kiện</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  value={`${this.state.type}`}
                  placeholder="type"
                  style={styles.textInput}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  onChangeText={(type) => this.setState({type: type})}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Thời gian Bắt
                Đầu</Text>
              <DatePicker
                value={this.state.time_start}
                style={{width: '100%', marginTop: 10}}
                date={this.state.time_start}
                mode="datetime"
                format="YYYY-MM-DD"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour={true}
                customStyles={{
                  dateInput: [styles.inputWrapper, {borderWidth: 0, marginRight: 10}]
                }}
                onDateChange={(date) => {
                  this.setState({time_start: date})
                }}
              />
            </View>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Thời gian Kết
                Thúc</Text>
              <DatePicker
                value={this.state.time_end}
                style={{width: '100%', marginTop: 10}}
                date={this.state.time_end}
                mode="datetime"
                format="YYYY-MM-DD"
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour={true}
                customStyles={{
                  dateInput: [styles.inputWrapper, {borderWidth: 0, marginRight: 10}]
                }}
                onDateChange={(date) => {
                  this.setState({time_end: date})
                }}
              />
            </View>

            <View style={[styles.wrapper, {}]}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Mô tả</Text>
              <View style={[styles.inputWrapper, {height: 110}]}>
                <TextInput
                  style={[styles.textInput, {
                    height: 100,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                  }]}
                  value={this.state.description}
                  maxLength={400}
                  multiline={true}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  onChangeText={(description) => this.setState({description: description})}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Ảnh đại điện</Text>

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
                <View style={[styles.inputWrapper, {height: 40, flexDirection: 'row'}]}>
                  <Text style={[styles.textStyle, {fontWeight: '500'}]}>Chọn ảnh từ bộ sưu tập</Text>
                </View>
              </TouchableOpacity>

            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity style={styles.button} onPress={() => {
                patchUpdateEvent(
                  detailCardEvent._id, this.state.title, this.state.description, this.state.price, this.state.type, this.state.location, this.state.avatar, this.state.time_start, this.state.time_end
                ).then(res => {
                  console.log('update event result: ', res)
                  if (res.status == 'success') {

                    Alert.alert(
                      'Thông báo',
                      'Thông tin sự kiện đả được cập nhât!', [
                        {
                          text: 'OK', style: 'cancel', onPress: () => {

                            NavigationServices.profileSwitchNavigate(RouteKey.DetailsEventProfile, {detailCardEvent: this.props.navigation.state.params.detailCardEvent,})
                          }
                        },
                      ])
                  }
                })
              }}>
                <Text style={[styles.textStyle, {alignSelf: 'center', fontWeight: '500', color: whiteColor}]}>Lưu</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                NavigationServices.profileSwitchNavigate(RouteKey.DetailsEventProfile, {
                  detailCardEvent: this.props.navigation.state.params.detailCardEvent,
                  currentUserEvent: this.props.currentUserEvent
                })
              }}
                                style={[styles.button, {width: 100, backgroundColor: redColor}]}>
                <Text style={[styles.textStyle, {alignSelf: 'center', fontWeight: '500', color: whiteColor}]}>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo,
  currentUserEvent: state.userInfo.currentUserEvent

}), dispatch => ({
  logoutUser: () => dispatch({type: USER_LOGOUT})
}))(EditEventContainer);

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