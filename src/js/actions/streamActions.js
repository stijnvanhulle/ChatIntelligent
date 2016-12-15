/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:35:26+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-15T13:06:46+01:00
* @License: stijnvanhulle.be
*/


import axios from 'axios';
import {setUrl, setParams} from '../lib/functions';
import _url from './lib/url';
import actionsUrl from './lib/actionsUrl';

const url = setUrl(_url);

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
