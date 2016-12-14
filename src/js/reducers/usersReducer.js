/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:33:00+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T20:21:26+01:00
* @License: stijnvanhulle.be
*/

import actionsUrl from '../actions/lib/actionsUrl';

export default function usersReducer(state = [], action) {
  //connected users
  switch (action.type) {
  case actionsUrl.LOAD_USERS_SUCCESS:
    return action.users;
  case actionsUrl.CREATE_USER_SUCCESS:
    return [
      ...state,
      Object.assign({}, action.user)
    ];
  default:
    return state;

  }
}
