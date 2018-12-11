/**
 * Created by Duong Le on 9/8/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native'

import ItemCardEvent from './ItemCardEvent'
import {backgroundColor, blueColor} from '../../../constants/color';
import {getEvent} from '../../../utilities/ApiManager';
import {GET_EVENT_USER} from '../../../actions/user';

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
    this.props.currentUserEvent.map(event => {
      event.type.map(t => {
        let indexT = this.state.listTypeEvent.findIndex(x => x === t)

        if (indexT === -1) {

          this.setState({
            listTypeEvent:this.state.listTypeEvent.push(t)
          })

        }
      })
    })

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

  render() {
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

          <View>

            {/*<FlatList renderItem={<View style={{width: 50}}></View>} data={} initialNumToRender={} keyExtractor={}*/}
                      {/*numColumns={} getItem={}*/}
                      {/*getItemCount={} disableVirtualization={} maxToRenderPerBatch={} updateCellsBatchingPeriod={}*/}
                      {/*windowSize={}/>*/}

          </View>

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

export default connect(state => ({
  currentUserEvent: state.userInfo.currentUserEvent
}), dispatch => ({
  getEvent: (currentUserEvent) => dispatch({type: GET_EVENT_USER, currentUserEvent})
}))(TypeContainer);
