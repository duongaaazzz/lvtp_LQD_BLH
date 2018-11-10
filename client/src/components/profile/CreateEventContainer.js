/**
 * Created by Duong Le on 10/20/18.
 */

import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, FlatList } from 'react-native'
import { backgroundColor, blackColor, blueColor, grayColor, redColor, whiteColor } from '../../constants/color';
import ImagePicker from 'react-native-image-crop-picker';
import RouteKey from '../../constants/routeKey'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
import { postCreateEvents } from '../../utilities/ApiManager';

import ItemImagePostEvent from './ItemImagePostEvent'

class CreateEventContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isDateTimePickerVisible: false,
      dateTimePickerStart: Moment().format('DD-MM-YYYY'),
      dateTimePickerEnd: Moment().format('DD-MM-YYYY'),
      eventTittle: '',
      description: '',
      price: 0,
      location,
      linkImageEvent: 'https://lh3.googleusercontent.com/tENLeNva499pxauBN1i5cOgwoZDAJk2R_F4R8PCVdw-YDUNk-8KQqUOLbiYWS97UkXn1Pw7dGw=w640-h400-e365',
      listImagePostEvent: '',
      type: [],
    }
    this.isDateTimePickerEnd = false
  }

  componentWillMount() {

  }

  upLoadImageEventSuccess = (linkImage) => {
    this.setState({ linkImageEvent: linkImage })
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
        }]}>Tạo Event</Text>
      </View>

      <ScrollView>
        <View style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: backgroundColor
        }}>

          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Tên event</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={grayColor}
                underlineColorAndroid="transparent"
                onChangeText={(eventTittle) => this.setState({ eventTittle: eventTittle })}
              />
            </View>
          </View>

          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Thời gian bắt
                đầu </Text>

            <DatePicker
              style={{ width: '100%', marginTop: 10 }}
              date={this.state.dateTimePickerStart}
              mode="datetime"
              placeholder="select date"
              format="DD-MM-YYYY h:mm a"
              minDate={Moment().format('DD-MM-YYYY')}
              maxDate="01-01-2020"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              is24Hour={true}
              customStyles={{
                dateInput: [styles.inputWrapper, { borderWidth: 0, marginRight: 10 }]
              }}
              onDateChange={(date) => {
                console.log(date)
                this.setState({ dateTimePickerStart: date })
              }}
            />

          </View>

          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>
              Thời gian kết thúc </Text>

            <DatePicker
              style={{ width: '100%', marginTop: 10 }}
              date={this.state.dateTimePickerEnd}
              mode="datetime"
              placeholder="select date"
              format="DD-MM-YYYY h:mm a"
              minDate={Moment().format('DD-MM-YYYY')}
              maxDate="01-01-2020"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              is24Hour={true}
              customStyles={{
                dateInput: [styles.inputWrapper, { borderWidth: 0, marginRight: 10 }]
              }}
              onDateChange={(date) => {
                this.setState({ dateTimePickerEnd: date })
              }}
            />

          </View>


          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Giá </Text>
            <View style={[styles.inputWrapper, { flexDirection: 'row' }]}>
              <TextInput
                style={[styles.textInput, { width: '75%' }]}
                placeholderTextColor={grayColor}
                underlineColorAndroid="transparent"
                keyboardType='numeric'
                onChangeText={(price) => this.setState({ price: price })}
              />
              <Text>đồng</Text>

            </View>
          </View>

          <View style={styles.wrapper}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Địa điểm</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={grayColor}
                underlineColorAndroid="transparent"
                onChangeText={(text) => this.setState({ location: text })}
              />
            </View>
          </View>

          <View style={[styles.wrapper, {}]}>
            <Text style={[styles.textStyle, { fontSize: 18, fontWeight: '400', marginLeft: 10 }]}>Mô tả</Text>
            <View style={[styles.inputWrapper, { height: 110 }]}>
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
                onChangeText={(description) => this.setState({ description: description })}
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
              postCreateEvents(
                this.props.userInfo.username,
                this.state.eventTittle, 
                this.state.description,
                this.state.price, 
                this.state.location,
                this.state.dateTimePickerStart,
                this.state.dateTimePickerEnd,
                this.state.linkImageEvent,
                this.state.type
              ).then(resss => {
                if (resss) {
                  navigate(RouteKey.ProfileScreen, {})
                }
              })
            }}>
              <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '500', color: whiteColor }]}>Lưu</Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate(RouteKey.ProfileScreen, {})}
              style={[styles.button, { width: 100, backgroundColor: redColor }]}>
              <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '500', color: whiteColor }]}>Huỷ</Text>

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