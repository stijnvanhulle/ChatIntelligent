/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:33:00+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-09T17:05:20+01:00
* @License: stijnvanhulle.be
*/

import actionsUrl from '../actions/lib/actionsUrl';

export default function strangerStreamReducer(state = null, action) {
  switch (action.type) {
  case actionsUrl.LOAD_STRANGER_STREAM:
    return state;
  case actionsUrl.ADD_STRANGER_STREAM:
    return action.stream;
  default:
    return state;

  }
}
