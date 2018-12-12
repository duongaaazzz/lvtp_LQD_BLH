/**
 * Created by Duong Le on 9/8/18.
 */

import React from 'react';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';
import RouteKey from '../constants/routeKey';

import LoginContainer from '../components/login/LoginContainer'
import RegisterUserScreen from '../components/registerUser/RegisterUserContainer'
import VerificationContainer from '../components/verification/VerifyPhoneNumberScreen'
import HomeContainer from '../components/home/HomeContainer'
import HomeTabContainer from './HomeTabContainer'
import ProfileContainer from '../components/profile/ProfileContainer'
import NotifyContainer from '../components/notify/NotifyContainer'
import SearchContainer from '../components/search/SearchContainer'
import NowContainer from '../components/home/now/NowContainer'
import NearByContainer from '../components/home/nearby/NearByContainer'
import TypeContainer from '../components/home/type/TypeContainer'
import DetailsCardEvent from '../components/home/DetailsCardEvent'
import AuthenticationContainer from '../components/authentication/AuthenticationContainer'
import DetailsEventProfile from '../components/profile/DetailsCardEvent'
import CreateEvent from '../components/profile/CreateEventContainer'
import MainTabContainer from './MainTabContainer'
import EditUserInfor from '../components/profile/EditUserInforContainer'
import EditEvent from '../components/profile/EditEventContainer'


import CustomHomeTab from './CustomHomeTab'
import CustomMainTab from './CustomMainTab'
import ProfileSwitchContainer from './ProfileSwitchContainer'


export const HomeSwitch = createStackNavigator({
  HomeTab: {
    screen: HomeTabContainer
  },
  [RouteKey.DetailsCardEvent]: {
    screen: DetailsCardEvent
  },
  [RouteKey.DetailsEventProfile]: {
    screen: DetailsEventProfile
  },
  [RouteKey.EditEvent]: {
    screen: EditEvent
  }
}, {
  navigationOptions: {
    header: null
  }
})

export const ProfileSwitch = createStackNavigator({
  [RouteKey.ProfileScreen]: {
    screen: ProfileContainer
  },
  [RouteKey.DetailsEventProfile]: {
    screen: DetailsEventProfile
  },
  [RouteKey.CreateEvent]: {
    screen: CreateEvent
  },
  [RouteKey.EditUserInfor]: {
    screen: EditUserInfor
  },
  [RouteKey.EditEvent]: {
    screen: EditEvent
  },
  [RouteKey.DetailsCardEvent]: {
    screen: DetailsCardEvent
  },
}, {
  navigationOptions: {
    header: null
  }
})

export const HomeTab = createMaterialTopTabNavigator({
    [RouteKey.NowScreen]: {
      screen: NowContainer,
    },
    [RouteKey.NearByScreen]: {
      screen: NearByContainer,
    },
    [RouteKey.TypeScreen]: {
      screen: TypeContainer,
    }
  },
  {
    tabBarComponent: props => <CustomHomeTab {...props}/>,
    swipeEnabled: false,
    initialRouteName: RouteKey.NearByScreen,
    backBehavior: 'none',
    animationEnabled: false,
    lazy: true,
    tabBarOptions:
      {
        upperCaseLabel: false,
        inactiveTintColor: '#8e8e93',
        showLabel: true,
        showIcon: true,
        tabStyle:
          {
            backgroundColor: '#e9ebee',
          }
        ,
        style: {
          backgroundColor: '#e9ebee',
          height: 50
        }
        ,
        labelStyle: {
          fontSize: 12
        }
      }
  }
)

export const MainTab = createBottomTabNavigator({
  [RouteKey.HomeScreen]: {
    screen: HomeContainer
  },
  [RouteKey.SearchScreen]: {
    screen: SearchContainer
  },
  [RouteKey.NotifyScreen]: {
    screen: NotifyContainer
  },
  [RouteKey.ProfileScreen]: {
    screen: ProfileSwitchContainer
  },
}, {
  tabBarComponent: props => <CustomMainTab {...props}/>,


})

const loginStack = createStackNavigator({

  [RouteKey.RegisterUserScreen]: {
    screen: RegisterUserScreen,
    navigationOptions: {
      header: null
    }
  },
  [RouteKey.LoginScreen]: {
    screen: LoginContainer,
    navigationOptions: {
      header: null
    }
  },
  [RouteKey.VerificationContainer]: {
    screen: VerificationContainer
  },
}, {})

export const AppNavigator = createSwitchNavigator({
  // [RouteKey.DetailsCardEvent]: {
  //   screen: VerificationContainer
  // },
  [RouteKey.Authentication]: {
    screen: AuthenticationContainer,
  },
  LoginStack: {
    screen: loginStack
  },
  MainTab: {
    screen: MainTabContainer
  }
})


// AppNavigator.navigationOptions = ({navigation})=>{
//
// }