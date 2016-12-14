/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:35:26+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T20:28:07+01:00
* @License: stijnvanhulle.be
*/

import axios from 'axios';
import url from './lib/url';
import actionsUrl from './lib/actionsUrl';

export function addFriend_SUCCESS(friend) {
  return {type: actionsUrl.ADD_FRIEND_SUCCESS, friend};
}

export function loadFriends_SUCCESS(friends) {
  return {type: actionsUrl.LOAD_FRIENDS_SUCCESS, friends};
}
export function acceptFriend_SUCCESS(friend) {
  return {type: actionsUrl.ACCEPT_FRIEND_SUCCESS, friend};
}


//thunk
//
export function addFriend(meId, otherUserID) {
  return dispatch => {
    try {
      return axios.post(url.FRIEND, {
        userId1: meId,
        userId2: otherUserID
      }).then(response => {
        const data = response.data;
        dispatch(addFriend_SUCCESS(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}

export function acceptFriend(meId, otherUserID) {
  return dispatch => {
    try {
      return axios.post(url.FRIEND, {
        userId1: meId,
        userId2: otherUserID
      }).then(response => {
        const data = response.data;
        dispatch(ACCEPT_FRIEND_SUCCESS(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}

export function loadFriends(query = ``) {
  return dispatch => {
    try {
      return axios.get(url.FRIEND).then(response => {
        const data = response.data;
        dispatch(loadFriends_SUCCESS(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}
