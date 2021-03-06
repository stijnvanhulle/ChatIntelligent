/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:35:26+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-20T20:04:03+01:00
* @License: stijnvanhulle.be
*/

import axios from 'axios';
import {setUrl, setParams} from '../lib/functions';
import _url from './lib/url';
import actionsUrl from './lib/actionsUrl';

const url = setUrl(_url);

export function addFriendSuccess(friend) {
  return {type: actionsUrl.ADD_FRIEND_SUCCESS, friend};
}

export function loadFriendsSuccess(friends) {
  return {type: actionsUrl.LOAD_FRIENDS_SUCCESS, friends};
}
export function acceptFriendSuccess(friend) {
  return {type: actionsUrl.ACCEPT_FRIEND_SUCCESS, friend};
}

//thunk
//
export function addFriend(meId, friendId) {
  return dispatch => {
    try {
      return axios.post(setParams(url.FRIEND, meId), {friendId: friendId}).then(response => {
        const data = response.data;
        dispatch(addFriendSuccess(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}

export function acceptFriend(meId, friendId) {
  return dispatch => {
    try {
      return axios.post(setParams(url.FRIEND_ACCEPT, meId), {friendId: friendId}).then(response => {
        const data = response.data;
        dispatch(acceptFriendSuccess(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}

export function loadFriends(meId, query = ``) {
  return dispatch => {
    try {
      if (!meId) {
        return Promise.reject(`Not all data filled in from loadfriends`);
      }
      return axios.get(`${setParams(url.FRIEND, meId)  }?query=${  query}`).then(response => {
        const data = response.data;
        dispatch(loadFriendsSuccess(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}
