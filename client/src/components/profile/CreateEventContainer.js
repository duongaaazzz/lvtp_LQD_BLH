/**
 * Created by Duong Le on 10/20/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet, FlatList} from 'react-native'
import {backgroundColor, blackColor, blueColor, grayColor, redColor, whiteColor} from '../../constants/color';
import ImagePicker from 'react-native-image-crop-picker';
import RouteKey from '../../constants/routeKey'
import DatePicker from 'react-native-datepicker'
import Moment from 'moment';
import {postCreateEvents} from '../../utilities/ApiManager';

import ItemImagePostEvent from './ItemImagePostEvent'
import Ionicons from 'react-native-vector-icons/Ionicons';
import randomColor from 'randomcolor';


class CreateEventContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isDateTimePickerVisible: false,
      dateTimePickerStart: Moment().format('YYYY-MM-DD'),
      dateTimePickerEnd: Moment().format('YYYY-MM-DD'),
      eventTittle: '',
      description: '',
      price: 0,
      location: '',
      linkImageEvent: '',
      listImagePostEvent: '',
      type: [],
      eventInput: ''
    }
    this.isDateTimePickerEnd = false
    this.taggggg = ''

  }

  componentWillMount() {

  }

  upLoadImageEventSuccess = (linkImage) => {
   this.setState({linkImageEvent: linkImage})
  }

  renderHashtag() {

    let hashtagView = []

    // console.log('as', this.state.type)
    for (let i = 0; i < this.state.type.length; i++) {

      hashtagView.push(
        <TouchableOpacity onPress={() => {
          let listHashtag = this.state.type.filter(tag => {
            if (tag !== this.state.type[i]) {
              return tag
            }
          })

          this.setState({
            type: listHashtag
          })
        }}>
          <View style={{
            marginHorizontal: 5,
            backgroundColor: randomColor({seed: this.state.type[i]}),
            height: 30,
            borderRadius: 15,
            paddingHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
            flexDirection: 'row'
          }}>
            <Text style={[styles.textStyle, {
              color: whiteColor,
              borderRadius: 5,
              fontSize: 11
            }]}>{this.state.type[i]}</Text>

            <Ionicons name={'ios-close-circle-outline'} size={20} color={whiteColor}/>

          </View>
        </TouchableOpacity>
      )
    }
    return hashtagView

  }

  render() {

    console.log('sdasdsa', this.state.type)
    const {navigate} = this.props.navigation;

    return (<View style={{flex: 1, backgroundColor: backgroundColor}}>

        <View style={{
          width: '100%',
          height: 70,
          backgroundColor: blueColor,
          justifyContent: 'center',
          alignItems: 'center',

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

              <DatePicker
                style={{width: '100%', marginTop: 10}}
                date={this.state.dateTimePickerStart}
                mode="datetime"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={Moment().format('YYYY-MM-DD')}
                maxDate="2020-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour={true}
                customStyles={{
                  dateInput: [styles.inputWrapper, {borderWidth: 0, marginRight: 10}]
                }}
                onDateChange={(date) => {
                  console.log(date)
                  this.setState({dateTimePickerStart: date})
                }}
              />

            </View>

            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>
                Thời gian kết thúc </Text>

              <DatePicker
                style={{width: '100%', marginTop: 10}}
                date={this.state.dateTimePickerEnd}
                mode="datetime"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={Moment().format('YYYY-MM-DD')}
                maxDate="2020-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                is24Hour={true}
                customStyles={{
                  dateInput: [styles.inputWrapper, {borderWidth: 0, marginRight: 10}]
                }}
                onDateChange={(date) => {
                  this.setState({dateTimePickerEnd: date})
                }}
              />

            </View>


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
                  onChangeText={(text) => this.setState({location: text})}
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
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Loại sự kiện</Text>
              <View style={[styles.inputWrapper, {flexDirection: 'row', paddingLeft: 15}]}>

                <TextInput
                  value={this.state.eventInput}
                  autoCorrect={false}
                  style={{flex: 1}}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => {
                    if (text.includes(' ')) {

                      let indexOf = this.state.type.findIndex(i => i === '#' + this.state.eventInput + ' ')

                      if (indexOf === -1) {
                        this.setState({
                          type: [...this.state.type, '#' + this.state.eventInput + ' '],
                          eventInput: ''
                        })
                      } else {
                        this.setState({
                          eventInput: ''
                        })
                      }

                    } else {

                      this.setState({
                        eventInput: text
                      })
                    }

                  }}
                />
              </View>

              <View style={[styles.wrapperTitle, {flexDirection: 'row', flexWrap: 'wrap', marginRight: 5}]}>
                {this.renderHashtag()}
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
                  // console.log(images)
                  this.setState({
                    listImagePostEvent: images
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
                var type = ''
                this.state.type.forEach((value => {
                  value = value.trim()
                  type = type + value + '|'
                }))

                type = type.substring(0, type.length - 1)

                console.log(type)
                postCreateEvents(
                  this.props.userInfo.username,
                  this.state.eventTittle,
                  this.state.description,
                  this.state.price,
                  this.state.location,
                  this.state.dateTimePickerStart,
                  this.state.dateTimePickerEnd,
                  this.state.linkImageEvent,
                  type
                ).then(resss => {
                  if (resss) {
                    navigate(RouteKey.ProfileScreen, {createEvent: true})
                  }
                })
              }}>
                <Text style={[styles.textStyle, {alignSelf: 'center', fontWeight: '500', color: whiteColor}]}>Lưu</Text>

              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate(RouteKey.ProfileScreen, {createEvent: true})}
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