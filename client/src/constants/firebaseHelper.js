/**
 * Created by Duong Le on 11/1/18.
 */

import {Platform} from 'react-native'
import store from '../redux/store'
import firebase from 'firebase'
import RNFetchBlob from 'rn-fetch-blob'

const config = {
  apiKey: 'AIzaSyAhyzgxtYkKwFrrpRyC7nTgz1O9WWDP2UE',
  authDomain: 'lvtn-lqd-blh-2019.firebaseapp.com',
  databaseURL: 'https://lvtn-lqd-blh-2019.firebaseio.com',
  projectId: 'lvtn-lqd-blh-2019',
  storageBucket: 'lvtn-lqd-blh-2019.appspot.com',
  messagingSenderId: '969498387501'
};

const firebaseApp = firebase.initializeApp(config);

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const storeReference = (downloadUrl, sessionId, nameFile) => {

}


/**
 * Up load image firebase
 * @param {string} nameEvent
 * @param {string} uri
 * @param {string} mime
 * @return {Promise<any>}
 */
export function upLoadImageFirebase(nameEvent = 'ssdasdas', uri, mime = 'application/octet-stream') {
  return new Promise((resolve, reject) => {

    const uploadUri = uri.replace('file://', '')
    const sessionID = new Date().getTime()

    let uplaodBlob = null

    // create a reference in firebase
    let nameFile = store.getState().userInfo.fullname + '_' + nameEvent + 'cxczxczx_' + sessionID
    const imageRef = firebaseApp.storage().ref('imageEvent').child(nameFile)

    fs.readFile(uploadUri, 'base64').then(data => {
      return Blob.build(data, {type: `${mime};BASE64`})
    }).then(blob => {
      uplaodBlob = blob
      return imageRef.put(blob, {contentType: mime})
    }).then(() => {
      uplaodBlob.close()
      return imageRef.getDownloadURL()
    }).then(url => {
      resolve(url)

    }).catch(error => {
      reject(error)
    })

  })
}