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
    getWithTimeout(`${urlServer}api/events`, {}).then(response => {
      if (response.status === 'success') {
        resolve(response.data)
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
    getWithTimeout(`${urlServer}api/users/checkPhonenumber/${numberPhone}`, {}).then(response => {
      if (response.status === 'success') {
        resolve(response.data[0])
      } else resolve(false)
    })
  })
}


export function postUserInfo(username, numberPhone, fullName, email, avatar) {

  const header = {
    'Content-Type': 'multipart/form-data'
  };

  let formData = new FormData();
  formData.append('username', username);
  formData.append('password', '123');
  formData.append('phone', numberPhone);
  formData.append('fullname', fullName);
  formData.append('avatar', avatar);

  console.log(formData)

  return new Promise(resolve => {
    postWithTimeout(`${urlServer}api/users`, header, formData).then(response => {

    })
  })
}