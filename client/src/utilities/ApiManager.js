/**
 * Created by Duong Le on 9/15/18.
 */

import {apiKeyTwilio, baseUrlVerificationTwilio, urlServer} from '../constants/constant';
import {getWithTimeout, patchWithTimeout, postWithTimeout, deleteWithTimeout} from './networking';
import store from '../redux/store';
import {GET_EVENT_USER} from '../actions/user';
import Moment from 'moment';

/**
 * Send verification phone number
 * @param {string} countryCode, default +84
 * @param {!string} phoneNumber
 * @return {Promise<any> | Promise}
 */
export function sendVerificationPhoneNumber(countryCode = '+84', phoneNumber) {
  return new Promise(resolve => {

    let body = {
      api_key: apiKeyTwilio,
      via: 'sms',
      country_code: countryCode,
      phone_number: phoneNumber
    }

    postWithTimeout(`${baseUrlVerificationTwilio}/phones/verification/start`, {}, body).then(response => {
      if (response.success) {
        resolve(true)
      } else {
        resolve(response.message)
      }
    })

  })
}

/**
 * Validate verification code
 * @param {string} countryCode, default +84
 * @param {!string} phoneNumber
 * @param {!string} code
 * @return {Promise<any> | Promise}
 */
export function validateVerificationCode(countryCode = '+84', phoneNumber, code) {
  return new Promise(resolve => {
    getWithTimeout(`${baseUrlVerificationTwilio}/phones/verification/check?via=sms&api_key=${apiKeyTwilio}&phone_number=${phoneNumber}&verification_code=${code}&country_code=${countryCode}`, {}).then(response => {
      if (response.success) {
        resolve(response)
      } else {
        resolve(response.message)
      }
    })
  })
}

/**
 * Get add event form server
 * @return {Promise<any>}
 */
export function getEvent() {
  return new Promise(resolve => {
    getWithTimeout(`${urlServer}/events`, {}).then(response => {
      if (response.status === 'success') {
        resolve(response)
      } else resolve(false)
    })
  })
}


/**
 * Get user info with number phone
 * @param {string} numberPhone
 * @return {Promise<any>}
 */
export function getUserInfoWithPhone(numberPhone) {
  return new Promise(resolve => {
    getWithTimeout(`${urlServer}/users/checkPhonenumber/${numberPhone}`, {}).then(response => {
      if (response.status === 'succeed') {
        resolve(response.user)
      } else resolve(false)
    })
  })
}

/**
 * Create User
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @param {numberic} numberPhone
 * @param {srting} fullName
 */
export function postUserInfo(username, numberPhone, fullName, avatar) {
  let details = {
    'username': username,
    'phone': numberPhone,
    'fullname': fullName,
    'avatar': avatar
  };

  let formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  console.log('formbody', formBody);
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };
  return new Promise(resolve => {
    postWithTimeout(`${urlServer}/users`, header, formBody).then(response => {
      if (response.status === 'success') {
        resolve(true)
      } else resolve(false)
    })
  })
}

/**
 *Get User's Events
 * @param {string} username
 */
export function getUserEvents(username) {
  return new Promise(resolve => {
    getWithTimeout(`${urlServer}/events/usercreate/${username}`, {}).then(response => {
      if (response.status === 'success') {
        //console.log('data', data)
        resolve(response.events)
      } else resolve(false)
    })
  })
}

/**
 *Get User Signed Events
 * @param {string} username
 */
export function getUserSignedEvents(userid) {
  return new Promise(resolve => {
    getWithTimeout(`${urlServer}/events/usersign/${userid}`, {}).then(response => {
      if (response.status === 'success') {
        //console.log('data', data)
        resolve(response.events)
      } else resolve(false)
    })
  })
}

/**
 *
 * @param {string} username
 * @param {string} event_title
 * @param {string} description
 * @param {float} price
 * @param {string} location
 * @param {date} date_start
 * @param {date} date_end
 * @param {string} avatar
 */
export function postCreateEvents(username, event_title, description, price, location, date_start, date_end, avatar, type) {
  let details = {
    'title': event_title,
    'price': price,
    'description': description,
    'avatar': avatar,
    'location': location,
    'created_by': username,
    'time_start': date_start,
    'time_end': date_end,
    'type': type
  };


  let formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  console.log('formbody', formBody);
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };

  return new Promise(resolve => {
    postWithTimeout(`${urlServer}/events`, header, formBody).then(response => {
      if (response.status === 'success') {
        //console.log('data', data)
        resolve(true)
      } else resolve(false)
    })
  })
}

/**
 * Get current user
 * @return {Promise<any>}
 */
export function getCurrentUser() {
  return new Promise(resolve => {
    getWithTimeout(`${urlServer}/users/api/currentUser`, {}).then(response => {
      if (response.status === 'success') {
        resolve(response.user.data)
      } else resolve(false)
    })
  })
}

/**
 * Login with phone
 * @param numberPhone
 * @return {Promise<any>}
 */
export function loginUserWithPhone(numberPhone) {
  return new Promise(resolve => {
    getWithTimeout(`${urlServer}/users/login/${numberPhone}`, {}).then(response => {
      if (response.status === 'success') {
        resolve(response.token)
      } else resolve(false)
    })
  })
}

/**
 * Handle user sign event
 * @param eventId
 * @return {Promise<any>}
 */
export function handleUserEvent(eventId) {
  return new Promise(resolve => {
    let body = {
      userid: store.getState().userInfo._id
    }
    patchWithTimeout(`${urlServer}/events/sign/${eventId}`, {}, body).then(data => {
      if (data.status === 'success') {
        resolve(data)

        getEvent().then(data => {
          store.dispatch({type: GET_EVENT_USER, currentUserEvent: data.events})
        })

      } else {
        resolve(false)
      }
    })
  })
}

/**
 * Update user infor
 * @param fullname
 * @param birthday
 * @param gender
 * @param email
 * @param avatar
 * @param about
 * @return {Promise<any>}
 */
export function patchUpdateUserInfor(fullname, birthday, gender, email, avatar, about) {
  return new Promise(resolve => {
    let userid = store.getState().userInfo._id
    let body =
      [
        {'propName': 'fullname', 'value': fullname},
        {'propName': 'birthday', 'value': birthday},
        {'propName': 'gender', 'value': gender},
        {'propName': 'email', 'value': email},
        {'propName': 'avatar', 'value': avatar},
        {'propName': 'about', 'value': about},
      ]
    console.log('userid', userid)
    console.log(body)
    patchWithTimeout(`${urlServer}/users/${userid}`, {}, body).then(data => {
      if (data.status === 'success') {
        resolve(data)
      } else {
        resolve(false)
      }
    })
  })
}


/**
 * Update event
 * @param eventId
 * @param title
 * @param description
 * @param price
 * @param type
 * @param location
 * @param avatar
 * @param time_start
 * @param time_end
 * @return {Promise<any>}
 */
export function patchUpdateEvent(eventId, title, description, price, type, location, avatar, time_start, time_end) {
  return new Promise(resolve => {
    let body =
      [
        {'propName': 'title', 'value': title},
        {'propName': 'description', 'value': description},
        {'propName': 'price', 'value': price},
        {'propName': 'type', 'value': type},
        {'propName': 'location', 'value': location},
        {'propName': 'avatar', 'value': avatar},
        {'propName': 'time_start', 'value': time_start},
        {'propName': 'time_end', 'value': time_end},
      ]
    // console.log('userid', userid)
    // console.log(body)
    patchWithTimeout(`${urlServer}/events/${eventId}`, {}, body).then(data => {
      if (data.status === 'success') {
        getEvent().then(data => {
          store.dispatch({type: GET_EVENT_USER, currentUserEvent: data.events})
        })
        resolve(data)
      } else {
        resolve(false)
      }
    })
  })
}


/**
 * Delete event
 * @param eventId
 * @return {Promise<any>}
 */
export function deleteUserEvent(eventId) {
  return new Promise(resolve => {
    deleteWithTimeout(`${urlServer}/events/${eventId}`, {},).then(data => {
      if (data.message === "Event Deleted"  ) {
        resolve(data)

        getEvent().then(data => {
          store.dispatch({type: GET_EVENT_USER, currentUserEvent: data.events})
        })

      } else {
        resolve(false)
      }
    })
  })
}

/**
 * Comment event
 * @param eventId
 * @param comment
 * @param username
 * @return {Promise<any>}
 */
export function commentEvent(eventId, comment, username) {

  let body = {
    comment: {
      username: username,
      comment: comment,
      at: Moment().format()
    }
  }

  return new Promise(resolve => {
    patchWithTimeout(`${urlServer}/events/comment/${eventId}`, {}, body).then(data => {
      if (data.status === 'success') {
        resolve(data.event)
        getEvent().then(data => {
          store.dispatch({type: GET_EVENT_USER, currentUserEvent: data.events})
        })
      } else {
        resolve(false)

      }
    })
  })
}

/**
 * Rate event
 * @param eventId
 * @param rate
 * @param username
 * @return {Promise<any>}
 */
export function rateEvent(eventId, rate, username) {

  let body = {
    rate: {
      username: username,
      rate: rate,
      at: Moment().format()
    }
  }

  return new Promise(resolve => {
    patchWithTimeout(`${urlServer}/events/rate/${eventId}`, {}, body).then(data => {
      if (data.status === 'success') {
        resolve(data.event)
        getEvent().then(data => {
          store.dispatch({type: GET_EVENT_USER, currentUserEvent: data.events})
        })
      } else {
        resolve(false)

      }
    })
  })
}

/**
 * Search place with google map api
 * @param place
 * @return {Promise<any>}
 */
export function searchPlace(place) {
  return new Promise(resolve => {
    getWithTimeout(`https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(place)}&key=AIzaSyAuZwSOpEisbRaURDBv3IWKDUa1y3kKF2g`).then(ress => {

    })
  })
}


/**
 * Get user info with number phone
 * @param {string} numberPhone
 * @return {Promise<any>}
 */
export function getUserList(eventId) {
  return new Promise(resolve => {
    getWithTimeout(`${urlServer}/events/registers/${eventId}`, {}).then(response => {
      if (response.status === 'success') {
        resolve(response.result)
      } else resolve(false)
    })
  })
}
