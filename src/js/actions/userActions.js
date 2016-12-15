/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-09T15:35:26+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-14T20:22:25+01:00
* @License: stijnvanhulle.be
*/

import axios from 'axios';
import url from './lib/url';
import actionsUrl from './lib/actionsUrl';

export function createUserSucces(user) {
  return {type: actionsUrl.CREATE_USER_SUCCESS, user};
}

export function loadUsersSucces(users) {
  return {type: actionsUrl.LOAD_USERS_SUCCESS, users};
}

//thunk
//
export function createUser(user) {
  return dispatch => {
    try {
      return axios.post(url.USER, user).then(response => {
        const data = response.data;
        dispatch(createUserSucces(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}

export function loadUsers(query = ``) {
  return dispatch => {
    try {
      return axios.get(url.USER).then(response => {
        const data = response.data;
        dispatch(loadUsersSucces(data));
      }).catch(err => {
        throw err;
      });

    } catch (e) {
      throw e;
    }

  };
}
