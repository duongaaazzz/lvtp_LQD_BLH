/**
 * Created by Duong Le on 9/8/18.
 */


import initialState from '../redux/initialState'
import {GET_EVENT_USER, GET_USER_INFO, USER_LOGIN} from '../actions/user';
import {AsyncStorage} from 'react-native'

export default function user(state = initialState.userInfo, action) {

  switch (action.type) {
    case USER_LOGIN: {

      try {
        AsyncStorage.setItem('@yolo:token', action.token);
      } catch (error) {
        // Error saving data
      }

      return {
        ...state,
        token: action.token
      }
    }
    case GET_USER_INFO: {
      return {
        ...state,
        ...action.userInfo
      }
    }
    case GET_EVENT_USER: {
      return {
        ...state,
        currentUserEvent: action.currentUserEvent
      }
    }

    default:
      return state;
  }
}