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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import RouteKey from '../../constants/routeKey'
import {blackColor, blueColor, grayColor, redColor, skyColor, whiteColor, yellowColor} from '../../constants/color';
import Moment from 'moment/moment';
import {commentEvent, handleUserEvent, rateEvent} from '../../utilities/ApiManager';
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
      listCommentEvent: props.navigation.state.params.data.comments,
      userStartEvent: [-1, -1, -1, -1, -1],
      isRating: false,
      listRateEvent: props.navigation.state.params.data.rates
    }
  }

  componentDidMount() {

    let indexRate = this.props.navigation.state.params.data.rates.findIndex(e => e.username === this.props.userInfo.username)


    if (indexRate > -1) {

      let rateE = this.props.navigation.state.params.data.rates[indexRate].rate

      let start = [-1, -1, -1, -1, -1];

      if (rateE >= 1) start[0] = 1

      if (rateE >= 2) start[1] = 1

      if (rateE >= 3) start[2] = 1

      if (rateE >= 4) start[3] = 1

      if (rateE >= 5) start[4] = 1

      this.setState({
        userStartEvent: start,
      })

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

  renderRateEvent(listEvent) {

    let start = [-1, -1, -1, -1, -1]

    let rateE = 0

    listEvent.map(e => {
      rateE += e.rate
    })
    rateE = (rateE / listEvent.length)

    if (rateE >= 0.5) start[0]++
    if (rateE >= 1) start[0]++

    if (rateE >= 1.5) start[1]++
    if (rateE >= 2) start[1]++

    if (rateE >= 2.5) start[2]++
    if (rateE >= 3) start[2]++

    if (rateE >= 3.5) start[3]++
    if (rateE >= 4) start[3]++

    if (rateE >= 4.5) start[4]++
    if (rateE >= 5) start[4]++

    return <View
      style={{
        width: 100,
        position: 'absolute',
        bottom: 5,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',

      }}>

      <Text style={[styles.textStyle, {fontSize: 30, color: whiteColor}]}>
        {!!rateE ? rateE.toFixed(2) : '0.00'}
      </Text>

      <View style={{flexDirection: 'row', marginTop: -2}}>
        <FontAwesome name={start[0] === -1 ? 'star-o' : start[0] === 0 ? 'star-half-empty' : 'star'} size={10}
                     color={yellowColor}
                     style={{marginHorizontal: 1}}/>
        <FontAwesome name={start[1] === -1 ? 'star-o' : start[1] === 0 ? 'star-half-empty' : 'star'} size={10}
                     color={yellowColor}
                     style={{marginHorizontal: 1}}/>

        <FontAwesome name={start[2] === -1 ? 'star-o' : start[2] === 0 ? 'star-half-empty' : 'star'} size={10}
                     color={yellowColor}
                     style={{marginHorizontal: 1}}/>

        <FontAwesome name={start[3] === -1 ? 'star-o' : start[3] === 0 ? 'star-half-empty' : 'star'} size={10}
                     color={yellowColor}
                     style={{marginHorizontal: 1}}/>

        <FontAwesome name={start[4] === -1 ? 'star-o' : start[4] === 0 ? 'star-half-empty' : 'star'} size={10}
                     color={yellowColor}
                     style={{marginHorizontal: 1}}/>


      </View>

    </View>
  }

  sendRateEvent(rateE) {
    let start = [-1, -1, -1, -1, -1]


    if (rateE >= 1) start[0] = 1

    if (rateE >= 2) start[1] = 1

    if (rateE >= 3) start[2] = 1

    if (rateE >= 4) start[3] = 1

    if (rateE >= 5) start[4] = 1

    this.setState({
      userStartEvent: start,
      isRating: true
    })

    rateEvent(this.props.navigation.state.params.data._id, rateE, this.props.userInfo.username).then(data => {

      console.log(data)

      this.setState({
        isRating: false,
        listRateEvent: data.rates
      })
    })

    console.log(start)
  }

  renderYouRate() {


    return <View style={{width: '100%', marginTop: 10}}>
      <View style={[styles.viewInfo, {flexDirection: 'row', alignItems: 'flex-end', marginLeft: 0}]}>
        <Text style={[styles.textStyle, {fontWeight: '400', marginTop: 15,}]}>
          Nhấn bình để bình chọn
        </Text>
        <View
          style={{borderBottomWidth: 1, width: '45%', marginBottom: 8, marginHorizontal: 10, color: blackColor}}/>
      </View>

      <View style={{flexDirection: 'row', marginTop: 15, marginLeft: 30}}>

        <TouchableOpacity disabled={this.state.isRating} onPress={() => this.sendRateEvent(1)}>
          <FontAwesome
            name={this.state.userStartEvent[0] === -1 ? 'star-o' : this.state.userStartEvent[0] === 0 ? 'star-half-empty' : 'star'}
            size={35}
            color={grayColor}
            style={{marginHorizontal: 5}}/>
        </TouchableOpacity>

        <TouchableOpacity disabled={this.state.isRating} onPress={() => this.sendRateEvent(2)}>
          <FontAwesome
            name={this.state.userStartEvent[1] === -1 ? 'star-o' : this.state.userStartEvent[1] === 0 ? 'star-half-empty' : 'star'}
            size={35}
            color={grayColor}
            style={{marginHorizontal: 5}}/>
        </TouchableOpacity>

        <TouchableOpacity disabled={this.state.isRating} onPress={() => this.sendRateEvent(3)}>
          <FontAwesome
            name={this.state.userStartEvent[2] === -1 ? 'star-o' : this.state.userStartEvent[2] === 0 ? 'star-half-empty' : 'star'}
            size={35}
            color={grayColor}
            style={{marginHorizontal: 5}}/>
        </TouchableOpacity>

        <TouchableOpacity disabled={this.state.isRating} onPress={() => this.sendRateEvent(4)}>
          <FontAwesome
            name={this.state.userStartEvent[3] === -1 ? 'star-o' : this.state.userStartEvent[3] === 0 ? 'star-half-empty' : 'star'}
            size={35}
            color={grayColor}
            style={{marginHorizontal: 5}}/>
        </TouchableOpacity>

        <TouchableOpacity disabled={this.state.isRating} onPress={() => this.sendRateEvent(5)}>
          <FontAwesome
            name={this.state.userStartEvent[4] === -1 ? 'star-o' : this.state.userStartEvent[4] === 0 ? 'star-half-empty' : 'star'}
            size={35}
            color={grayColor}
            style={{marginHorizontal: 5}}/>
        </TouchableOpacity>


      </View>
    </View>
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
            <View style={{width: '100%', height: 210, backgroundColor: grayColor}}>
              <ImageBackground
                style={{
                  flex: 1,
                }}
                source={{uri: data.avatar}}
                resizeMode={'cover'}>

                {this.renderRateEvent(this.state.listRateEvent)}

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
                    backgroundColor: this.state.sign ? grayColor : blueColor,
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
              <Text numberOfLines={2}
                    style={[styles.textStyle, {fontSize: 15, marginLeft: 3, fontWeight: '400', width: '90%'}]}>
                {data.location}
              </Text>
            </View>

            <View style={styles.viewInfo}>
              <View style={{height: 25, width: 20, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <MaterialCommunityIcons name='ticket-confirmation' size={19} color={blackColor}/>
              </View>
              <Text style={[styles.textStyle, {fontSize: 15, marginLeft: 3, fontWeight: '400'}]}>
                {data.price === 0 ? 'Miển phí' : data.price + ' đồng'}
              </Text>
            </View>


            <View style={{flexDirection: 'row', paddingLeft: 15}}>
              {this.renderHashtag(data.type)}
            </View>

            <View style={[styles.viewInfo, {flexDirection: 'row', alignItems: 'flex-end'}]}>
              <Text style={[styles.textStyle, {fontWeight: '400', marginTop: 15,}]}>
                Mô tả sự kiện
              </Text>

              <View
                style={{borderBottomWidth: 1, width: '70%', marginBottom: 8, marginHorizontal: 10, color: blackColor}}/>
            </View>

            <View style={[styles.viewInfo, {width: '90%', marginTop: 10}]}>
              <Text style={[styles.textStyle, {fontWeight: '400', fontSize: 13}]}>
                {data.description}
              </Text>
            </View>

            {this.renderYouRate()}

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
                    height: 30,
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
