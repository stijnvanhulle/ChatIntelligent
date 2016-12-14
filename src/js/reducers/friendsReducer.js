/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:33:00+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T19:17:11+01:00
* @License: stijnvanhulle.be
*/

import actionsUrl from '../actions/lib/actionsUrl';

export default function friendsReducer(state = [], action) {
  switch (action.type) {
  case actionsUrl.LOAD_FRIENDS:
    return state;
  case actionsUrl.ADD_FRIEND:
    return [
      ...state,
      Object.assign({}, action.friend)
    ];
  default:
    return state;

  }
}
