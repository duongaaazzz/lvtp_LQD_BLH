/**
 * Created by Duong Le on 9/8/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import {backgroundColor, blackColor, blueColor, grayColor, greenColor} from '../../constants/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ItemSearch from './ItemSearch'

class SearchContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      dataSearch: props.currentUserEvent,
      currentUserEvent: props.currentUserEvent,
      isSearch: false,
      isMusicTypeFilter: false,
      isNearbySortFilter: false
    }
  }

  onChangeText = text => {
    let context = this;
    clearTimeout(this.inputTextTimeOut);
    if (!!text) {
      this.inputTextTimeOut = setTimeout(function () {
        //Searching...
        context.setState({isSearch: true});
        let dataSearch = [];


        dataSearch = context.state.currentUserEvent.filter(i => {
          if (
            i.title.toUpperCase().includes(context.state.keySearch) ||
            i.title.includes(context.state.keySearch)
          )
            return i;
        });

        context.setState({
          dataSearch: dataSearch
        });

      }, 1000);
    }

    if (!text) {
      this.cancelSearch();
    } else {
      this.setState({keySearch: text, showButtonClose: true});
    }
  };

  cancelSearch = () => {
    this.setState({
      dataSearch: this.props.currentUserEvent,
      currentUserEvent: this.props.currentUserEvent,
      keySearch: '',
      isSearch: false
    });
  };


  renderFilter = (filterName, filterType, styleFiller, func) => <TouchableOpacity onPress={() => {

    if (filterName === 'Music') {
      let dataFilter = []
      if (this.state.isMusicTypeFilter) {
        dataFilter = this.state.currentUserEvent
      } else {
        dataFilter = this.state.currentUserEvent.filter(i => {
          let index = i.type.findIndex(iii => iii.toLowerCase().includes('music'))

          if (index > -1) {
            return i[index]
          }
        })
      }

      this.setState({
        isMusicTypeFilter: !this.state.isMusicTypeFilter,
        dataSearch: dataFilter
      })
    } else {
      this.setState({isNearbySortFilter: !this.state.isNearbySortFilter})
    }

  }}>
    <View style={[styles.buttonFilter, (filterName === 'Music' && this.state.isMusicTypeFilter)
    || (filterName === 'Nearby' && this.state.isNearbySortFilter) ? styleFiller : {backgroundColor: grayColor}
    ]}>
      <Text style={[styles.textStyle, {color: '#ffffff'}]}>
        {filterType + ': ' + filterName}
      </Text>
    </View>
  </TouchableOpacity>

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.searchTool}>
          <TextInput
            style={[styles.textInput, styles.textStyle, {fontSize: 16, color: grayColor}]}
            placeholder={'Search event'}
            onChangeText={text => {
              this.onChangeText(text);
            }}
          />

          <FontAwesome
            name={'search'}
            size={27}
            color={grayColor}
            style={{marginRight: 25}}
          />

        </View>

        <View
          style={{
            height: 60,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          {this.renderFilter('Music', 'Type', {backgroundColor: blueColor})}
          {this.renderFilter('Nearby', 'Sort', {backgroundColor: greenColor})}
        </View>


        <ScrollView style={{borderRadius: 10}}>

          <View style={styles.bodyContent}>
            <FlatList
              data={this.state.dataSearch}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => <ItemSearch infoEvent={item}/>}
            />
          </View>
        </ScrollView>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center'
  },
  bodyContent: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    paddingBottom: 5,
    backgroundColor: '#ffff'
  },
  textInput: {
    marginLeft: 25,
    width: '80%',
  },
  searchTool: {
    marginTop: 20,
    height: 50,
    borderRadius: 25,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  buttonFilter: {
    marginRight: 10,
    height: 40,
    width: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  textStyle: {
    fontFamily: 'SegoeUI',
    fontWeight: 'bold',
    color: blackColor
  },
})


export default connect(state => ({
  currentUserEvent: state.userInfo.currentUserEvent
}), dispatch => ({}))(SearchContainer);
