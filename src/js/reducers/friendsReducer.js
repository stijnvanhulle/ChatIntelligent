/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:33:00+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-20T20:01:49+01:00
* @License: stijnvanhulle.be
*/

import actionsUrl from '../actions/lib/actionsUrl';

export default function friendsReducer(state = [], action) {
  switch (action.type) {
  case actionsUrl.LOAD_FRIENDS_SUCCESS:
    return action.friends;
  case actionsUrl.ACCEPT_FRIEND_SUCCESS:
    let newState = [...state];
    newState = newState.map(item => {
      if (item.user1 === action.friend.user1 && item.user2 === action.friend.user2) {
        item = action.friend;
      }
      return item;
    });
    return newState;
  case actionsUrl.ADD_FRIEND_SUCCESS:
    return [
      ...state,
      Object.assign({}, action.friend)
    ];

  default:
    return state;

  }
}
