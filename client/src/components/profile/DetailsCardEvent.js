/**
 * Created by Duong Le on 9/15/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {
  Alert,
  View,
  Text, TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  Modal,
  FlatList
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RouteKey from '../../constants/routeKey'
import {
  backgroundColor,
  blackColor,
  blueColor,
  darkBlueColor, darkPinkColor,
  grayColor, lightBlueColor, pinkColor,
  redColor,
  skyColor, violetColor, whiteColor
} from '../../constants/color';
import Moment from 'moment';
import {commentEvent, deleteUserEvent, getUserList} from '../../utilities/ApiManager';
import NavigationServices from '../../navigation/NavigationServices';
import formatDayAgo from '../../utilities/formatDayAgo';

const {width, height} = Dimensions.get('window')

class DetailsCardEvent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      commentEvent: '',
      isShowButtonSendComment: true,
      listCommentEvent: props.navigation.state.params.detailCardEvent.comments,
      listUserInEvent: [],
      isShowListUserInEvent: false
    }
  }

  componentDidMount() {

    getUserList(this.props.navigation.state.params.detailCardEvent._id).then(resss => {
      if (resss.length > 0) {
        this.setState({
          listUserInEvent: resss
        })

        console.log('ddd', this.state.listUserInEvent)

      }
    })


  }

  renderTime() {
    const detailCardEvent = this.props.navigation.state.params.detailCardEvent;
    const dateStart = Moment(detailCardEvent.time_start).format('DD-MM')

    const month = dateStart.slice(3, 5)
    const day = dateStart.slice(0, 2)
    return <View style={{width: '25%', marginHorizontal: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={[styles.textStyle, {fontSize: 13, color: redColor}]}>Tháng {month}</Text>
      <Text style={[styles.textStyle, {fontSize: 44, marginTop: -10}]}>{day}</Text>
    </View>
  }


  sendCommentEvent() {
    const data = this.props.navigation.state.params.detailCardEvent
    commentEvent(data._id, this.state.commentEvent, this.props.userInfo.username).then(ress => {
      if (!!ress) {
        this.setState({
          listCommentEvent: ress.comments,
          commentEvent: ''
        })
      }
    })
  }

  renderInfoEvent(listColor, number, test, nameIcon) {

    const detailCardEvent = this.props.navigation.state.params.detailCardEvent;

    let rateE = 0

    detailCardEvent.rates.map(e => {
      rateE += e.rate
    })
    rateE = (rateE / detailCardEvent.rates.length) || 0


    return <TouchableOpacity disabled={nameIcon === 'star'}
                             onPress={() => this.setState({isShowListUserInEvent: true})}>
      <LinearGradient
        colors={listColor}
        start={{x: 0, y: 0}} end={{x: 1, y: 1}}
        style={[styles.infoEvent]}>

        <View style={{width: 30, height: 30, marginTop: 10, marginLeft: 10}}>
          <MaterialCommunityIcons name={nameIcon} size={30}
                                  color={whiteColor}/>
        </View>
        <View style={{flex: 0.8, marginBottom: 10}}>
          <Text
            style={[styles.textStyle, {
              fontSize: 38,
              color: whiteColor
            }]}> {nameIcon === 'star' ? rateE.toFixed(2) : number}</Text>
          <Text style={[styles.textStyle, {fontSize: 17, color: whiteColor, marginLeft: 7}]}> {test}</Text>
        </View>

      </LinearGradient>
    </TouchableOpacity>
  }

  render() {
    const detailCardEvent = this.props.navigation.state.params.detailCardEvent;

    console.log(detailCardEvent)
    return (<View style={{flex: 1}}>
        <ScrollView>
          <View style={{
            flex: 1,
          }}>
            <View style={{width: '100%', height: 210}}>
              <ImageBackground
                style={{
                  backgroundColor: grayColor,
                  flex: 1,
                }}
                source={{uri: detailCardEvent.avatar}}
                resizeMode={'cover'}/>
              <View style={{
                width: '100%',
                flex: 0.1,
                paddingTop: 150,
                justifyContent: 'flex-end',
                flexDirection: 'row',
                position: 'absolute'
              }}>
                <TouchableOpacity
                  onPress={() => {
                    NavigationServices.profileSwitchNavigate(RouteKey.EditEvent, {
                      detailCardEvent: detailCardEvent,
                      home: 'Profile'
                    })
                  }}
                  style={[styles.button, {width: 100, backgroundColor: 'gray'}]}>
                  <Text style={[styles.textStyle, {alignSelf: 'center', fontWeight: '500', color: whiteColor}]}>Cập
                    Nhật</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  Alert.alert('Cảnh báo', 'Bạn có chắc muốn xoá sự kiện này', [
                    {
                      text: 'Huỷ bỏ',
                      style: 'cancel'
                    },
                    {
                      text: 'Xác nhận',
                      onPress: () => deleteUserEvent(detailCardEvent._id).then(resss => {
                        if (resss) {
                          NavigationServices.profileSwitchNavigate(RouteKey.ProfileScreen, {})
                        }
                      }),
                      style: 'ok'
                    }
                  ]);
                }}
                                  style={[styles.button, {width: 100, backgroundColor: redColor}]}>
                  <Text style={[styles.textStyle, {alignSelf: 'center', fontWeight: '500', color: whiteColor}]}>Xóa
                    Event</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.wrapperTitle}>

              <View style={{width: '50%', marginLeft: 15}}>
                <Text
                  numberOfLines={4}
                  style={[styles.textStyle, {fontSize: 20,}]}>
                  {detailCardEvent.title}
                </Text>
                <View style={{borderWidth: 1, marginTop: 10, width: '90%',}}/>
              </View>

              {this.renderTime()}

            </View>

            <View style={styles.overview}>
              <Text style={[styles.textStyle, {fontSize: 20}]}>Tổng quan </Text>
            </View>

            <View style={[styles.body]}>
              {this.renderInfoEvent([blueColor, darkBlueColor], detailCardEvent.userlist.length, 'Người đăng ký', 'account-supervisor')}
              {this.renderInfoEvent([pinkColor, darkPinkColor], 1, 'Bình chọn', 'star')}
              {/*{this.renderInfoEvent([lightBlueColor, darkBlueColor], 17, 'Người chia sẻ', 'share')}*/}
            </View>

            <View style={{width: '90%',}}>

              <View style={[styles.viewInfo, {flexDirection: 'row', alignItems: 'flex-end', marginLeft: 30}]}>
                <Text style={[styles.textStyle, {fontWeight: '400', marginTop: 15,}]}>
                  Bình luận
                </Text>

                <View
                  style={{
                    borderBottomWidth: 1,
                    width: '70%',
                    marginBottom: 8,
                    marginHorizontal: 10,
                    color: blackColor
                  }}/>
              </View>

              <View style={{width: '80%', alignSelf: 'center', alignItems: 'center'}}>

                <View style={{
                  width: '90%',
                  height: 30,
                  borderRadius: 15,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: grayColor,
                  flexDirection: 'row',
                }}>

                  <TextInput
                    style={[styles.textInput, {
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      paddingLeft: 10,
                      height: 35,
                      textJustify: 'center'
                    }]}
                    autoCorrect={false}
                    value={this.state.commentEvent}
                    placeholder={'Viết bình luận... '}
                    maxLength={100}
                    multiline={false}
                    placeholderTextColor={grayColor}
                    underlineColorAndroid="transparent"
                    onChangeText={(commentEvent) => {

                      if (commentEvent.trim() !== '') {
                        this.setState({
                          commentEvent: commentEvent,
                          isShowButtonSendComment: true
                        })
                      } else {
                        this.setState({
                          commentEvent: commentEvent,
                          isShowButtonSendComment: false
                        })
                      }

                    }}
                  />

                  {
                    this.state.isShowButtonSendComment && <TouchableOpacity onPress={() => this.sendCommentEvent()}>
                      <View style={{width: 30, justifyContent: 'center', alignItems: 'center', marginLeft: -10}}>
                        <Ionicons name={'md-send'} size={24} color={blueColor}/>
                      </View>
                    </TouchableOpacity>

                  }

                </View>

                <View style={{marginVertical: 10, width: '100%'}}>
                  <FlatList
                    inverted={true}
                    data={this.state.listCommentEvent}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => <View style={{flexDirection: 'row', marginVertical: 5}}>
                      <View>
                        <Text style={[styles.textStyle, {}]}>{item.username}</Text>
                        <Text style={[styles.textStyle, {
                          fontWeight: '400',
                          fontSize: 10,
                          marginTop: -2,
                        }]}>{formatDayAgo(item.at)}</Text>
                      </View>
                      <Text style={[styles.textStyle, {marginLeft: 10, fontWeight: '400'}]}>{item.comment}</Text>
                    </View>}
                  />
                </View>

              </View>

            </View>

          </View>
        </ScrollView>
        <View style={{
          zIndex: 999,
          position: 'absolute',
          top: 20,
          left: 5,
        }}>
          <TouchableOpacity
            style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              this.props.navigation.goBack()
            }}>
            <Ionicons name={'ios-arrow-back'} size={34} color={blueColor}/>
          </TouchableOpacity>
        </View>

        <Modal
          onRequestClose={() => {

          }}
          visible={this.state.isShowListUserInEvent}
          transparent={true}
          style={{flex: 1}}
        >
          <TouchableWithoutFeedback onPress={() => this.setState({
            isShowListUserInEvent: false
          })}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.4)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

              <View style={{
                backgroundColor: '#fff',
                width: '80%',
                height: '70ß%',
                alignItems: 'center',
                borderRadius: 10
              }}>

                <Text style={[styles.textStyle, {marginVertical: 20, fontSize: 20}]}>Danh sách người tham gia</Text>

                <View style={{borderWidth: 1, borderBottomColor: grayColor, width: '100%', marginBottom: 5}}/>

                <FlatList
                  style={{flex: 1,}}
                  data={this.state.listUserInEvent}
                  renderItem={({item}) => <View
                    style={{
                      width: '90%',
                      height: 40,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 5
                    }}>

                    <Image
                      resizeMode='cover'
                      source={{uri: item.avatar || 'https://znews-photo-td.zadn.vn/w820/Uploaded/spuocaw/2018_08_06/spiritedawaystill4.jpg'}}
                      style={{width: 40, height: 40, borderRadius: 20}}/>

                    <Text style={[styles.textStyle, {width: '55%', marginLeft: 10}]}>{item.fullname}</Text>
                  </View>}
                  keyExtractor={(item, index) => index.toString()}/>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'SegoeUI',
    fontWeight: 'bold',
    color: blackColor
  },
  wrapperTitle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 100,
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  overview: {
    height: 30,
    width: '100%',
    marginLeft: 30,
  },
  body: {
    alignSelf: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
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
  infoEvent: {
    borderRadius: 10,
    marginVertical: 10,
    width: width * 0.41,
    height: width * 0.41,
    justifyContent: 'space-between'
  },
  textInput: {
    width: '90%',
  },
})

export default connect(state => ({
  userInfo: state.userInfo,
}), dispatch => ({}))(DetailsCardEvent);
