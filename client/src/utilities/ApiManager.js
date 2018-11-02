/**
 * Created by Duong Le on 9/15/18.
 */

import {apiKeyTwilio, baseUrlVerificationTwilio, urlServer} from '../constants/constant';
import {getWithTimeout, postWithTimeout} from './networking';

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
export function postUserInfo(username,password, email, numberPhone, fullName) {

  let details = {
    'username': username,
    'password': password,
    'email': email,
    'phone': numberPhone,
    'fullname': fullName,
};

let formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
console.log('formbody', formBody);
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };
  return new Promise(resolve => {
    postWithTimeout(`${urlServer}api/users`, header, formBody).then(response => {
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
export function getUserEvents(userid) {
  return new Promise(resolve => {
    getWithTimeout(`${urlServer}/events/usercreate/${userid}`, {}).then(response => {
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
export function postCreateEvents(username,event_title, description, price, location, date_start, date_end, avatar) {

  let details = {
    'username': username,
    'event_title': event_title,
    'description': description,
    'price': price,
    'location': location,
    'date_start': date_start,
    'date_end': date_end,
    'avatar': avatar,
};

let formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");
console.log('formbody', formBody);
  const header = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };

  return new Promise(resolve => {
    postWithTimeout(`${urlServer}api/events/createEvent`, header, formBody).then(response => {
      if (response.status === 'success') {
        //console.log('data', data)
        resolve(true)
      } else resolve(false)
    })
  })
}