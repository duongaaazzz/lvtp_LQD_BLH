/**
 * Created by Duong Le on 10/20/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet} from 'react-native'
import {backgroundColor, blackColor, blueColor, grayColor, whiteColor} from '../../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RouteKey from '../../constants/routeKey'


class CreateEventContainer extends React.Component {

  constructor() {
    super();

    this.state = {
      data: []
    }
  }

  componentWillMount() {

  }

  open

  render() {
    const {navigate} = this.props.navigation;

    return (<View style={{flex: 1}}>

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
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Tên event</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => this.setState({numberPhone: text})}
                />
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={[styles.textStyle, {fontSize: 18, fontWeight: '400', marginLeft: 10}]}>Giá </Text>
              <View style={[styles.inputWrapper,{flexDirection:'row'}]}>
                <TextInput
                  style={[styles.textInput,{width:'75%'}]}
                  placeholderTextColor={grayColor}
                  underlineColorAndroid="transparent"
                  keyboardType='numeric'
                  onChangeText={(text) => this.setState({numberPhone: text})}
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
                  onChangeText={(text) => this.setState({numberPhone: text})}
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
                  onChangeText={(text) => this.setState({numberPhone: text})}
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
            onPress={() => navigate(RouteKey.ProfileScreen, {})}>
            <Ionicons name={'ios-arrow-back'} size={34} color={whiteColor}/>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default connect(state => ({}), dispatch => ({}))(CreateEventContainer);

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'SegoeUI',
    color: blackColor
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
    backgroundColor: whiteColor
  },
  wrapper: {
    width: '80%', marginVertical: 5
  }
})