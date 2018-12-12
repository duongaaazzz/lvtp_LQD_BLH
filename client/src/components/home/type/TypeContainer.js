/**
 * Created by Duong Le on 9/8/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native'

import ItemCardEvent from './ItemCardEvent'
import {backgroundColor, blackColor, blueColor, whiteColor} from '../../../constants/color';
import {getEvent} from '../../../utilities/ApiManager';
import {GET_EVENT_USER} from '../../../actions/user';
import randomColor from "randomcolor";

class TypeContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      currentUserEvent: props.currentUserEvent,
      listTypeEvent: []
    }

  }

  componentDidMount(): void {
    let tttttt = []
    this.props.currentUserEvent.map(event => {
      event.type.map(t => {
        let indexT = this.state.listTypeEvent.findIndex(x => x === t)
        console.log('dsds', t)

        if (indexT === -1) {

          tttttt.push(t)

        }
      })
    })
    this.setState({
      listTypeEvent: tttttt
    })
    console.log('dsds', this.state.listTypeEvent)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentUserEvent !== nextProps.currentUserEvent) {
      this.setState({
        currentUserEvent: nextProps.currentUserEvent
      })
    }
  }

  onRefresh() {
    this.setState({isFetching: true}, function () {

      getEvent().then(ress => {
        if (ress) {
          this.props.getEvent(ress.events || [])
          this.setState({isFetching: false})
        }
      });

    });

  }

  renderHashtag(type) {

    let hashtagView = []

    console.log('as', type)
    for (let i = 0; i < type.length; i++) {

      hashtagView.push(
        <TouchableOpacity>
          <View style={{
            marginHorizontal: 2,
            backgroundColor: randomColor({seed: type[i]}),
            height: 30,
            width: 60,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
            // flexDirection: 'row',

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

  render() {
    console.log('dsds', this.state)

    return (
      !this.state.currentUserEvent ?
        <ActivityIndicator size='large' color={blueColor}
                           style={{
                             flex: 1,
                             justifyContent: 'center',
                             alignItems: 'center'
                           }}/>
        :
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundColor}}>

          <View style={{elevation: 0}}>
            <FlatList
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.currentUserEvent}
              renderItem={({item}) => <ItemCardEvent data={item}/>}
            />
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
  }
})

export default connect(state => ({
  currentUserEvent: state.userInfo.currentUserEvent
}), dispatch => ({
  getEvent: (currentUserEvent) => dispatch({type: GET_EVENT_USER, currentUserEvent})
}))(TypeContainer);
