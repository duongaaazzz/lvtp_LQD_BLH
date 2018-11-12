/**
 * Created by Duong Le on 10/31/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Platform, ImageBackground, ActivityIndicator} from 'react-native'
import {blueColor} from '../../constants/color';
import {upLoadImageFirebase} from '../../constants/firebaseHelper';


export default class ItemImagePostEvent extends React.Component {

  constructor() {
    super()

    this.state = {
      isUploadImageSuccess: false
    }
  }

  componentDidMount() {

    this.perUploafImage()

  }


  perUploafImage() {
    const {nameEvent, imageInfo} = this.props

    if (this.props.imageInfo.sourceURL === undefined && this.props.imageInfo.path === undefined) {
      this.setState({isUploadImageSuccess: true})
    } else {
      this.setState({isUploadImageSuccess: false})
      setTimeout(() => {
        upLoadImageFirebase(nameEvent, Platform.OS === 'ios' ? imageInfo.sourceURL : imageInfo.path, imageInfo.mime).then(data => {
          if (!!data) {
            this.setState({isUploadImageSuccess: true})
            this.props.upLoadImageEventSuccess(data)
          }
        })
      }, 1000)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageInfo != this.props.imageInfo) {
      this.perUploafImage()
    }
  }

  render() {

    console.log('image info', this.props.imageInfo)
    return (
      <View style={{width: 110, height: 110, backgroundColor: 'gray', margin: 5}}>
        <ImageBackground
          source={{uri: Platform.OS === 'ios' ? this.props.imageInfo.sourceURL : this.props.imageInfo.path || this.props.imageInfo}}
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

