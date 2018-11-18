/**
 * Created by Duong Le on 9/15/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {HeaderBackButton} from 'react-navigation';
import {View, Text, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, TextInput, FlatList} from 'react-native'
import NavigationServices from '../../navigation/NavigationServices'

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RouteKey from '../../constants/routeKey'
import {blackColor, blueColor, grayColor, whiteColor} from '../../constants/color';
import Moment from 'moment/moment';
import {commentEvent, handleUserEvent} from '../../utilities/ApiManager';
import randomColor from 'randomcolor';
import formatDayAgo from '../../utilities/formatDayAgo';

//const { navigation } = this.props;
class DetailsCardEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sign: false,
      isShowButtonSendComment: false,
      commentEvent: '',
      listCommentEvent: props.navigation.state.params.data.comments
    }
  }

  componentWillMount() {
    console.log('this.props.navigation', this.props.navigation.state.params)
    console.log('this.props.navigation', this.props.userInfo)

    const {userlist} = this.props.navigation.state.params.data

    let indexOf = userlist.findIndex(i => i === this.props.userInfo._id)

    if (indexOf > -1) {
      this.setState({
        sign: true,
      })
    }

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.navigation.state.params !== nextProps.navigation.state.params) {

    }
  }

  joinEvent() {


    handleUserEvent(this.props.navigation.getParam('data', 'NO-ID')._id).then(data => {
        if (data.message === 'Signed')
          this.setState({sign: true})
        else {
          this.setState({sign: false})
        }
      }
    )
  }


  renderHashtag(type) {

    let hashtagView = []

    // console.log('as', this.state.type)
    for (let i = 0; i < type.length; i++) {

      hashtagView.push(
        <TouchableOpacity>
          <View style={{
            marginHorizontal: 2,
            backgroundColor: randomColor({seed: type[i]}),
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
            flexDirection: 'row',

          }}>
            <Text style={[styles.textStyle, {
              color: whiteColor,
              borderRadius: 5,
              fontSize: 11,
              paddingHorizontal: 15
            }]}>{type[i]}</Text>

          </View>
        </TouchableOpacity>
      )
    }
    return hashtagView

  }

  sendCommentEvent() {
    const data = this.props.navigation.getParam('data', 'NO-ID')
    commentEvent(data._id, this.state.commentEvent, this.props.userInfo.username).then(ress => {
      if (!!ress) {
        this.setState({
          listCommentEvent: ress.comments,
          commentEvent: ''
        })
      }
    })
  }

  render() {
    const {navigate} = this.props.navigation
    const data = this.props.navigation.getParam('data', 'NO-ID')
    // let index = data.userlist.findIndex(i => i == this.props.userInfo._id)
    // console.log('sign: ', this.state.sign)
    // if(index < 0){
    //   this.setState({sign:'Đăng Ký'})
    //   console.log('sign: ', this.state.sign)
    // } else {
    //   this.setState({sign: 'Hủy Đăng Ký'})
    //   console.log('sign: ', this.state.sign);
    // }
    // console.log('index: ', index)

    return (<View style={{flex: 1}}>
        <ScrollView>
          <View style={{
            flex: 1,
            // justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
            <View style={{width: '100%', height: 210}}>
              <ImageBackground
                style={{
                  flex: 1,
                }}
                source={{uri: data.avatar}}
                resizeMode={'cover'}>

                <View
                  style={{width: 200, height: 30, backgroundColor: 'red', position: 'absolute', bottom: 0, right: 0}}>

                </View>

              </ImageBackground>
            </View>

            <View style={{
              height: 70,
              width: '100%',
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 5
            }}>

              <View style={styles.tittleEvent}>
                <Text style={[styles.textStyle, {fontSize: 24, marginLeft: 15}]}>
                  {data.title}
                </Text>
              </View>


              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10
              }}>
                <TouchableOpacity onPress={() => {
                  this.joinEvent()
                }}>
                  <View style={{
                    backgroundColor: this.state.sign ? 'blue' : 'red',
                    height: 38,
                    width: 120,
                    borderRadius: 19,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={[styles.textStyle, {
                      fontSize: 17,
                      color: '#ffffff'
                    }]}>
                      {this.state.sign ? 'Huỷ đăng ký' : 'Đăng ký'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>

            <View style={styles.viewInfo}>
              <Text style={[styles.textStyle, {fontWeight: '400'}]}> by </Text>
              <Text style={[styles.textStyle, {fontSize: 15}]}>
                {data.created_by}
              </Text>
            </View>

            <View style={styles.viewInfo}>
              <View style={{height: 25, width: 20, alignItems: 'center', justifyContent: 'flex-end'}}>
                <Ionicons name='md-time' size={19} color={blackColor}/>
              </View>
              <Text style={[styles.textStyle, {fontSize: 15, marginLeft: 3, fontWeight: '400'}]}>
                {Moment(data.time_start).format('D MMM YYYY')}
              </Text>
            </View>

            <View style={styles.viewInfo}>
              <View style={{height: 25, width: 20, alignItems: 'center', justifyContent: 'center'}}>
                <MaterialIcons name='location-on' size={20} color={blackColor}/>
              </View>
              <Text style={[styles.textStyle, {fontSize: 15, marginLeft: 3, fontWeight: '400'}]}>
                {data.location}
              </Text>
            </View>

            <View style={styles.viewInfo}>
              <View style={{height: 25, width: 20, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <MaterialCommunityIcons name='ticket-confirmation' size={19} color={blackColor}/>
              </View>
              <Text style={[styles.textStyle, {fontSize: 15, marginLeft: 3, fontWeight: '400'}]}>
                {data.price}
              </Text>
            </View>


            <View style={{flexDirection: 'row', paddingLeft: 15}}>
              {this.renderHashtag(data.type)}
            </View>

            <View style={[styles.viewInfo, {flexDirection: 'row', alignItems: 'flex-end'}]}>
              <Text style={[styles.textStyle, {fontWeight: '400', marginTop: 15,}]}>
                Description
              </Text>

              <View
                style={{borderBottomWidth: 1, width: '70%', marginBottom: 8, marginHorizontal: 10, color: blackColor}}/>
            </View>

            <View style={[styles.viewInfo, {width: '90%', marginTop: 10}]}>
              <Text style={[styles.textStyle, {fontWeight: '400', fontSize: 13}]}>
                {data.description}
              </Text>
            </View>

            <View style={[styles.viewInfo, {flexDirection: 'row', alignItems: 'flex-end'}]}>
              <Text style={[styles.textStyle, {fontWeight: '400', marginTop: 15,}]}>
                Bình luận
              </Text>

              <View
                style={{borderBottomWidth: 1, width: '70%', marginBottom: 8, marginHorizontal: 10, color: blackColor}}/>
            </View>

            <View style={{width: '80%', alignSelf: 'center', alignItems: 'center'}}>

              <View style={{
                width: '90%',
                height: 30,
                borderRadius: 15,
                marginTop: 10,
                borderWidth: 1,
                borderColor: grayColor,
                flexDirection: 'row'
              }}>

                <TextInput
                  style={[styles.textInput, {
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingLeft: 10
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
        </ScrollView>

        <View style={{
          zIndex: 999,
          position: 'absolute',
          top: 20,
          left: 5,
        }}>

          <TouchableOpacity
            style={{height: 40, width: 40, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => navigate('HomeTab', {name: 'Brent'})}>
            <Ionicons name={'ios-arrow-back'} size={34} color={blueColor}/>
          </TouchableOpacity>
        </View>

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
  viewInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  tittleEvent: {
    width: '55%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  textInput: {
    width: '90%',
  },
})

export default connect(state => ({
  userInfo: state.userInfo,
}), dispatch => ({}))(DetailsCardEvent);
