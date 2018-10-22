/**
 * Created by Duong Le on 10/20/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet} from 'react-native'
import {backgroundColor, blackColor, blueColor, grayColor, redColor, whiteColor} from '../../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RouteKey from '../../constants/routeKey'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import {postCreateEvents} from '../../utilities/ApiManager';


class CreateEventContainer extends React.Component {

  constructor() {
    super();

    this.state = {
      data: [],
      isDateTimePickerVisible: false,
      dateTimePickerStart: '',
      dateTimePickerEnd: '',
      eventTittle: '',
      description: '',
      price: 0
    }
    this.isDateTimePickerEnd = false
  }

  componentWillMount() {

  }

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);

    if (!this.isDateTimePickerEnd) {
      this.setState({dateTimePickerStart: Moment(date).format('DD-MM-YYYY')})
    } else {
      this.setState({dateTimePickerEnd: Moment(date).format('DD-MM-YYYY')})
    }

    this._hideDateTimePicker();
  };

  render() {
    const {navigate} = this.props.navigation;

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
            fontSize: 31,
            color: whiteColor
          }]}>Tạo Event</Text>
        </View>

        <ScrollView>
          <View style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: backgroundColor
          }}>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Tên event</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  onChangeText={(eventTittle) => this.setState({eventTittle: eventTittle})}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Thời gian bắt
                đầu </Text>
              <TouchableOpacity onPress={() => {
                this.isDateTimePickerEnd = false
                this._showDateTimePicker()
              }}>
                <View style={styles.inputWrapper}>
                  <Text
                    numberOfLines={1}
                    style={styles.textInput}>
                    {this.state.dateTimePickerStart}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>
                Thời gian kết thúc </Text>
              <TouchableOpacity onPress={() => {
                this.isDateTimePickerEnd = true
                this._showDateTimePicker()
              }}>
                <View style={styles.inputWrapper}>
                  <Text
                    numberOfLines={1}
                    style={styles.textInput}>
                    {this.state.dateTimePickerEnd}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Giá </Text>
              <View style={[styles.inputWrapper, {flexDirection: 'row'}]}>
                <TextInput
                  style={[styles.textInput, {width: '75%'}]}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  keyboardType='numeric'
                  onChangeText={(price) => this.setState({price: price})}
                />
                <Text>đồng</Text>

              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Địa điểm</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({numberPhone: text})}
                />
              </View>
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
              <View style={[styles.inputWrapper, {height: 65}]}>

              </View>
            </View>


            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

              <TouchableOpacity style={styles.button} onPress={() => {
                postCreateEvents(
                  this.props.userInfo.username,
                  this.state.eventTittle, this.state.description,
                  this.state.price, 'a b c',
                  this.state.dateTimePickerStart,
                  this.state.dateTimePickerEnd,
                  'swsws'
                ).then(resss=>{
                  if(resss){
                    navigate(RouteKey.ProfileScreen, {})
                  }
                })
              }}>
                <Text style={[styles.textStyle, {alignSelf: 'center', fontWeight: '500', color: whiteColor}]}>Lưu</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate(RouteKey.ProfileScreen, {})}
                                style={[styles.button, {width: 100, backgroundColor: redColor}]}>
                <Text style={[styles.textStyle, {alignSelf: 'center', fontWeight: '500', color: whiteColor}]}>Huỷ</Text>

              </TouchableOpacity>

            </View>


          </View>
        </ScrollView>

        {/*<View style={{*/}
        {/*zIndex: 999,*/}
        {/*position: 'absolute',*/}
        {/*top: 20,*/}
        {/*left: 5,*/}
        {/*}}>*/}

        {/*<TouchableOpacity*/}
        {/*style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}*/}
        {/*onPress={() => navigate(RouteKey.ProfileScreen, {})}>*/}
        {/*<Ionicons name={'ios-arrow-back'} size={34} color={whiteColor}/>*/}
        {/*</TouchableOpacity>*/}
        {/*</View>*/}

      </View>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), dispatch => ({}))(CreateEventContainer);

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
    backgroundColor: whiteColor
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