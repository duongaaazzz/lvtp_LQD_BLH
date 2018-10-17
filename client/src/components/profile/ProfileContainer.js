/**
 * Created by Duong Le on 9/8/18.
 */


import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {blackColor, blueColor, grayColor, redColor, whiteColor} from '../../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const tabSelectName = {
  signed: 'Signed',
  manage: 'Manage'
}

class ProfileContainer extends React.Component {

  constructor() {
    super();

    this.state = {
      tabSelect: tabSelectName.signed
    }

  }


  changeTabEvent(tabSelectName) {

    //change color
    if (tabSelectName !== this.state.tabSelect) {
      this.setState({tabSelect: tabSelectName})
    }
  }

  render() {


    const renderHeaderProfile = () => <View style={{width: '100%', backgroundColor: 'white'}}>
      <View
        style={{
          width: '100%',
          height: 110,
          // backgroundColor: 'gray',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>

        <View/>

        <View style={{width: 62, height: 62, backgroundColor: 'gray', borderRadius: 31}}/>

        <View>
          <Text style={[styles.textStyle, {fontSize: 21, fontWeight: 'bold',}]}>Bui Thi Khanh Nhu</Text>
          <Text style={[styles.textStyle, {fontSize: 16, fontWeight: '400',}]}>@biuthikhanhnhu</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name={'md-settings'} size={23} color={grayColor}/>
        </TouchableOpacity>

        <View/>


      </View>

      <View style={{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>

        <TouchableOpacity onPress={() => {
          this.changeTabEvent(tabSelectName.signed)
        }}>
          <View
            style={[styles.btnEvent, {
              borderColor: this.state.tabSelect === tabSelectName.signed ? whiteColor : redColor,
              backgroundColor: this.state.tabSelect === tabSelectName.signed ? redColor : whiteColor
            }]}>
            <MaterialCommunityIcons name={'fire'} size={23}
                                    color={this.state.tabSelect === tabSelectName.signed ? whiteColor : redColor}/>
            <Text style={[styles.textStyle, {
              fontSize: 15,
              color: this.state.tabSelect === tabSelectName.signed ? whiteColor : redColor,
              fontWeight: '500'
            }]}>
              Signed Events
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          this.changeTabEvent(tabSelectName.manage)
        }}>
          <View
            style={[styles.btnEvent, {
              borderColor: this.state.tabSelect === tabSelectName.manage ? whiteColor : blueColor,
              backgroundColor: this.state.tabSelect === tabSelectName.manage ? blueColor : whiteColor
            }]}>
            <MaterialCommunityIcons name={'view-grid'} size={23}
                                    color={this.state.tabSelect === tabSelectName.manage ? whiteColor : blueColor}/>
            <Text style={[styles.textStyle, {
              fontSize: 15,
              color: this.state.tabSelect === tabSelectName.manage ? whiteColor : blueColor,
              fontWeight: '500'
            }]}>
              Manage Events
            </Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>


    return (
      <View style={{flex: 1}}>

        {renderHeaderProfile()}

      </View>
    )
  }
}

export default connect(state => ({}), dispatch => ({}))(ProfileContainer);


const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'SegoeUI',

    color: blackColor
  },
  btnEvent: {
    borderWidth: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: 160,
    height: 36,
    borderRadius: 18,
    justifyContent: 'space-around',
    alignItems: 'center',

  }
})