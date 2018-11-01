/**
 * Created by Duong Le on 10/31/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, ImageBackground, ActivityIndicator} from 'react-native'
import {blueColor} from '../../constants/color';


export default class ItemImagePostEvent extends React.Component {

  constructor() {
    super()

    this.state = {
      isUploadImageSuccess: false
    }
  }

  componentDidMount() {

  }

  render() {

    console.log('image info', this.props.imageInfo)
    return (
      <View style={{width: 110, height: 110, backgroundColor: 'gray', margin: 5}}>
        <ImageBackground
          source={{uri: this.props.imageInfo.sourceURL}}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          {
            !this.state.isUploadImageSuccess && <ActivityIndicator size={'large'} color={blueColor}/>
          }
        </ImageBackground>
      </View>
    )
  }
}

