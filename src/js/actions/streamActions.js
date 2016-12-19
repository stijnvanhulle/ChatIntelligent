/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:35:26+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-19T23:03:30+01:00
* @License: stijnvanhulle.be
*/


import actionsUrl from './lib/actionsUrl';


export function loadStrangerStream(stream) {
  return {type: actionsUrl.LOAD_STRANGER_STREAM, stream};
}
export function loadYouStream(stream) {
  return {type: actionsUrl.LOAD_YOU_STREAM, stream};
}

export function addStrangerStream(stream) {
  return {type: actionsUrl.ADD_STRANGER_STREAM, stream};
}
export function addYouStream(stream) {
  return {type: actionsUrl.ADD_YOU_STREAM, stream};
}
