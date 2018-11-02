/**
 * Created by Duong Le on 9/8/18.
 */


import initialState from '../redux/initialState'
import {GET_EVENT_USER, GET_USER_INFO} from '../actions/user';

export default function user(state = initialState.userInfo, action) {

  switch (action.type) {

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